'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  CalendarDays,
  Car,
  CheckCircle2,
  Compass,
  Images,
  Lightbulb,
  ListChecks,
  MapPin,
  MessageCircleQuestion,
  Mountain,
  Plus,
  Route,
  Search,
  Sparkles,
  X,
} from 'lucide-react';

import CMSHeader from '@/components/admin/cms/CMSHeader';
import CMSSection from '@/components/admin/CMSSection';
import CMSSeoSection from '@/components/admin/cms/CMSSeoSection';
import CMSMediaSection from '@/components/admin/cms/CMSMediaSection';
import CMSActions from '@/components/admin/cms/CMSActions';
import FaqHandler, { FaqItem } from '@/components/admin/cms/FaqHandler';
import StayPlaceTipsEditor from '@/components/admin/stays/StayPlaceTipsEditor';
import DestinationImagesEditor from '@/components/admin/destinations/DestinationImagesEditor';
import DestinationPairEditor from '@/components/admin/destinations/DestinationPairEditor';
import DestinationThingsToDoEditor from '@/components/admin/destinations/DestinationThingsToDoEditor';
import DestinationHowToReachEditor from '@/components/admin/destinations/DestinationHowToReachEditor';
import DestinationCabFaresEditor from '@/components/admin/destinations/DestinationCabFaresEditor';
import DestinationMonthsEditor, {
  emptyMonths,
} from '@/components/admin/destinations/DestinationMonthsEditor';
import type {
  IDestinationCabFare,
  IDestinationFact,
  IDestinationImage,
  IDestinationLandmark,
  IDestinationTip,
  IMonthEntry,
  IThingToDo,
  ITransportMode,
} from '@/types/destinationTypes';

/**
 * Shared create/edit form for a destination page (/destinations/[slug]).
 *
 * One component drives both routes so they cannot drift apart — the same
 * arrangement as StayEditor, and the section order matches the order the
 * public page renders in, so an editor working top to bottom is walking down
 * the page.
 *
 * Numeric fields are held as strings in form state (an <input> hands back
 * strings, and "" is not 0) and cast once in buildPayload.
 */

export interface DestinationFormValues {
  // 1. Identity & routing
  name: string;
  slug: string;
  status: 'draft' | 'published';
  summary: string;
  fromSrinagar: string;
  // 2. Hero
  quickAnswer: string;
  idealDays: string;
  heroImages: IDestinationImage[];
  image: string;
  imageAlt: string;
  hoverImage: string;
  // 3. Quick facts
  altitude: string;
  bestTime: string;
  famousFor: string;
  extraFacts: IDestinationFact[];
  // 4. Things to do
  thingsToDo: IThingToDo[];
  // 5. How to reach
  howToReachOverview: string;
  transportModes: ITransportMode[];
  // 6. Cab fares
  cabFares: IDestinationCabFare[];
  // 7. Where to stay
  staySlugs: string[];
  // 8. Best time
  bestTimeOverview: string;
  months: IMonthEntry[];
  // 9. Photo strip
  galleryImages: IDestinationImage[];
  // 10. Sartaj's tips
  tipsIntro: string;
  sartajTips: IDestinationTip[];
  // 11. Map
  lat: string;
  lng: string;
  zoom: string;
  embedUrl: string;
  mapBlurb: string;
  landmarks: IDestinationLandmark[];
  // 12. FAQs
  faqs: FaqItem[];
  // 13. SEO
  metaTitle: string;
  metaDescription: string;
  schemaTitle: string;
  schemaDescription: string;
}

export const EMPTY_DESTINATION: DestinationFormValues = {
  name: '',
  slug: '',
  status: 'draft',
  summary: '',
  fromSrinagar: '',
  quickAnswer: '',
  idealDays: '',
  heroImages: [],
  image: '',
  imageAlt: '',
  hoverImage: '',
  altitude: '',
  bestTime: '',
  famousFor: '',
  extraFacts: [],
  thingsToDo: [],
  howToReachOverview: '',
  transportModes: [],
  cabFares: [],
  staySlugs: [],
  bestTimeOverview: '',
  months: emptyMonths(),
  galleryImages: [],
  tipsIntro: '',
  sartajTips: [],
  lat: '',
  lng: '',
  zoom: '12',
  embedUrl: '',
  mapBlurb: '',
  landmarks: [],
  faqs: [],
  metaTitle: '',
  metaDescription: '',
  schemaTitle: '',
  schemaDescription: '',
};

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
const label = 'text-sm text-slate-400 flex items-center gap-1.5';
const hint = 'mt-1.5 text-xs text-slate-600';

/** Rough word count for the 40–60 word answer block. */
const words = (v: string) => v.trim().split(/\s+/).filter(Boolean).length;

export default function DestinationEditor({
  mode,
  destinationId,
  initial,
}: {
  mode: 'create' | 'edit';
  destinationId?: string;
  initial?: DestinationFormValues;
}) {
  const router = useRouter();
  const STORAGE_KEY = 'cms_destination_create_draft';

  const [form, setForm] = useState<DestinationFormValues>(
    initial ?? EMPTY_DESTINATION,
  );
  const [stayInput, setStayInput] = useState('');
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
        if (raw && !cancelled)
          setForm({ ...EMPTY_DESTINATION, ...JSON.parse(raw) });
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

  const f = <K extends keyof DestinationFormValues>(
    field: K,
    value: DestinationFormValues[K],
  ) => setForm((prev) => ({ ...prev, [field]: value }));

  /** Typing the name derives the slug until someone edits the slug by hand. */
  const onNameChange = (value: string) => {
    setForm((prev) => {
      const derived = prev.slug === slugify(prev.name);
      return { ...prev, name: value, ...(derived ? { slug: slugify(value) } : {}) };
    });
  };

  const addStaySlug = () => {
    const slug = slugify(stayInput);
    if (!slug || form.staySlugs.includes(slug)) {
      setStayInput('');
      return;
    }
    setForm((prev) => ({ ...prev, staySlugs: [...prev.staySlugs, slug] }));
    setStayInput('');
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4000);
  };

  const buildPayload = (status: 'draft' | 'published') => ({
    slug: form.slug,
    name: form.name,
    status,
    summary: form.summary,
    fromSrinagar: form.fromSrinagar,

    quickAnswer: form.quickAnswer,
    idealDays: form.idealDays,
    heroImages: form.heroImages,
    image: form.image,
    imageAlt: form.imageAlt,
    hoverImage: form.hoverImage,

    altitude: form.altitude,
    bestTime: form.bestTime,
    famousFor: form.famousFor,
    extraFacts: form.extraFacts,

    thingsToDo: form.thingsToDo,

    howToReach: {
      overview: form.howToReachOverview,
      transportModes: form.transportModes,
    },

    // Rows left without a slug would resolve to nothing anyway; dropping them
    // here keeps an empty row from turning into "show the whole fleet".
    cabFares: form.cabFares.filter((fare) => fare.slug),

    staySlugs: form.staySlugs,

    bestTimeTable: {
      overview: form.bestTimeOverview,
      months: form.months,
    },

    galleryImages: form.galleryImages,

    tipsIntro: form.tipsIntro,
    sartajTips: form.sartajTips,

    map: {
      lat: Number(form.lat) || 0,
      lng: Number(form.lng) || 0,
      zoom: Number(form.zoom) || 12,
      embedUrl: form.embedUrl,
      blurb: form.mapBlurb,
      landmarks: form.landmarks,
    },

    faqs: form.faqs,

    metaTitle: form.metaTitle,
    metaDescription: form.metaDescription,
    schemaTitle: form.schemaTitle,
    schemaDescription: form.schemaDescription,
  });

  const send = async (status: 'draft' | 'published') => {
    const url =
      mode === 'edit' ? `/api/destinations/${destinationId}` : '/api/destinations';
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
        mode === 'edit' ? 'Destination updated!' : 'Destination published!',
        'success',
      );
      setTimeout(() => router.push('/admin/destinations'), 1200);
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
      setTimeout(() => router.push('/admin/destinations'), 1200);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const answerWords = words(form.quickAnswer);

  return (
    <div className="w-full py-8 pb-24">
      <CMSHeader editorType="Destination" />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ── 1. Identity & routing ── */}
        <CMSSection
          title="Destination Details"
          icon={<Compass className="h-4 w-4" />}
          defaultOpen
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className={label}>Destination Name *</label>
              <input
                required
                className={`mt-2 ${inp}`}
                placeholder="e.g. Gulmarg"
                value={form.name}
                onChange={(e) => onNameChange(e.target.value)}
              />
            </div>

            <div>
              <label className={label}>URL *</label>
              <div className="mt-2 flex items-center gap-2">
                <span className="shrink-0 font-mono text-xs text-slate-600">
                  /destinations/
                </span>
                <input
                  required
                  className={`${inp} min-w-0`}
                  placeholder="gulmarg"
                  value={form.slug}
                  onChange={(e) => f('slug', slugify(e.target.value))}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={label}>Card summary</label>
              <input
                className={`mt-2 ${inp}`}
                placeholder="e.g. Gondola rides, snow views, meadows, skiing and winter trips."
                value={form.summary}
                onChange={(e) => f('summary', e.target.value)}
              />
              <p className={hint}>
                One line for the /destinations hub card — what the place is known
                for.
              </p>
            </div>

            <div>
              <label className={label}>
                <Route className="h-3.5 w-3.5" /> From Srinagar
              </label>
              <input
                className={`mt-2 ${inp}`}
                placeholder="e.g. 50–65 km, 1.5–2 h"
                value={form.fromSrinagar}
                onChange={(e) => f('fromSrinagar', e.target.value)}
              />
              <p className={hint}>
                Leave empty for Srinagar itself — the page then says “Base city”.
              </p>
            </div>

            <div>
              <label className={label}>
                <CalendarDays className="h-3.5 w-3.5" /> Time to give it
              </label>
              <input
                className={`mt-2 ${inp}`}
                placeholder="e.g. 1–2 days"
                value={form.idealDays}
                onChange={(e) => f('idealDays', e.target.value)}
              />
            </div>
          </div>
        </CMSSection>

        {/* ── 2. Hero ── */}
        <CMSSection
          title="Hero"
          icon={<Sparkles className="h-4 w-4" />}
          badge={form.heroImages.length || undefined}
        >
          <div className="space-y-5">
            <div>
              <label className={label}>
                Answer block *{' '}
                <span className="text-slate-600">({answerWords} words)</span>
              </label>
              <textarea
                required
                className={`mt-2 ${ta}`}
                placeholder="What this place is and why you would go — before anything else on the page."
                value={form.quickAnswer}
                onChange={(e) => f('quickAnswer', e.target.value)}
              />
              <p className={hint}>
                40–60 words. This is also the meta description when the SEO field
                below is left empty, so it has to stand alone.
              </p>
            </div>

            <div>
              <label className={label}>Hero carousel</label>
              <p className={hint}>
                One photo is fine — the carousel only rotates from two. Never
                label a photo as somewhere it is not; an honest single slide beats
                a padded carousel.
              </p>
              <DestinationImagesEditor
                images={form.heroImages}
                setImages={(images) => f('heroImages', images)}
                addLabel="Add Hero Slide"
                leadLabel="First slide"
                altHint="Alt text describes THIS photo, not the place — it is the only description of the image on the page."
              />
            </div>

            <div>
              <label className={label}>Card & social share photo</label>
              <p className={hint}>
                Used on the hub card and as the Open Graph image when the page is
                shared.
              </p>
              <CMSMediaSection
                image={form.image}
                alt={form.imageAlt}
                editorType="destination"
                onChange={(field, value) =>
                  f(field === 'image' ? 'image' : 'imageAlt', value)
                }
              />
            </div>

            <div>
              <label className={label}>Hover photo (optional)</label>
              <input
                className={`mt-2 ${inp}`}
                placeholder="/destinations/gulmarg-2.webp"
                value={form.hoverImage}
                onChange={(e) => f('hoverImage', e.target.value)}
              />
              <p className={hint}>
                A second angle of the same place, crossfaded on hub-card hover.
                Left empty, the card falls back to a slow zoom.
              </p>
            </div>
          </div>
        </CMSSection>

        {/* ── 3. Quick facts ── */}
        <CMSSection
          title="Quick Facts"
          icon={<Mountain className="h-4 w-4" />}
          defaultOpen={false}
          badge={form.extraFacts.length || undefined}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={label}>Altitude</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="e.g. ~2,650 m (8,700 ft)"
                  value={form.altitude}
                  onChange={(e) => f('altitude', e.target.value)}
                />
                <p className={hint}>
                  Round it — published figures disagree by tens of metres.
                </p>
              </div>

              <div>
                <label className={label}>Best time</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="e.g. December to February for snow, April to June for meadows"
                  value={form.bestTime}
                  onChange={(e) => f('bestTime', e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <label className={label}>Famous for</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="e.g. Gondola cable car, skiing, snow meadows"
                  value={form.famousFor}
                  onChange={(e) => f('famousFor', e.target.value)}
                />
                <p className={hint}>
                  Two or three things, table-cell length.
                </p>
              </div>
            </div>

            <div>
              <label className={label}>Extra rows</label>
              <p className={hint}>
                Anything else worth a row — permits, network coverage, nearest
                ATM. The table just gets taller.
              </p>
              <div className="mt-3">
                <DestinationPairEditor
                  items={form.extraFacts}
                  setItems={(items) => f('extraFacts', items)}
                  fieldA="label"
                  fieldB="value"
                  placeholderA="Label — e.g. Permit"
                  placeholderB="Value — e.g. Not required"
                  addLabel="Add Fact Row"
                />
              </div>
            </div>
          </div>
        </CMSSection>

        {/* ── 4. Things to do ── */}
        <CMSSection
          title="Things To Do"
          icon={<ListChecks className="h-4 w-4" />}
          defaultOpen={false}
          badge={form.thingsToDo.length || undefined}
        >
          <DestinationThingsToDoEditor
            items={form.thingsToDo}
            setItems={(items) => f('thingsToDo', items)}
          />
        </CMSSection>

        {/* ── 5. How to reach ── */}
        <CMSSection
          title="How To Reach"
          icon={<Route className="h-4 w-4" />}
          defaultOpen={false}
          badge={form.transportModes.length || undefined}
        >
          <div className="space-y-4">
            <div>
              <label className={label}>Overview</label>
              <textarea
                className={`mt-2 ${ta}`}
                placeholder="Answer-first: the shortest true version of how you get here."
                value={form.howToReachOverview}
                onChange={(e) => f('howToReachOverview', e.target.value)}
              />
            </div>

            <DestinationHowToReachEditor
              modes={form.transportModes}
              setModes={(modes) => f('transportModes', modes)}
            />
          </div>
        </CMSSection>

        {/* ── 6. Cab fares ── */}
        <CMSSection
          title="Cab Fares"
          icon={<Car className="h-4 w-4" />}
          defaultOpen={false}
          badge={form.cabFares.length || undefined}
        >
          <div className="space-y-3">
            <p className="text-xs text-slate-600">
              Leave this empty to list the whole published fleet at base rate —
              the table labels those as starting prices. Add rows only to fix the
              order or to set a route-specific fare.
            </p>
            <DestinationCabFaresEditor
              fares={form.cabFares}
              setFares={(fares) => f('cabFares', fares)}
            />
          </div>
        </CMSSection>

        {/* ── 7. Where to stay ── */}
        <CMSSection
          title="Where To Stay"
          icon={<MapPin className="h-4 w-4" />}
          defaultOpen={false}
          badge={form.staySlugs.length || undefined}
        >
          <div>
            <label className={label}>Stay slugs, in display order</label>
            <div className="mt-2 flex gap-2">
              <input
                className={`${inp} min-w-0`}
                placeholder="dal-lake-deluxe-houseboat — press Enter to add"
                value={stayInput}
                onChange={(e) => setStayInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addStaySlug();
                  }
                }}
              />
              <button
                type="button"
                onClick={addStaySlug}
                className="shrink-0 rounded-xl border border-blue-600/30 px-4 text-sm text-blue-400 transition-all hover:bg-blue-600/10"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <p className={hint}>
              Only these stays are fetched, in this order, so the destination
              leads with what it should. A slug that stops resolving is dropped
              rather than shown as a dead card. Empty hides the section.
            </p>

            {form.staySlugs.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {form.staySlugs.map((slug) => (
                  <span
                    key={slug}
                    className="flex items-center gap-1.5 rounded-full border border-blue-600/20 bg-blue-600/10 px-2.5 py-1 text-xs text-blue-400"
                  >
                    {slug}
                    <button
                      type="button"
                      onClick={() =>
                        f(
                          'staySlugs',
                          form.staySlugs.filter((s) => s !== slug),
                        )
                      }
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </CMSSection>

        {/* ── 8. Best time ── */}
        <CMSSection
          title="Best Time To Visit"
          icon={<CalendarDays className="h-4 w-4" />}
          defaultOpen={false}
        >
          <div className="space-y-4">
            <div>
              <label className={label}>Overview</label>
              <textarea
                className={`mt-2 ${ta}`}
                placeholder="Answer-first line above the table — the seasons in one paragraph."
                value={form.bestTimeOverview}
                onChange={(e) => f('bestTimeOverview', e.target.value)}
              />
            </div>

            <DestinationMonthsEditor
              months={form.months}
              setMonths={(months) => f('months', months)}
            />
          </div>
        </CMSSection>

        {/* ── 9. Photo strip ── */}
        <CMSSection
          title="Photo Strip"
          icon={<Images className="h-4 w-4" />}
          defaultOpen={false}
          badge={form.galleryImages.length || undefined}
        >
          <div>
            <p className="text-xs text-slate-600">
              A scrolling strip below the month table. Short lists are repeated to
              fill the screen, so four good photos beat ten padded ones — and a
              photo of somewhere else is worse than a short strip.
            </p>
            <DestinationImagesEditor
              images={form.galleryImages}
              setImages={(images) => f('galleryImages', images)}
              addLabel="Add Strip Photo"
              altHint="Only the first pass of each photo is announced to a screen reader; the repeats are marked decorative."
            />
          </div>
        </CMSSection>

        {/* ── 10. Sartaj's tips ── */}
        <CMSSection
          title="Sartaj's Tips"
          icon={<Lightbulb className="h-4 w-4" />}
          defaultOpen={false}
          badge={form.sartajTips.length || undefined}
        >
          <div className="space-y-4">
            <div>
              <label className={label}>Intro</label>
              <textarea
                className={`mt-2 ${ta}`}
                placeholder="Left empty, the section uses its standard line."
                value={form.tipsIntro}
                onChange={(e) => f('tipsIntro', e.target.value)}
              />
              <p className={hint}>
                Each tip should be a specific, checkable truth a reader cannot get
                from an aggregator. “Carry warm clothes” is not a tip.
              </p>
            </div>

            <StayPlaceTipsEditor
              tips={form.sartajTips}
              setTips={(updater) =>
                setForm((prev) => ({
                  ...prev,
                  sartajTips:
                    typeof updater === 'function'
                      ? updater(prev.sartajTips)
                      : updater,
                }))
              }
            />
          </div>
        </CMSSection>

        {/* ── 11. Map ── */}
        <CMSSection
          title="Map"
          icon={<MapPin className="h-4 w-4" />}
          defaultOpen={false}
          badge={form.landmarks.length || undefined}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className={label}>Latitude</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="34.0484"
                  value={form.lat}
                  onChange={(e) => f('lat', e.target.value)}
                />
              </div>
              <div>
                <label className={label}>Longitude</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="74.3805"
                  value={form.lng}
                  onChange={(e) => f('lng', e.target.value)}
                />
              </div>
              <div>
                <label className={label}>Zoom</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="12"
                  value={form.zoom}
                  onChange={(e) => f('zoom', e.target.value)}
                />
                <p className={hint}>11–13 suits a town and its valley.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600">
              Coordinates are enough — the page builds both the embedded map and
              the directions link from them. No iframe markup goes in here.
            </p>

            <div>
              <label className={label}>Orientation copy</label>
              <textarea
                className={`mt-2 ${ta}`}
                placeholder="How the place is laid out — what is near what, and where a visitor bases themselves."
                value={form.mapBlurb}
                onChange={(e) => f('mapBlurb', e.target.value)}
              />
            </div>

            <div>
              <label className={label}>Landmarks</label>
              <div className="mt-3">
                <DestinationPairEditor
                  items={form.landmarks}
                  setItems={(items) => f('landmarks', items)}
                  fieldA="name"
                  fieldB="detail"
                  placeholderA="Name — e.g. Gondola base station"
                  placeholderB="Detail — e.g. Centre of the meadow"
                  addLabel="Add Landmark"
                />
              </div>
            </div>

            <div>
              <label className={label}>Embed URL override (rare)</label>
              <input
                className={`mt-2 ${inp}`}
                placeholder="Leave empty in almost every case"
                value={form.embedUrl}
                onChange={(e) => f('embedUrl', e.target.value)}
              />
            </div>
          </div>
        </CMSSection>

        {/* ── 12. FAQs ── */}
        <CMSSection
          title="FAQs"
          icon={<MessageCircleQuestion className="h-4 w-4" />}
          defaultOpen={false}
          badge={form.faqs.length || undefined}
        >
          <div className="space-y-3">
            <p className="text-xs text-slate-600">
              Scope these to this place — “which destination first” and “how many
              days for all four” belong on the hub, and the two must not compete
              for the same queries. Plain text only: these answers ship verbatim
              as FAQPage structured data, so a row with only half of it filled in
              is dropped rather than emitted.
            </p>
            <FaqHandler faqs={form.faqs} setFaqs={(faqs) => f('faqs', faqs)} />
          </div>
        </CMSSection>

        {/* ── 13. SEO ── */}
        <CMSSection
          title="SEO & Schema"
          icon={<Search className="h-4 w-4" />}
          defaultOpen={false}
        >
          <div className="space-y-4">
            <CMSSeoSection
              metaTitle={form.metaTitle}
              metaDescription={form.metaDescription}
              onChange={(field, value) =>
                f(field as 'metaTitle' | 'metaDescription', value)
              }
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={label}>Schema title</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="e.g. Gulmarg"
                  value={form.schemaTitle}
                  onChange={(e) => f('schemaTitle', e.target.value)}
                />
              </div>
              <div>
                <label className={label}>Schema description</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="One sentence describing the place"
                  value={form.schemaDescription}
                  onChange={(e) => f('schemaDescription', e.target.value)}
                />
              </div>
            </div>
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
