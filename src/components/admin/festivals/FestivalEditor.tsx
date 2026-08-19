'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  CalendarDays,
  CheckCircle2,
  Images,
  Lightbulb,
  ListChecks,
  Footprints,
  MessageCircleQuestion,
  PartyPopper,
  ScrollText,
  Search,
  Sparkles,
  Ticket,
  X,
} from 'lucide-react';

import CMSHeader from '@/components/admin/cms/CMSHeader';
import CMSSection from '@/components/admin/CMSSection';
import CMSMediaSection from '@/components/admin/cms/CMSMediaSection';
import CMSSeoSection from '@/components/admin/cms/CMSSeoSection';
import CMSActions from '@/components/admin/cms/CMSActions';
import FaqHandler, { FaqItem } from '@/components/admin/cms/FaqHandler';
import SimpleListEditor from '@/components/admin/stays/SimpleListEditor';
import DestinationImagesEditor from '@/components/admin/destinations/DestinationImagesEditor';
import DestinationPairEditor from '@/components/admin/destinations/DestinationPairEditor';
import ActivityStepsEditor from '@/components/admin/experiences/ActivityStepsEditor';
import {
  FESTIVAL_KINDS,
  FESTIVAL_SEASONS,
  type FestivalAttendStep,
  type FestivalFact,
  type FestivalHistoryBlock,
  type FestivalKind,
  type FestivalPhoto,
  type FestivalSeason,
} from '@/types/festivalTypes';

/**
 * Shared create/edit form for a festival — the /festivals hub card AND the
 * /festivals/[slug] page, since one record feeds both.
 *
 * One component drives both routes so they cannot drift apart — the same
 * arrangement as ExperienceActivityEditor, and the section order matches the
 * order the public page renders in, so an editor working top to bottom is
 * walking down the page.
 *
 * Two shapes differ between the form and the stored record, and both are
 * converted in exactly one place (buildPayload here, and the edit route's
 * loader on the way in):
 *
 *   • The plain string[] lists (highlights, Sartaj's tips) are held as
 *     {id, value} rows, because a React key that is the array index loses input
 *     focus the moment a row above it is deleted.
 *   • `dates` is nested in Mongo but flat in the form, so each input is one
 *     field rather than a nested setter.
 *
 * THE DATES SECTION IS THE ONE TO READ BEFORE CHANGING ANYTHING. `datesVerified`
 * gates the Event JSON-LD and the visible "typical window" caveat together. The
 * form deliberately makes it hard to tick by accident and impossible to tick
 * usefully without an ISO start date — see the section.
 */

/** A string[] entry while it is being edited. `id` is the React key only. */
export interface ListRow {
  id: string;
  value: string;
}

export interface FestivalFormValues {
  // 1. Identity & routing
  name: string;
  shortName: string;
  slug: string;
  status: 'draft' | 'published';
  kind: FestivalKind;
  season: FestivalSeason;
  destinationSlug: string;
  // 2. Card & hero
  summary: string;
  image: string;
  imageAlt: string;
  quickAnswer: string;
  // 3. Dates
  dateWindow: string;
  dateShort: string;
  dateDuration: string;
  dateStart: string;
  dateEnd: string;
  datesVerified: boolean;
  // 4. At a glance
  venue: string;
  location: string;
  entry: string;
  facts: FestivalFact[];
  // 5. What happens
  intro: string;
  highlights: ListRow[];
  // 6. How to attend
  attend: FestivalAttendStep[];
  // 7. History
  history: FestivalHistoryBlock[];
  // 8. Gallery
  gallery: FestivalPhoto[];
  // 9. Tips
  sartajTips: ListRow[];
  // 10. FAQs
  faqs: FaqItem[];
  // 11. SEO
  metaTitle: string;
  metaDescription: string;
}

export const EMPTY_FESTIVAL: FestivalFormValues = {
  name: '',
  shortName: '',
  slug: '',
  status: 'draft',
  kind: 'cultural',
  season: 'moves',
  destinationSlug: '',
  summary: '',
  image: '',
  imageAlt: '',
  quickAnswer: '',
  dateWindow: '',
  dateShort: '',
  dateDuration: '',
  dateStart: '',
  dateEnd: '',
  datesVerified: false,
  venue: '',
  location: '',
  entry: '',
  facts: [],
  intro: '',
  highlights: [],
  attend: [],
  history: [],
  gallery: [],
  sartajTips: [],
  faqs: [],
  metaTitle: '',
  metaDescription: '',
};

/**
 * string[] → {id, value}[].
 *
 * Random ids rather than the index or the text: two identical rows would share
 * a key, and an index key hands the deleted row's state to the row below it.
 * Called from the edit route's loader, so `crypto` is always the browser's.
 */
export const toRows = (values: string[] = []): ListRow[] =>
  values.map((value) => ({ id: crypto.randomUUID(), value }));

const fromRows = (rows: ListRow[]) =>
  rows.map((row) => row.value.trim()).filter(Boolean);

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

const slugify = (v: string) =>
  v
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';
const ta = `${inp} resize-y min-h-24`;
const sel = `${inp} cursor-pointer appearance-none`;
const label = 'text-sm text-slate-400 flex items-center gap-1.5';
const hint = 'mt-1.5 text-xs text-slate-600';

/** What each kind changes about the page, so the choice is not cosmetic. */
const KIND_HINT: Record<FestivalKind, string> = {
  bloom: 'a timing document — when to come, how long it lasts',
  pilgrimage: 'a logistics document — registration, route, fitness',
  cultural: 'organised, ticketed or public — what happens and where to watch',
  sport: 'the season and the slopes, as much as the event',
  religious: 'observed valley-wide — what it means for shops, roads and etiquette',
};

/** Rough word count for the 40–60 word answer block. */
const words = (v: string) => v.trim().split(/\s+/).filter(Boolean).length;

export default function FestivalEditor({
  mode,
  festivalId,
  initial,
}: {
  mode: 'create' | 'edit';
  festivalId?: string;
  initial?: FestivalFormValues;
}) {
  const router = useRouter();
  const STORAGE_KEY = 'cms_festival_create_draft';

  const [form, setForm] = useState<FestivalFormValues>(
    initial ?? EMPTY_FESTIVAL,
  );
  const [isLoaded, setIsLoaded] = useState(mode === 'edit');
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Draft autosave — create only, so a stale draft can never overwrite a live
  // record. Deferred to a microtask: localStorage does not exist during SSR.
  useEffect(() => {
    if (mode !== 'create') return;
    let cancelled = false;

    const restoreDraft = async () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw && !cancelled) setForm({ ...EMPTY_FESTIVAL, ...JSON.parse(raw) });
      } catch {
        /* ignore a corrupt draft */
      }
      if (!cancelled) setIsLoaded(true);
    };

    restoreDraft();
    return () => {
      cancelled = true;
    };
  }, [mode]);

  useEffect(() => {
    if (mode !== 'create' || !isLoaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form, isLoaded, mode]);

  const f = <K extends keyof FestivalFormValues>(
    field: K,
    value: FestivalFormValues[K],
  ) => setForm((prev) => ({ ...prev, [field]: value }));

  /** Typing the name derives the slug until someone edits the slug by hand. */
  const onNameChange = (value: string) => {
    setForm((prev) => {
      const derived = prev.slug === slugify(prev.name);
      return {
        ...prev,
        name: value,
        ...(derived ? { slug: slugify(value) } : {}),
      };
    });
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4000);
  };

  // An unverified festival must not carry ISO dates into the record at all:
  // the Event gate checks `datesVerified && start`, and leaving a stale start
  // behind is how a later tick of the checkbox publishes last year's date.
  const verified = form.datesVerified && Boolean(form.dateStart);

  const buildPayload = (status: 'draft' | 'published') => ({
    slug: form.slug,
    name: form.name,
    shortName: form.shortName,
    status,
    kind: form.kind,
    season: form.season,
    destinationSlug: form.destinationSlug,

    summary: form.summary,
    image: form.image,
    imageAlt: form.imageAlt,
    quickAnswer: form.quickAnswer,

    dates: {
      window: form.dateWindow,
      short: form.dateShort,
      duration: form.dateDuration,
      // Dropped unless the record is genuinely verified — see `verified` above.
      start: verified ? form.dateStart : '',
      end: verified ? form.dateEnd : '',
    },
    datesVerified: verified,

    venue: form.venue,
    location: form.location,
    entry: form.entry,
    facts: form.facts.filter((fact) => fact.label),

    intro: form.intro,
    highlights: fromRows(form.highlights),

    attend: form.attend.filter((step) => step.title || step.body),
    history: form.history.filter((block) => block.title || block.body),
    gallery: form.gallery.filter((photo) => photo.image),
    sartajTips: fromRows(form.sartajTips),

    faqs: form.faqs.filter((faq) => faq.question && faq.answer),

    seo: { title: form.metaTitle, description: form.metaDescription },
  });

  const send = async (status: 'draft' | 'published') => {
    const url =
      mode === 'edit' ? `/api/festivals/${festivalId}` : '/api/festivals';
    const res = await fetch(url, {
      method: mode === 'edit' ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildPayload(status)),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Request failed');
    }
    if (mode === 'create') localStorage.removeItem(STORAGE_KEY);
    return res.json();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await send(form.status);
      showToast(
        mode === 'edit' ? 'Festival updated!' : 'Festival published!',
        'success',
      );
      setTimeout(() => router.push('/admin/festivals'), 1200);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = async () => {
    setIsSaving(true);
    try {
      await send('draft');
      showToast('Saved as draft!', 'success');
      setTimeout(() => router.push('/admin/festivals'), 1200);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const answerWords = words(form.quickAnswer);

  return (
    <div className="w-full py-8 pb-24">
      <CMSHeader editorType="Festival" />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ── 1. Identity & routing ── */}
        <CMSSection
          title="Festival Details"
          icon={<PartyPopper className="h-4 w-4" />}
          defaultOpen
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className={label}>Festival Name *</label>
              <input
                required
                className={`mt-2 ${inp}`}
                placeholder="e.g. Tulip Festival, Srinagar"
                value={form.name}
                onChange={(e) => onNameChange(e.target.value)}
              />
              <p className={hint}>
                The H1. Write it as someone would search for it, including the
                town when the name alone is ambiguous.
              </p>
            </div>

            <div>
              <label className={label}>URL *</label>
              <div className="mt-2 flex items-center gap-2">
                <span className="shrink-0 font-mono text-xs text-slate-600">
                  /festivals/
                </span>
                <input
                  required
                  className={`${inp} min-w-0`}
                  placeholder="tulip-festival"
                  value={form.slug}
                  onChange={(e) => f('slug', slugify(e.target.value))}
                />
              </div>
            </div>

            <div>
              <label className={label}>Short name</label>
              <input
                className={`mt-2 ${inp}`}
                placeholder="e.g. Tulip Festival"
                value={form.shortName}
                onChange={(e) => f('shortName', e.target.value)}
              />
              <p className={hint}>
                Used on the card, the breadcrumb and every section heading.
                Left empty it falls back to the full name.
              </p>
            </div>

            <div>
              <label className={label}>Destination slug</label>
              <input
                className={`mt-2 ${inp}`}
                placeholder="e.g. srinagar"
                value={form.destinationSlug}
                onChange={(e) => f('destinationSlug', slugify(e.target.value))}
              />
              <p className={hint}>
                Links this festival back into its destination hub. A slug that
                does not resolve drops the link rather than showing a dead one.
              </p>
            </div>

            <div>
              <label className={label}>Kind</label>
              <select
                className={`mt-2 ${sel}`}
                value={form.kind}
                onChange={(e) => f('kind', e.target.value as FestivalKind)}
              >
                {FESTIVAL_KINDS.map((kind) => (
                  <option key={kind.id} value={kind.id} className="bg-[#0b1730]">
                    {kind.label}
                  </option>
                ))}
              </select>
              <p className={hint}>
                Not cosmetic — this sets the tone of the page:{' '}
                {KIND_HINT[form.kind]}.
              </p>
            </div>

            <div>
              <label className={label}>Season</label>
              <select
                className={`mt-2 ${sel}`}
                value={form.season}
                onChange={(e) => f('season', e.target.value as FestivalSeason)}
              >
                {FESTIVAL_SEASONS.map((season) => (
                  <option
                    key={season.id}
                    value={season.id}
                    className="bg-[#0b1730]"
                  >
                    {season.label}
                  </option>
                ))}
              </select>
              <p className={hint}>
                Groups the hub calendar, and picks the sibling festivals shown
                at the foot of this page. Use “Moves yearly” for anything on the
                lunar calendar.
              </p>
            </div>
          </div>
        </CMSSection>

        {/* ── 2. Card & hero ── */}
        <CMSSection
          title="Card & Hero"
          icon={<Sparkles className="h-4 w-4" />}
        >
          <div className="space-y-5">
            <div>
              <label className={label}>Cover photo *</label>
              <p className={hint}>
                One photo, used three times: the hub card, the hero beside the
                answer block, and the Open Graph image when the page is shared.
                The alt text describes THIS photo, not the festival — it ships
                verbatim and is the only description of the image on the page.
              </p>
              <div className="mt-3">
                <CMSMediaSection
                  image={form.image}
                  alt={form.imageAlt}
                  editorType="festival"
                  onChange={(field, value) =>
                    f(
                      field === 'image' ? 'image' : 'imageAlt',
                      value as string,
                    )
                  }
                />
              </div>
            </div>

            <div>
              <label className={label}>Card summary</label>
              <textarea
                className={`mt-2 ${ta}`}
                placeholder="What the festival is, in one line."
                value={form.summary}
                onChange={(e) => f('summary', e.target.value)}
              />
              <p className={hint}>
                One sentence. This is the card copy on the hub and in the
                sibling rail — it is read before anyone clicks through.
              </p>
            </div>

            <div>
              <label className={label}>
                Answer block{' '}
                <span className="text-slate-600">({answerWords} words)</span>
              </label>
              <textarea
                className={`mt-2 ${ta}`}
                placeholder="What this is, when it falls, and whether to plan around it — before anything else on the page."
                value={form.quickAnswer}
                onChange={(e) => f('quickAnswer', e.target.value)}
              />
              <p className={hint}>
                40–60 words, at the top of the page. State the WINDOW here, never
                a specific date — this is the block most likely to be lifted as a
                featured snippet or into an AI Overview, and it is the meta
                description when the SEO field below is empty.
              </p>
            </div>
          </div>
        </CMSSection>

        {/* ── 3. Dates ── */}
        <CMSSection
          title="Dates"
          icon={<CalendarDays className="h-4 w-4" />}
          defaultOpen={false}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={label}>Window *</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="e.g. Late March to mid April"
                  value={form.dateWindow}
                  onChange={(e) => f('dateWindow', e.target.value)}
                />
                <p className={hint}>
                  Prose, and always safe to publish — it describes a pattern, not
                  a promise. This is what the page shows until the dates below
                  are verified.
                </p>
              </div>

              <div>
                <label className={label}>Short window</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="e.g. Mar–Apr, or “Moves yearly”"
                  value={form.dateShort}
                  onChange={(e) => f('dateShort', e.target.value)}
                />
                <p className={hint}>
                  The card chip. Written by hand rather than derived, because
                  “May or June, on Jyeshtha Ashtami” does not compress to months.
                </p>
              </div>

              <div className="md:col-span-2">
                <label className={label}>Duration</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="e.g. About 3 weeks"
                  value={form.dateDuration}
                  onChange={(e) => f('dateDuration', e.target.value)}
                />
              </div>
            </div>

            {/* THE GATE. Styled loud because ticking it changes what Google is
                told, not just what the page says. */}
            <div className="rounded-xl border border-amber-600/25 bg-amber-600/5 p-4">
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-300">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-amber-500"
                  checked={form.datesVerified}
                  onChange={(e) => f('datesVerified', e.target.checked)}
                />
                This year&apos;s dates are confirmed on the ground
              </label>
              <p className={hint}>
                Ticking this publishes an schema.org Event — a machine-readable
                promise of a date — and swaps the “typical window” caveat in the
                hero, the glance table and the plan card for a confirmed line.
                All of it comes from this one flag, so they cannot disagree.
                A wrong date in Google is worse than no rich result, so leave it
                off until someone has actually checked.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className={label}>Start date</label>
                  <input
                    type="date"
                    className={`mt-2 ${inp}`}
                    value={form.dateStart}
                    onChange={(e) => f('dateStart', e.target.value)}
                  />
                </div>
                <div>
                  <label className={label}>End date</label>
                  <input
                    type="date"
                    className={`mt-2 ${inp}`}
                    value={form.dateEnd}
                    onChange={(e) => f('dateEnd', e.target.value)}
                  />
                </div>
              </div>

              {form.datesVerified && !form.dateStart && (
                <p className="mt-3 rounded-lg border border-red-600/30 bg-red-600/10 px-3 py-2 text-xs text-red-300">
                  A start date is required before this counts as verified —
                  without one the record saves as unverified and no Event is
                  published.
                </p>
              )}

              {!form.datesVerified && form.dateStart && (
                <p className="mt-3 text-xs text-slate-500">
                  These dates will NOT be saved while the box above is unticked —
                  a stale start date left in the record is how last year&apos;s
                  date ends up published.
                </p>
              )}
            </div>
          </div>
        </CMSSection>

        {/* ── 4. At a glance ── */}
        <CMSSection
          title="At a Glance"
          icon={<Ticket className="h-4 w-4" />}
          defaultOpen={false}
          badge={form.facts.length || undefined}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={label}>Venue</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="e.g. Indira Gandhi Memorial Tulip Garden"
                  value={form.venue}
                  onChange={(e) => f('venue', e.target.value)}
                />
                <p className={hint}>
                  Where it actually happens. Also the name in the Place schema.
                </p>
              </div>

              <div>
                <label className={label}>Town / district</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="e.g. Srinagar"
                  value={form.location}
                  onChange={(e) => f('location', e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <label className={label}>Entry</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="e.g. Ticketed — a small per-head entry fee"
                  value={form.entry}
                  onChange={(e) => f('entry', e.target.value)}
                />
                <p className={hint}>
                  In words, never a bare number — some of these are per head, and
                  a figure printed here goes stale in a season.
                </p>
              </div>
            </div>

            <div>
              <label className={label}>Extra rows</label>
              <p className={hint}>
                Anything specific to this occasion — “Registration”, “Dress
                code”, “Fitness”, “Best time of day”. The table just gets taller.
              </p>
              <div className="mt-3">
                <DestinationPairEditor
                  items={form.facts}
                  setItems={(items) => f('facts', items)}
                  fieldA="label"
                  fieldB="value"
                  placeholderA="Label — e.g. Registration"
                  placeholderB="Value — e.g. Compulsory, in advance"
                  addLabel="Add Fact Row"
                />
              </div>
            </div>
          </div>
        </CMSSection>

        {/* ── 5. What happens ── */}
        <CMSSection
          title="What Happens"
          icon={<Sparkles className="h-4 w-4" />}
          defaultOpen={false}
          badge={form.highlights.length || undefined}
        >
          <div className="space-y-5">
            <div>
              <label className={label}>Intro</label>
              <textarea
                className={`mt-2 ${ta}`}
                placeholder="What the occasion actually is — a paragraph under the answer block."
                value={form.intro}
                onChange={(e) => f('intro', e.target.value)}
              />
            </div>

            <div>
              <label className={label}>Highlights</label>
              <p className={hint}>
                What happens, as things a reader can picture and a photographer
                can plan around — not adjectives. These are also the card&apos;s
                bullet list on the hub, so keep at least two.
              </p>
              <div className="mt-3">
                <SimpleListEditor
                  items={form.highlights}
                  setItems={(items) => f('highlights', items)}
                  field="value"
                  placeholder="Highlight"
                  addLabel="Add Highlight"
                />
              </div>
            </div>
          </div>
        </CMSSection>

        {/* ── 6. How to attend ── */}
        <CMSSection
          title="How To Attend"
          icon={<Footprints className="h-4 w-4" />}
          defaultOpen={false}
          badge={form.attend.length || undefined}
        >
          <div className="space-y-3">
            <p className="text-xs text-slate-600">
              The practical spine of the page, and what wins the how-to queries.
              ORDER IS THE CONTENT — these render as numbered steps, so
              “register” before “choose a route” before “prepare” is what makes
              it a sequence rather than a list of facts.
            </p>
            <ActivityStepsEditor
              steps={form.attend}
              setSteps={(steps) => f('attend', steps)}
            />
          </div>
        </CMSSection>

        {/* ── 7. History ── */}
        <CMSSection
          title="History & Significance"
          icon={<ScrollText className="h-4 w-4" />}
          defaultOpen={false}
          badge={form.history.length || undefined}
        >
          <div className="space-y-3">
            <p className="text-xs text-slate-600">
              The depth section, below the practical blocks on purpose — a reader
              who arrived from “amarnath registration” needs the logistics first.
              Each title becomes its own H3, so a reader skimming for one answer
              can find it without reading four paragraphs.
            </p>
            {/* Same {title, body} shape as the steps above, so it reuses the
                same editor rather than shipping a near-identical one. */}
            <ActivityStepsEditor
              steps={form.history}
              setSteps={(blocks) => f('history', blocks)}
            />
          </div>
        </CMSSection>

        {/* ── 8. Gallery ── */}
        <CMSSection
          title="Gallery"
          icon={<Images className="h-4 w-4" />}
          defaultOpen={false}
          badge={form.gallery.length || undefined}
        >
          <div className="space-y-3">
            <p className="text-xs text-slate-600">
              The photo grid on the detail page. Left empty, the section falls
              back to the shared festival reel rather than disappearing.
            </p>
            <DestinationImagesEditor
              images={form.gallery}
              setImages={(images) => f('gallery', images)}
              addLabel="Add Photo"
              editorType="festival"
              altHint="The alt text doubles as the hover caption. Describe what is genuinely in the photo — captioning a stock crowd as this festival is the one mistake to avoid here."
            />
          </div>
        </CMSSection>

        {/* ── 9. Tips ── */}
        <CMSSection
          title="Sartaj's Tips"
          icon={<Lightbulb className="h-4 w-4" />}
          defaultOpen={false}
          badge={form.sartajTips.length || undefined}
        >
          <div className="space-y-3">
            <p className="text-xs text-slate-600">
              The part a reader cannot get from an aggregator, and the reason
              this page can outrank one. Each should be specific and checkable —
              “go early to avoid crowds” is not a tip; “gates open at 9, the
              first hour is empty, and the upper terrace is the photograph
              everyone misses” is.
            </p>
            <SimpleListEditor
              items={form.sartajTips}
              setItems={(items) => f('sartajTips', items)}
              field="value"
              placeholder="Tip"
              addLabel="Add Tip"
            />
          </div>
        </CMSSection>

        {/* ── 10. FAQs ── */}
        <CMSSection
          title="FAQs"
          icon={<MessageCircleQuestion className="h-4 w-4" />}
          defaultOpen={false}
          badge={form.faqs.length || undefined}
        >
          <div className="space-y-3">
            <p className="text-xs text-slate-600">
              Scope these to THIS festival — the hub-level questions must not
              compete for the same queries. Plain text only: these answers ship
              verbatim as FAQPage structured data, so a row with only half of it
              filled in is dropped rather than emitted. Answer date questions
              with the window and why it moves, never with a guessed date.
            </p>
            <FaqHandler faqs={form.faqs} setFaqs={(faqs) => f('faqs', faqs)} />
          </div>
        </CMSSection>

        {/* ── 11. SEO ── */}
        <CMSSection
          title="SEO"
          icon={<Search className="h-4 w-4" />}
          defaultOpen={false}
        >
          <div className="space-y-3">
            <p className="text-xs text-slate-600">
              Both are overrides. Left empty, the page builds a title from the
              festival name and uses the answer block above as the description.
            </p>
            <CMSSeoSection
              metaTitle={form.metaTitle}
              metaDescription={form.metaDescription}
              required={false}
              onChange={(field, value) =>
                f(field as 'metaTitle' | 'metaDescription', value)
              }
            />
          </div>
        </CMSSection>

        <CMSActions
          status={form.status}
          isSaving={isSaving}
          isSubmitting={isSubmitting}
          onDraft={saveDraft}
          onStatusChange={(status) => f('status', status)}
        />
      </form>

      {/* Toasts */}
      <div className="fixed top-24 right-6 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium shadow-xl ${
              toast.type === 'success'
                ? 'border-emerald-500/40 bg-emerald-600/90 text-white'
                : 'border-red-500/40 bg-red-600/90 text-white'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}
