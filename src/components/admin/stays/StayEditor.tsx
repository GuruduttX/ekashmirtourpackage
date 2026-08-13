'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  AlignLeft,
  BedDouble,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  IndianRupee,
  Lightbulb,
  Link2,
  ListChecks,
  MapPin,
  MessageCircleQuestion,
  Plus,
  ScrollText,
  Sparkles,
  X,
} from 'lucide-react';

import CMSHeader from '@/components/admin/cms/CMSHeader';
import CMSSection from '@/components/admin/CMSSection';
import CMSSeoSection from '@/components/admin/cms/CMSSeoSection';
import CMSMediaSection from '@/components/admin/cms/CMSMediaSection';
import CMSActions from '@/components/admin/cms/CMSActions';
import FaqHandler, { FaqItem } from '@/components/admin/cms/FaqHandler';
import SimpleListEditor from '@/components/admin/stays/SimpleListEditor';
import StayAmenitiesEditor from '@/components/admin/stays/StayAmenitiesEditor';
import StayGalleryEditor from '@/components/admin/stays/StayGalleryEditor';
import StayPlaceTipsEditor from '@/components/admin/stays/StayPlaceTipsEditor';
import StayPlaceLinksEditor from '@/components/admin/stays/StayPlaceLinksEditor';
import {
  STAY_CATEGORIES,
  type IStayAmenity,
  type IStayGalleryImage,
  type IStayHighlight,
  type IStayHouseRule,
  type IStayLink,
  type IStayListItem,
  type IStayTip,
  type StayCategory,
} from '@/types/stayTypes';

const RichTextEditor = dynamic(
  () => import('@/components/admin/shared/RichTextEditor'),
  {
    ssr: false,
    loading: () => (
      <div className="mt-2 h-80 animate-pulse rounded-xl border border-[#19315d]/60 bg-[#07111f]" />
    ),
  },
);

/**
 * Shared create/edit form for an individual stay (/stays/[property-slug]).
 *
 * One component drives both routes so they cannot drift apart.
 * There is deliberately no reviews/rating section — see src/types/stayTypes.ts.
 */

export interface StayFormValues {
  // 1. Identity & routing
  title: string;
  slug: string;
  category: StayCategory;
  town: string;
  area: string;
  placeTags: string[];
  host: string;
  address: string;
  status: 'draft' | 'published';
  // 2. Hero
  eyebrow: string;
  titleAccent: string;
  quickAnswer: string;
  heroImage: { image: string; alt: string };
  // 3. Gallery
  gallery: IStayGalleryImage[];
  // 4. Key facts & pricing
  priceFrom: string;
  bestFor: string;
  sleeps: string;
  bedrooms: string;
  checkIn: string;
  checkOut: string;
  minNights: string;
  highlights: IStayHighlight[];
  // 5. Amenities
  quickInclusions: { freeWifi: boolean; breakfast: boolean; parking: boolean };
  amenities: IStayAmenity[];
  // 6. Overview
  overview: string;
  // 7. Inclusions & exclusions
  inclusions: IStayListItem[];
  exclusions: IStayListItem[];
  // 8. Policies
  cancellationPolicy: string;
  paymentTerms: string;
  houseRules: IStayHouseRule[];
  // 9. Sartaj's tips
  tipsHeading: string;
  tipsIntro: string;
  sartajTips: IStayTip[];
  // 10. FAQs
  faqsHeading: string;
  faqsIntro: string;
  faqs: FaqItem[];
  // 11. Internal linking
  linksHeading: string;
  linksIntro: string;
  internalLinks: IStayLink[];
  // 12. SEO
  metaTitle: string;
  metaDescription: string;
  schemaTitle: string;
  schemaDescription: string;
}

export const EMPTY_STAY: StayFormValues = {
  title: '',
  slug: '',
  category: 'Houseboat',
  town: '',
  area: '',
  placeTags: [],
  host: '',
  address: '',
  status: 'draft',
  eyebrow: '',
  titleAccent: '',
  quickAnswer: '',
  heroImage: { image: '', alt: '' },
  gallery: [],
  priceFrom: '',
  bestFor: '',
  sleeps: '',
  bedrooms: '',
  checkIn: '',
  checkOut: '',
  minNights: '1',
  highlights: [],
  quickInclusions: { freeWifi: false, breakfast: false, parking: false },
  amenities: [],
  overview: '',
  inclusions: [],
  exclusions: [],
  cancellationPolicy: '',
  paymentTerms: '',
  houseRules: [],
  tipsHeading: '',
  tipsIntro: '',
  sartajTips: [],
  faqsHeading: '',
  faqsIntro: '',
  faqs: [],
  linksHeading: '',
  linksIntro: '',
  internalLinks: [],
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
const sel = `${inp} cursor-pointer appearance-none`;
const label = 'text-sm text-slate-400 flex items-center gap-1.5';
const hint = 'mt-1.5 text-xs text-slate-600';

export default function StayEditor({
  mode,
  stayId,
  initial,
}: {
  mode: 'create' | 'edit';
  stayId?: string;
  initial?: StayFormValues;
}) {
  const router = useRouter();
  const STORAGE_KEY = 'cms_stay_create_draft';

  const [form, setForm] = useState<StayFormValues>(initial ?? EMPTY_STAY);
  const [tagInput, setTagInput] = useState('');
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
        if (raw && !cancelled) setForm({ ...EMPTY_STAY, ...JSON.parse(raw) });
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

  const f = <K extends keyof StayFormValues>(field: K, value: StayFormValues[K]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  /** Typing the title derives the slug until someone edits the slug by hand. */
  const onTitleChange = (value: string) => {
    setForm((prev) => {
      const derived = prev.slug === slugify(prev.title);
      return { ...prev, title: value, ...(derived ? { slug: slugify(value) } : {}) };
    });
  };

  const addTag = () => {
    const tag = slugify(tagInput);
    if (!tag || form.placeTags.includes(tag)) {
      setTagInput('');
      return;
    }
    setForm((prev) => ({ ...prev, placeTags: [...prev.placeTags, tag] }));
    setTagInput('');
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4000);
  };

  const buildPayload = (status: 'draft' | 'published') => ({
    ...form,
    status,
    priceFrom: Number(form.priceFrom) || 0,
    sleeps: Number(form.sleeps) || 0,
    bedrooms: Number(form.bedrooms) || 0,
    minNights: Number(form.minNights) || 1,
  });

  const send = async (status: 'draft' | 'published') => {
    const url =
      mode === 'edit' ? `/api/stays/properties/${stayId}` : '/api/stays/properties';
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
      showToast(mode === 'edit' ? 'Stay updated!' : 'Stay published!', 'success');
      setTimeout(() => router.push('/admin/stays/properties'), 1200);
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
      setTimeout(() => router.push('/admin/stays/properties'), 1200);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full py-8 pb-24">
      <CMSHeader editorType="Stay" />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ── 1. Identity & routing ── */}
        <CMSSection title="Property Details" icon={<BedDouble className="w-4 h-4" />} defaultOpen>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={label}>Property Name *</label>
              <input
                required
                className={`mt-2 ${inp}`}
                placeholder="e.g. Dal Lake Deluxe Houseboat"
                value={form.title}
                onChange={(e) => onTitleChange(e.target.value)}
              />
            </div>

            <div>
              <label className={label}>Category *</label>
              <select
                required
                className={`mt-2 ${sel}`}
                value={form.category}
                onChange={(e) => f('category', e.target.value as StayCategory)}
              >
                {STAY_CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-[#0b1730]">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className={label}>URL *</label>
              <div className="mt-2 flex items-center gap-2">
                <span className="shrink-0 font-mono text-xs text-slate-600">/stays/</span>
                <input
                  required
                  className={`${inp} min-w-0`}
                  placeholder="dal-lake-deluxe-houseboat"
                  value={form.slug}
                  onChange={(e) => f('slug', slugify(e.target.value))}
                />
              </div>
              <p className={hint}>
                Must not end in “-stays” — that pattern is reserved for place pages.
              </p>
            </div>

            <div>
              <label className={label}>
                <MapPin className="w-3.5 h-3.5" /> Town
              </label>
              <input
                className={`mt-2 ${inp}`}
                placeholder="e.g. Srinagar"
                value={form.town}
                onChange={(e) => f('town', e.target.value)}
              />
            </div>

            <div>
              <label className={label}>Area</label>
              <input
                className={`mt-2 ${inp}`}
                placeholder="e.g. Dal Lake, Srinagar"
                value={form.area}
                onChange={(e) => f('area', e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className={label}>Place Tags</label>
              <div className="mt-2 flex gap-2">
                <input
                  className={`${inp} min-w-0`}
                  placeholder="dal-lake — press Enter to add"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="shrink-0 rounded-xl border border-blue-600/30 px-4 text-sm text-blue-400 transition-all hover:bg-blue-600/10"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <p className={hint}>
                Must match a StayPlace “place key” exactly — this is what puts the property on
                each place page. Usually the area and the town.
              </p>
              {form.placeTags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {form.placeTags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1.5 rounded-full border border-blue-600/20 bg-blue-600/10 px-2.5 py-1 text-xs text-blue-400"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() =>
                          f('placeTags', form.placeTags.filter((t) => t !== tag))
                        }
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className={label}>Host / Operator</label>
              <input
                className={`mt-2 ${inp}`}
                placeholder="Name of the host or operator"
                value={form.host}
                onChange={(e) => f('host', e.target.value)}
              />
            </div>

            <div>
              <label className={label}>Address</label>
              <input
                className={`mt-2 ${inp}`}
                placeholder="Street address for the info card"
                value={form.address}
                onChange={(e) => f('address', e.target.value)}
              />
            </div>
          </div>
        </CMSSection>

        {/* ── 2. Hero ── */}
        <CMSSection title="Hero" icon={<AlignLeft className="w-4 h-4" />} defaultOpen>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={label}>Eyebrow</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="Small label above the H1"
                  value={form.eyebrow}
                  onChange={(e) => f('eyebrow', e.target.value)}
                />
              </div>
              <div>
                <label className={label}>Title Accent</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="Part of the name in the sky→cyan gradient"
                  value={form.titleAccent}
                  onChange={(e) => f('titleAccent', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className={label}>
                Quick Answer{' '}
                <span className="text-slate-600">
                  ({form.quickAnswer.trim() ? form.quickAnswer.trim().split(/\s+/).length : 0}{' '}
                  words)
                </span>
              </label>
              <textarea
                className={`mt-2 ${ta}`}
                placeholder="40–60 words. What this property is, what it costs and who it suits."
                value={form.quickAnswer}
                onChange={(e) => f('quickAnswer', e.target.value)}
              />
            </div>

            <div className="pt-2">
              <CMSMediaSection
                image={form.heroImage.image}
                alt={form.heroImage.alt}
                editorType="stay"
                onChange={(field, value) =>
                  setForm((prev) => ({
                    ...prev,
                    heroImage: { ...prev.heroImage, [field]: value },
                  }))
                }
              />
            </div>
          </div>
        </CMSSection>

        {/* ── 3. Gallery ── */}
        <CMSSection
          title="Gallery"
          icon={<ImageIcon className="w-4 h-4" />}
          defaultOpen={false}
          badge={form.gallery.length || undefined}
        >
          <StayGalleryEditor
            gallery={form.gallery}
            setGallery={(gallery) => f('gallery', gallery)}
          />
        </CMSSection>

        {/* ── 4. Key facts & pricing ── */}
        <CMSSection
          title="Key Facts & Pricing"
          icon={<IndianRupee className="w-4 h-4" />}
          defaultOpen
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={label}>
                  <IndianRupee className="w-3.5 h-3.5" /> Price From (₹ / night) *
                </label>
                <input
                  type="number"
                  min={0}
                  required
                  className={`mt-2 ${inp}`}
                  placeholder="2500"
                  value={form.priceFrom}
                  onChange={(e) => f('priceFrom', e.target.value)}
                />
                <p className={hint}>Verify on the ground before publishing.</p>
              </div>
              <div>
                <label className={label}>Sleeps</label>
                <input
                  type="number"
                  min={0}
                  className={`mt-2 ${inp}`}
                  placeholder="4"
                  value={form.sleeps}
                  onChange={(e) => f('sleeps', e.target.value)}
                />
              </div>
              <div>
                <label className={label}>Bedrooms</label>
                <input
                  type="number"
                  min={0}
                  className={`mt-2 ${inp}`}
                  placeholder="2"
                  value={form.bedrooms}
                  onChange={(e) => f('bedrooms', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className={label}>Best For</label>
              <input
                className={`mt-2 ${inp}`}
                placeholder="e.g. Couples wanting a classic Dal Lake night"
                value={form.bestFor}
                onChange={(e) => f('bestFor', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={label}>Check-in</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="e.g. 12:00 PM"
                  value={form.checkIn}
                  onChange={(e) => f('checkIn', e.target.value)}
                />
              </div>
              <div>
                <label className={label}>Check-out</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="e.g. 11:00 AM"
                  value={form.checkOut}
                  onChange={(e) => f('checkOut', e.target.value)}
                />
              </div>
              <div>
                <label className={label}>Minimum Nights</label>
                <input
                  type="number"
                  min={1}
                  className={`mt-2 ${inp}`}
                  placeholder="1"
                  value={form.minNights}
                  onChange={(e) => f('minNights', e.target.value)}
                />
              </div>
            </div>

            <div className="pt-2">
              <label className={label}>
                <Sparkles className="w-3.5 h-3.5" /> Card Highlights
              </label>
              <p className={hint}>Short chips shown on the listing card.</p>
              <div className="mt-3">
                <SimpleListEditor
                  items={form.highlights}
                  setItems={(items) => f('highlights', items)}
                  field="label"
                  placeholder="Highlight"
                  addLabel="Add Highlight"
                />
              </div>
            </div>
          </div>
        </CMSSection>

        {/* ── 5. Amenities ── */}
        <CMSSection
          title="Amenities"
          icon={<CheckCircle2 className="w-4 h-4" />}
          defaultOpen={false}
          badge={form.amenities.length || undefined}
        >
          <div className="space-y-5">
            <div>
              <label className={label}>Quick Inclusions</label>
              <div className="mt-3 flex flex-wrap gap-3">
                {(
                  [
                    ['freeWifi', 'Free Wi-Fi'],
                    ['breakfast', 'Breakfast'],
                    ['parking', 'Parking'],
                  ] as const
                ).map(([key, text]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        quickInclusions: {
                          ...prev.quickInclusions,
                          [key]: !prev.quickInclusions[key],
                        },
                      }))
                    }
                    className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-all ${
                      form.quickInclusions[key]
                        ? 'border-emerald-500/30 bg-emerald-600/15 text-emerald-300'
                        : 'border-[#19315d]/60 bg-[#07111f] text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {text}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={label}>All Amenities</label>
              <p className={hint}>
                The detail that sells a Kashmiri stay — bukhari heating, shikara transfer, ski
                storage, private deck.
              </p>
              <div className="mt-3">
                <StayAmenitiesEditor
                  amenities={form.amenities}
                  setAmenities={(amenities) => f('amenities', amenities)}
                />
              </div>
            </div>
          </div>
        </CMSSection>

        {/* ── 6. Overview ── */}
        <CMSSection title="Overview" icon={<FileText className="w-4 h-4" />} defaultOpen={false}>
          <label className="flex items-center justify-between text-sm text-slate-400">
            <span>About this property</span>
            <span className="text-xs text-slate-600">Rich Text</span>
          </label>
          <RichTextEditor
            value={form.overview}
            onChange={(html: string) => f('overview', html)}
            minHeight="320px"
            maxHeight="620px"
          />
        </CMSSection>

        {/* ── 7. Inclusions & exclusions ── */}
        <CMSSection
          title="Inclusions & Exclusions"
          icon={<ListChecks className="w-4 h-4" />}
          defaultOpen={false}
          badge={form.inclusions.length + form.exclusions.length || undefined}
        >
          <div className="space-y-6">
            <div>
              <label className={label}>Inclusions — what the tariff covers</label>
              <div className="mt-3">
                <SimpleListEditor
                  items={form.inclusions}
                  setItems={(items) => f('inclusions', items)}
                  field="description"
                  placeholder="Inclusion"
                  addLabel="Add Inclusion"
                />
              </div>
            </div>

            <div>
              <label className={label}>Exclusions — name the real ones</label>
              <p className={hint}>
                Being specific here is the difference between an honest page and an OTA listing.
              </p>
              <div className="mt-3">
                <SimpleListEditor
                  items={form.exclusions}
                  setItems={(items) => f('exclusions', items)}
                  field="description"
                  placeholder="Exclusion"
                  addLabel="Add Exclusion"
                />
              </div>
            </div>
          </div>
        </CMSSection>

        {/* ── 8. Policies ── */}
        <CMSSection
          title="Policies"
          icon={<ScrollText className="w-4 h-4" />}
          defaultOpen={false}
        >
          <div className="space-y-4">
            <div>
              <label className={label}>Cancellation Policy</label>
              <textarea
                className={`mt-2 ${ta}`}
                placeholder="e.g. Free cancellation up to 7 days before check-in..."
                value={form.cancellationPolicy}
                onChange={(e) => f('cancellationPolicy', e.target.value)}
              />
            </div>

            <div>
              <label className={label}>Payment Terms</label>
              <textarea
                className={`mt-2 ${ta}`}
                placeholder="e.g. 30% advance to confirm, balance on arrival. Cash or UPI."
                value={form.paymentTerms}
                onChange={(e) => f('paymentTerms', e.target.value)}
              />
            </div>

            <div>
              <label className={label}>House Rules</label>
              <div className="mt-3">
                <SimpleListEditor
                  items={form.houseRules}
                  setItems={(items) => f('houseRules', items)}
                  field="rule"
                  placeholder="Rule"
                  addLabel="Add House Rule"
                />
              </div>
            </div>
          </div>
        </CMSSection>

        {/* ── 9. Sartaj's tips ── */}
        <CMSSection
          title="Sartaj's Tips"
          icon={<Lightbulb className="w-4 h-4" />}
          defaultOpen={false}
          badge={form.sartajTips.length || undefined}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={label}>Section Heading</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="Defaults to “Sartaj's tips”"
                  value={form.tipsHeading}
                  onChange={(e) => f('tipsHeading', e.target.value)}
                />
              </div>
              <div>
                <label className={label}>Section Intro</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="One line above the tip cards"
                  value={form.tipsIntro}
                  onChange={(e) => f('tipsIntro', e.target.value)}
                />
              </div>
            </div>

            <StayPlaceTipsEditor
              tips={form.sartajTips}
              setTips={(updater) =>
                setForm((prev) => ({
                  ...prev,
                  sartajTips:
                    typeof updater === 'function' ? updater(prev.sartajTips) : updater,
                }))
              }
            />
          </div>
        </CMSSection>

        {/* ── 10. FAQs ── */}
        <CMSSection
          title="FAQs"
          icon={<MessageCircleQuestion className="w-4 h-4" />}
          defaultOpen={false}
          badge={form.faqs.length || undefined}
        >
          <div className="space-y-4">
            <p className="rounded-xl border border-amber-600/20 bg-amber-600/5 px-4 py-3 text-xs text-slate-400">
              These render on the page <em>and</em> as FAQPage schema. Keep them specific to this
              property so they don&apos;t compete with the place and hub FAQs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={label}>Section Heading</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="Defaults to “Questions, answered”"
                  value={form.faqsHeading}
                  onChange={(e) => f('faqsHeading', e.target.value)}
                />
              </div>
              <div>
                <label className={label}>Section Intro</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="One line under the FAQ heading"
                  value={form.faqsIntro}
                  onChange={(e) => f('faqsIntro', e.target.value)}
                />
              </div>
            </div>

            <FaqHandler faqs={form.faqs} setFaqs={(faqs) => f('faqs', faqs)} />
          </div>
        </CMSSection>

        {/* ── 11. Internal linking ── */}
        <CMSSection
          title="Internal Linking"
          icon={<Link2 className="w-4 h-4" />}
          defaultOpen={false}
          badge={form.internalLinks.length || undefined}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={label}>Section Heading</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="e.g. Planning the rest of your trip?"
                  value={form.linksHeading}
                  onChange={(e) => f('linksHeading', e.target.value)}
                />
              </div>
              <div>
                <label className={label}>Section Intro</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="A sentence of real copy — not a bare link dump"
                  value={form.linksIntro}
                  onChange={(e) => f('linksIntro', e.target.value)}
                />
              </div>
            </div>

            <StayPlaceLinksEditor
              links={form.internalLinks}
              setLinks={(updater) =>
                setForm((prev) => ({
                  ...prev,
                  internalLinks:
                    typeof updater === 'function' ? updater(prev.internalLinks) : updater,
                }))
              }
            />
          </div>
        </CMSSection>

        {/* ── 12. SEO ── */}
        <CMSSection title="SEO" defaultOpen={false}>
          <div className="space-y-4">
            <CMSSeoSection
              metaTitle={form.metaTitle}
              metaDescription={form.metaDescription}
              onChange={(field, value) => f(field as 'metaTitle' | 'metaDescription', value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className={label}>Schema Title</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="Only if it should differ from the meta title"
                  value={form.schemaTitle}
                  onChange={(e) => f('schemaTitle', e.target.value)}
                />
              </div>
              <div>
                <label className={label}>Schema Description</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="Only if it should differ from the meta description"
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
      <div className="fixed bottom-6 right-6 z-50 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded-xl border px-4 py-3 text-sm font-medium shadow-xl ${
              t.type === 'success'
                ? 'border-emerald-500/40 bg-emerald-600/90 text-white'
                : 'border-red-500/40 bg-red-600/90 text-white'
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}
