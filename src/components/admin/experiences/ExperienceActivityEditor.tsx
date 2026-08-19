'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  Film,
  Images,
  IndianRupee,
  Lightbulb,
  ListChecks,
  Footprints,
  MessageCircleQuestion,
  Mountain,
  Search,
  Sparkles,
  X,
} from 'lucide-react';

import CMSHeader from '@/components/admin/cms/CMSHeader';
import CMSSection from '@/components/admin/CMSSection';
import CMSSeoSection from '@/components/admin/cms/CMSSeoSection';
import CMSActions from '@/components/admin/cms/CMSActions';
import FaqHandler, { FaqItem } from '@/components/admin/cms/FaqHandler';
import RichTextEditor from '@/components/admin/shared/RichTextEditor';
import SimpleListEditor from '@/components/admin/stays/SimpleListEditor';
import DestinationImagesEditor from '@/components/admin/destinations/DestinationImagesEditor';
import DestinationPairEditor from '@/components/admin/destinations/DestinationPairEditor';
import ActivityMonthsEditor from '@/components/admin/experiences/ActivityMonthsEditor';
import ActivityStepsEditor from '@/components/admin/experiences/ActivityStepsEditor';
import ActivityTimingEditor from '@/components/admin/experiences/ActivityTimingEditor';
import ActivityVideosEditor from '@/components/admin/experiences/ActivityVideosEditor';
import {
  ACTIVITY_DIFFICULTIES,
  type ActivityDifficulty,
  type ActivityFact,
  type ActivityImage,
  type ActivityStep,
  type ActivityTiming,
  type ActivityVideo,
  type MonthWindowId,
} from '@/types/experienceActivityTypes';

/**
 * Shared create/edit form for an activity page (/experiences/[slug]).
 *
 * One component drives both routes so they cannot drift apart — the same
 * arrangement as DestinationEditor and StayEditor, and the section order
 * matches the order the public page renders in, so an editor working top to
 * bottom is walking down the page.
 *
 * Two shapes differ between the form and the stored record, and both are
 * converted in exactly one place (buildPayload here, and the edit route's
 * loader on the way in):
 *
 *   • Numeric fields are held as strings — an <input> hands back strings, and
 *     "" is not 0. Casting once on save keeps an empty price out of the record
 *     as an empty price rather than a free activity.
 *   • The plain string[] lists (inclusions, exclusions, both tip lists) are
 *     held as {id, value} rows, because a React key that is the array index
 *     loses input focus the moment a row above it is deleted.
 */

/** A string[] entry while it is being edited. `id` is the React key only. */
export interface ListRow {
  id: string;
  value: string;
}

export interface ExperienceActivityFormValues {
  // 1. Identity & routing
  title: string;
  slug: string;
  status: 'draft' | 'published';
  location: string;
  duration: string;
  destinationSlug: string;
  featured: boolean;
  // 2. Hero
  gallery: ActivityImage[];
  videos: ActivityVideo[];
  mapUrl: string;
  rating: string;
  ratingCount: string;
  // 3. Price
  pricePerPerson: string;
  priceVerified: boolean;
  priceNote: string;
  // 4. Answer block & about
  quickAnswer: string;
  aboutHtml: string;
  // 5. Quick facts
  season: string;
  difficulty: ActivityDifficulty | '';
  suitedFor: string;
  extraFacts: ActivityFact[];
  // 6. Best months
  bestMonths: MonthWindowId[];
  // 7. What to expect
  whatToExpect: ActivityStep[];
  // 8. Inclusions & exclusions
  inclusions: ListRow[];
  exclusions: ListRow[];
  // 9. Booking & timing
  timing: ActivityTiming;
  // 10. Tips
  bookingTips: ListRow[];
  sartajTips: ListRow[];
  // 11. FAQs
  faqs: FaqItem[];
  // 12. SEO
  metaTitle: string;
  metaDescription: string;
}

export const EMPTY_TIMING: ActivityTiming = {
  schedules: [],
  weeklyOff: [],
  closedDates: [],
  weatherDependent: false,
  weatherNote: '',
  bookingLeadTime: '',
  verified: false,
  verifiedOn: '',
};

export const EMPTY_ACTIVITY: ExperienceActivityFormValues = {
  title: '',
  slug: '',
  status: 'draft',
  location: '',
  duration: '',
  destinationSlug: '',
  featured: false,
  gallery: [],
  videos: [],
  mapUrl: '',
  rating: '',
  ratingCount: '',
  pricePerPerson: '',
  priceVerified: false,
  priceNote: '',
  quickAnswer: '',
  aboutHtml: '',
  season: '',
  difficulty: '',
  suitedFor: '',
  extraFacts: [],
  bestMonths: [],
  whatToExpect: [],
  inclusions: [],
  exclusions: [],
  timing: EMPTY_TIMING,
  bookingTips: [],
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

const DIFFICULTY_HINT: Record<ActivityDifficulty, string> = {
  easy: 'easy — anyone, no fitness needed',
  moderate: 'moderate — most people with a normal level of fitness',
  challenging: 'challenging — needs real fitness',
  expert: 'expert — needs training or experience',
};

/** Rough word count for the 40–60 word answer block. */
const words = (v: string) => v.trim().split(/\s+/).filter(Boolean).length;

export default function ExperienceActivityEditor({
  mode,
  activityId,
  initial,
}: {
  mode: 'create' | 'edit';
  activityId?: string;
  initial?: ExperienceActivityFormValues;
}) {
  const router = useRouter();
  const STORAGE_KEY = 'cms_experience_create_draft';

  const [form, setForm] = useState<ExperienceActivityFormValues>(
    initial ?? EMPTY_ACTIVITY,
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
        if (raw && !cancelled) setForm({ ...EMPTY_ACTIVITY, ...JSON.parse(raw) });
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

  const f = <K extends keyof ExperienceActivityFormValues>(
    field: K,
    value: ExperienceActivityFormValues[K],
  ) => setForm((prev) => ({ ...prev, [field]: value }));

  /** Typing the title derives the slug until someone edits the slug by hand. */
  const onTitleChange = (value: string) => {
    setForm((prev) => {
      const derived = prev.slug === slugify(prev.title);
      return {
        ...prev,
        title: value,
        ...(derived ? { slug: slugify(value) } : {}),
      };
    });
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4000);
  };

  const buildPayload = (status: 'draft' | 'published') => ({
    slug: form.slug,
    title: form.title,
    status,
    location: form.location,
    duration: form.duration,
    destinationSlug: form.destinationSlug,
    featured: form.featured,

    gallery: form.gallery.filter((photo) => photo.image),
    // A row with no URL would render a "Watch Videos" button that goes nowhere.
    videos: form.videos.filter((video) => video.url),
    mapUrl: form.mapUrl,
    // undefined, not 0: an unset rating must print no stars at all, and the
    // enum-free numeric fields are the one place "" and 0 differ visibly.
    rating: form.rating ? Number(form.rating) : undefined,
    ratingCount: form.ratingCount ? Number(form.ratingCount) : undefined,

    pricePerPerson: Number(form.pricePerPerson) || 0,
    priceVerified: form.priceVerified,
    priceNote: form.priceNote,

    quickAnswer: form.quickAnswer,
    aboutHtml: form.aboutHtml,

    season: form.season,
    // The schema enum has no empty member — an unset difficulty is absent,
    // which is what makes the quick-facts row say "Ask us".
    difficulty: form.difficulty || undefined,
    suitedFor: form.suitedFor,
    extraFacts: form.extraFacts.filter((fact) => fact.label),

    bestMonths: form.bestMonths,

    whatToExpect: form.whatToExpect.filter((step) => step.title || step.body),

    inclusions: fromRows(form.inclusions),
    exclusions: fromRows(form.exclusions),

    timing: {
      ...form.timing,
      // A schedule with no times has nothing to say, and would render an empty
      // row on a section whose whole job is being precise.
      schedules: form.timing.schedules.filter((schedule) =>
        schedule.slots.some((slot) => slot.opens && slot.closes),
      ),
      closedDates: (form.timing.closedDates ?? []).filter(
        (closure) => closure.date,
      ),
      booking: form.timing.booking || undefined,
    },

    bookingTips: fromRows(form.bookingTips),
    sartajTips: fromRows(form.sartajTips),

    faqs: form.faqs.filter((faq) => faq.question && faq.answer),

    seo: { title: form.metaTitle, description: form.metaDescription },
  });

  const send = async (status: 'draft' | 'published') => {
    const url =
      mode === 'edit' ? `/api/experiences/${activityId}` : '/api/experiences';
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
        mode === 'edit' ? 'Activity updated!' : 'Activity published!',
        'success',
      );
      setTimeout(() => router.push('/admin/experiences'), 1200);
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
      setTimeout(() => router.push('/admin/experiences'), 1200);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const answerWords = words(form.quickAnswer);

  return (
    <div className="w-full py-8 pb-24">
      <CMSHeader editorType="Experience" />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ── 1. Identity & routing ── */}
        <CMSSection
          title="Activity Details"
          icon={<Mountain className="h-4 w-4" />}
          defaultOpen
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className={label}>Activity Title *</label>
              <input
                required
                className={`mt-2 ${inp}`}
                placeholder="e.g. Dal Lake Shikara Ride"
                value={form.title}
                onChange={(e) => onTitleChange(e.target.value)}
              />
            </div>

            <div>
              <label className={label}>URL *</label>
              <div className="mt-2 flex items-center gap-2">
                <span className="shrink-0 font-mono text-xs text-slate-600">
                  /experiences/
                </span>
                <input
                  required
                  className={`${inp} min-w-0`}
                  placeholder="dal-lake-shikara"
                  value={form.slug}
                  onChange={(e) => f('slug', slugify(e.target.value))}
                />
              </div>
            </div>

            <div>
              <label className={label}>Location</label>
              <input
                className={`mt-2 ${inp}`}
                placeholder="e.g. Srinagar"
                value={form.location}
                onChange={(e) => f('location', e.target.value)}
              />
              <p className={hint}>
                Where it actually happens. Also what the hero&apos;s “View Map”
                button searches for when no map link is set.
              </p>
            </div>

            <div>
              <label className={label}>
                <Clock className="h-3.5 w-3.5" /> Duration
              </label>
              <input
                className={`mt-2 ${inp}`}
                placeholder="e.g. 1 – 2 hours"
                value={form.duration}
                onChange={(e) => f('duration', e.target.value)}
              />
              <p className={hint}>
                Free text — write the real spread, not a single tidy number.
              </p>
            </div>

            <div>
              <label className={label}>Destination slug</label>
              <input
                className={`mt-2 ${inp}`}
                placeholder="e.g. gulmarg"
                value={form.destinationSlug}
                onChange={(e) => f('destinationSlug', slugify(e.target.value))}
              />
              <p className={hint}>
                Links this activity back into its destination page, and puts the
                same-destination activities first in the “related” rail. A slug
                that does not resolve drops the link rather than showing a dead
                one.
              </p>
            </div>

            <div className="flex items-end">
              <label className="flex cursor-pointer items-center gap-2.5 pb-2 text-sm text-slate-300">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-blue-500"
                  checked={form.featured}
                  onChange={(e) => f('featured', e.target.checked)}
                />
                Pin the “Featured” badge on the hub card
              </label>
            </div>
          </div>
        </CMSSection>

        {/* ── 2. Hero ── */}
        <CMSSection
          title="Hero & Gallery"
          icon={<Images className="h-4 w-4" />}
          badge={form.gallery.length || undefined}
        >
          <div className="space-y-5">
            <div>
              <label className={label}>Photo carousel *</label>
              <p className={hint}>
                The first photo is the cover — it is the card image and the Open
                Graph image when the page is shared. The photo-count pill counts
                these, so it can never claim more photos than exist.
              </p>
              <DestinationImagesEditor
                images={form.gallery}
                setImages={(images) => f('gallery', images)}
                addLabel="Add Photo"
                leadLabel="Cover"
                editorType="experience"
                altHint="Alt text describes THIS photo, not the activity — it ships verbatim and is the only description of the image on the page."
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={label}>Rating (0–5)</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="Leave empty until there are real reviews"
                  value={form.rating}
                  onChange={(e) => f('rating', e.target.value)}
                />
                <p className={hint}>
                  Only from genuine on-page reviews. Left empty the hero shows no
                  stars at all, which is the honest state — invented ratings are
                  a domain-wide manual-action risk.
                </p>
              </div>

              <div>
                <label className={label}>Number of ratings</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="e.g. 128"
                  value={form.ratingCount}
                  onChange={(e) => f('ratingCount', e.target.value)}
                />
                <p className={hint}>
                  The hero prints “(N Ratings)” only when this is set.
                </p>
              </div>
            </div>

            <div>
              <label className={label}>Map link override</label>
              <input
                className={`mt-2 ${inp}`}
                placeholder="Leave empty — the button searches Google Maps for the location above"
                value={form.mapUrl}
                onChange={(e) => f('mapUrl', e.target.value)}
              />
            </div>

            <div>
              <label className={label}>
                <Film className="h-3.5 w-3.5" /> Videos
              </label>
              <p className={hint}>
                The hero&apos;s “Watch Videos” button appears only when there is
                at least one.
              </p>
              <div className="mt-3">
                <ActivityVideosEditor
                  videos={form.videos}
                  setVideos={(videos) => f('videos', videos)}
                />
              </div>
            </div>
          </div>
        </CMSSection>

        {/* ── 3. Price ── */}
        <CMSSection
          title="Price"
          icon={<IndianRupee className="h-4 w-4" />}
          defaultOpen={false}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={label}>Per person, INR</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="e.g. 1500"
                  value={form.pricePerPerson}
                  onChange={(e) => f('pricePerPerson', e.target.value)}
                />
              </div>

              <div>
                <label className={label}>Price qualifier</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="e.g. Per boat per hour, not per person"
                  value={form.priceNote}
                  onChange={(e) => f('priceNote', e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-xl border border-amber-600/25 bg-amber-600/5 p-4">
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-300">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-amber-500"
                  checked={form.priceVerified}
                  onChange={(e) => f('priceVerified', e.target.checked)}
                />
                This price has been verified for the current season
              </label>
              <p className={hint}>
                Ticking this publishes a schema.org Offer — a machine-readable
                price commitment — and removes the “indicative rate” caveat from
                the enquiry card. Both come from this one flag, so they cannot
                disagree. Leave it off until the figure has been checked.
              </p>
            </div>
          </div>
        </CMSSection>

        {/* ── 4. Answer block & about ── */}
        <CMSSection
          title="Answer Block & About"
          icon={<Sparkles className="h-4 w-4" />}
          defaultOpen={false}
        >
          <div className="space-y-5">
            <div>
              <label className={label}>
                Answer block{' '}
                <span className="text-slate-600">({answerWords} words)</span>
              </label>
              <textarea
                className={`mt-2 ${ta}`}
                placeholder="What this is and whether it is for you — before anything else on the page."
                value={form.quickAnswer}
                onChange={(e) => f('quickAnswer', e.target.value)}
              />
              <p className={hint}>
                40–60 words. This is the block most likely to be lifted as a
                featured snippet, so it has to read as a complete answer on its
                own — and it is the meta description when the SEO field below is
                left empty.
              </p>
            </div>

            <div>
              <label className={label}>
                <FileText className="h-3.5 w-3.5" /> About this activity
                <span className="ml-1 text-xs text-slate-600">Rich Text</span>
              </label>
              <p className={hint}>
                Headings, lists, links, tables and emphasis survive; scripts,
                iframes and inline styles are stripped server-side.
              </p>
              <div className="mt-3">
                <RichTextEditor
                  value={form.aboutHtml}
                  onChange={(html: string) => f('aboutHtml', html)}
                  minHeight="320px"
                  maxHeight="620px"
                />
              </div>
            </div>
          </div>
        </CMSSection>

        {/* ── 5. Quick facts ── */}
        <CMSSection
          title="Quick Facts"
          icon={<ListChecks className="h-4 w-4" />}
          defaultOpen={false}
          badge={form.extraFacts.length || undefined}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={label}>Season</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="e.g. Dec–Mar; deepest snow Jan–Feb"
                  value={form.season}
                  onChange={(e) => f('season', e.target.value)}
                />
              </div>

              <div>
                <label className={label}>Difficulty</label>
                <select
                  className={`mt-2 ${sel}`}
                  value={form.difficulty}
                  onChange={(e) =>
                    f('difficulty', e.target.value as ActivityDifficulty | '')
                  }
                >
                  <option value="" className="bg-[#0b1730]">
                    Not stated
                  </option>
                  {ACTIVITY_DIFFICULTIES.map((level) => (
                    <option key={level} value={level} className="bg-[#0b1730]">
                      {DIFFICULTY_HINT[level]}
                    </option>
                  ))}
                </select>
                <p className={hint}>
                  Four levels rather than a score — the honest resolution is
                  “anyone / most people / needs fitness / needs training”.
                </p>
              </div>

              <div className="md:col-span-2">
                <label className={label}>Suited for</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="e.g. Anyone — no fitness needed, and the boat is boarded from a step"
                  value={form.suitedFor}
                  onChange={(e) => f('suitedFor', e.target.value)}
                />
                <p className={hint}>
                  The difficulty rating in plain words, including who should not
                  do this.
                </p>
              </div>
            </div>

            <div>
              <label className={label}>Extra rows</label>
              <p className={hint}>
                Anything else worth a row — capacity, departure point, the best
                hour of the day. The table just gets taller.
              </p>
              <div className="mt-3">
                <DestinationPairEditor
                  items={form.extraFacts}
                  setItems={(items) => f('extraFacts', items)}
                  fieldA="label"
                  fieldB="value"
                  placeholderA="Label — e.g. Boat capacity"
                  placeholderB="Value — e.g. Up to 4 adults"
                  addLabel="Add Fact Row"
                />
              </div>
            </div>
          </div>
        </CMSSection>

        {/* ── 6. Best months ── */}
        <CMSSection
          title="Best Months"
          icon={<CalendarDays className="h-4 w-4" />}
          defaultOpen={false}
          badge={form.bestMonths.length || undefined}
        >
          <div className="space-y-3">
            <p className="text-xs text-slate-600">
              Which of the hub&apos;s month tabs this activity appears under.
              Empty simply means it never shows there — it stays in the archive
              either way.
            </p>
            <ActivityMonthsEditor
              months={form.bestMonths}
              setMonths={(months) => f('bestMonths', months)}
            />
          </div>
        </CMSSection>

        {/* ── 7. What to expect ── */}
        <CMSSection
          title="What To Expect"
          icon={<Footprints className="h-4 w-4" />}
          defaultOpen={false}
          badge={form.whatToExpect.length || undefined}
        >
          <ActivityStepsEditor
            steps={form.whatToExpect}
            setSteps={(steps) => f('whatToExpect', steps)}
          />
        </CMSSection>

        {/* ── 8. Inclusions & exclusions ── */}
        <CMSSection
          title="Inclusions & Exclusions"
          icon={<ListChecks className="h-4 w-4" />}
          defaultOpen={false}
          badge={form.inclusions.length + form.exclusions.length || undefined}
        >
          <div className="space-y-6">
            <div>
              <label className={label}>Inclusions — what the price covers</label>
              <div className="mt-3">
                <SimpleListEditor
                  items={form.inclusions}
                  setItems={(items) => f('inclusions', items)}
                  field="value"
                  placeholder="Inclusion"
                  addLabel="Add Inclusion"
                />
              </div>
            </div>

            <div>
              <label className={label}>Exclusions — name the real ones</label>
              <p className={hint}>
                This is the trust block. Being specific here is the difference
                between an honest page and an OTA listing.
              </p>
              <div className="mt-3">
                <SimpleListEditor
                  items={form.exclusions}
                  setItems={(items) => f('exclusions', items)}
                  field="value"
                  placeholder="Exclusion"
                  addLabel="Add Exclusion"
                />
              </div>
            </div>
          </div>
        </CMSSection>

        {/* ── 9. Booking & timing ── */}
        <CMSSection
          title="Booking & Timing"
          icon={<Clock className="h-4 w-4" />}
          defaultOpen={false}
          badge={form.timing.schedules.length || undefined}
        >
          <ActivityTimingEditor
            timing={form.timing}
            setTiming={(timing) => f('timing', timing)}
          />
        </CMSSection>

        {/* ── 10. Tips ── */}
        <CMSSection
          title="Tips"
          icon={<Lightbulb className="h-4 w-4" />}
          defaultOpen={false}
          badge={
            form.bookingTips.length + form.sartajTips.length || undefined
          }
        >
          <div className="space-y-6">
            <div>
              <label className={label}>Booking tips</label>
              <p className={hint}>
                Practical advice that does not fit the structured timing above —
                “take the first slot, cloud builds through the afternoon”.
              </p>
              <div className="mt-3">
                <SimpleListEditor
                  items={form.bookingTips}
                  setItems={(items) => f('bookingTips', items)}
                  field="value"
                  placeholder="Booking tip"
                  addLabel="Add Booking Tip"
                />
              </div>
            </div>

            <div>
              <label className={label}>Sartaj&apos;s tips</label>
              <p className={hint}>
                The part a reader cannot get from an aggregator. Each one should
                be specific and checkable — “carry warm clothes” is not a tip.
              </p>
              <div className="mt-3">
                <SimpleListEditor
                  items={form.sartajTips}
                  setItems={(items) => f('sartajTips', items)}
                  field="value"
                  placeholder="Tip"
                  addLabel="Add Tip"
                />
              </div>
            </div>
          </div>
        </CMSSection>

        {/* ── 11. FAQs ── */}
        <CMSSection
          title="FAQs"
          icon={<MessageCircleQuestion className="h-4 w-4" />}
          defaultOpen={false}
          badge={form.faqs.length || undefined}
        >
          <div className="space-y-3">
            <p className="text-xs text-slate-600">
              Scope these to THIS activity — the hub-level questions must not
              compete for the same queries. Plain text only: these answers ship
              verbatim as FAQPage structured data, so a row with only half of it
              filled in is dropped rather than emitted.
            </p>
            <FaqHandler faqs={form.faqs} setFaqs={(faqs) => f('faqs', faqs)} />
          </div>
        </CMSSection>

        {/* ── 12. SEO ── */}
        <CMSSection
          title="SEO"
          icon={<Search className="h-4 w-4" />}
          defaultOpen={false}
        >
          <div className="space-y-3">
            <p className="text-xs text-slate-600">
              Both are overrides. Left empty, the page builds a title from the
              activity name and location, and uses the answer block above as the
              description.
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
