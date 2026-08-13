'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlignLeft,
  Layers,
  Lightbulb,
  Link2,
  MapPin,
  MessageCircleQuestion,
  Tag,
} from 'lucide-react';

import CMSHeader from '@/components/admin/cms/CMSHeader';
import CMSSection from '@/components/admin/CMSSection';
import CMSSeoSection from '@/components/admin/cms/CMSSeoSection';
import CMSMediaSection from '@/components/admin/cms/CMSMediaSection';
import CMSActions from '@/components/admin/cms/CMSActions';
import FaqHandler, { FaqItem } from '@/components/admin/cms/FaqHandler';
import StayPlaceTipsEditor from '@/components/admin/stays/StayPlaceTipsEditor';
import StayPlaceLinksEditor from '@/components/admin/stays/StayPlaceLinksEditor';
import type { IStayPlaceLink, IStayPlaceTip } from '@/types/stayPlaceTypes';

/**
 * Shared create/edit form for a stay PLACE page (/stays/[place]-stays).
 *
 * One component drives both routes so the two can never drift apart — a field
 * added here appears in create and edit at the same time.
 */

export interface StayPlaceFormValues {
  // 1. Identity & routing
  name: string;
  placeKey: string;
  slug: string;
  parentTown: string;
  status: 'draft' | 'published';
  // 2. Hero
  eyebrow: string;
  title: string;
  titleAccent: string;
  quickAnswer: string;
  heroImage: { image: string; alt: string };
  // 3. Archive
  archiveHeading: string;
  archiveIntro: string;
  // 4. Tips
  tipsHeading: string;
  tipsIntro: string;
  sartajTips: IStayPlaceTip[];
  // 5. FAQs
  faqsHeading: string;
  faqsIntro: string;
  faqs: FaqItem[];
  // 6. Internal linking
  linksHeading: string;
  linksIntro: string;
  internalLinks: IStayPlaceLink[];
  // 7. SEO
  metaTitle: string;
  metaDescription: string;
  schemaTitle: string;
  schemaDescription: string;
}

export const EMPTY_STAY_PLACE: StayPlaceFormValues = {
  name: '',
  placeKey: '',
  slug: '',
  parentTown: '',
  status: 'draft',
  eyebrow: '',
  title: '',
  titleAccent: '',
  quickAnswer: '',
  heroImage: { image: '', alt: '' },
  archiveHeading: '',
  archiveIntro: '',
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
const label = 'text-sm text-slate-400 flex items-center gap-1.5';
const hint = 'mt-1.5 text-xs text-slate-600';

export default function StayPlaceEditor({
  mode,
  placeId,
  initial,
}: {
  mode: 'create' | 'edit';
  placeId?: string;
  initial?: StayPlaceFormValues;
}) {
  const router = useRouter();
  const STORAGE_KEY = 'cms_stay_place_create_draft';

  const [form, setForm] = useState<StayPlaceFormValues>(initial ?? EMPTY_STAY_PLACE);
  const [isLoaded, setIsLoaded] = useState(mode === 'edit');
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Draft autosave — create only. Editing an existing record should never be
  // silently overwritten by a stale local draft.
  //
  // The restore is deferred to a microtask rather than run in the effect body:
  // localStorage is not available during SSR, so a lazy useState initialiser
  // would desync hydration, and a synchronous setState here trips
  // react-hooks/set-state-in-effect.
  useEffect(() => {
    if (mode !== 'create') return;

    let cancelled = false;

    const restoreDraft = async () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw && !cancelled) setForm({ ...EMPTY_STAY_PLACE, ...JSON.parse(raw) });
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

  const f = <K extends keyof StayPlaceFormValues>(
    field: K,
    value: StayPlaceFormValues[K],
  ) => setForm((prev) => ({ ...prev, [field]: value }));

  /**
   * Typing the place name derives placeKey and slug. Both stay editable —
   * placeKey must match Stay.placeTags exactly, so it sometimes needs a manual
   * fix ("Dal Lake" → "dal-lake").
   */
  const onNameChange = (value: string) => {
    setForm((prev) => {
      const key = slugify(value);
      const derived = prev.placeKey === slugify(prev.name);
      return {
        ...prev,
        name: value,
        ...(derived ? { placeKey: key, slug: key ? `${key}-stays` : '' } : {}),
      };
    });
  };

  const onPlaceKeyChange = (value: string) => {
    const key = slugify(value);
    setForm((prev) => ({ ...prev, placeKey: key, slug: key ? `${key}-stays` : '' }));
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4000);
  };

  const buildPayload = (status: 'draft' | 'published') => ({ ...form, status });

  const send = async (status: 'draft' | 'published') => {
    const url = mode === 'edit' ? `/api/stays/places/${placeId}` : '/api/stays/places';
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
      showToast(mode === 'edit' ? 'Place updated!' : 'Place published!', 'success');
      setTimeout(() => router.push('/admin/stays/places'), 1200);
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
      setTimeout(() => router.push('/admin/stays/places'), 1200);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full py-8 pb-24">
      <CMSHeader editorType="Stay Place" />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ── 1. Identity & routing ── */}
        <CMSSection title="Identity & Routing" icon={<MapPin className="w-4 h-4" />} defaultOpen>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={label}>
                <MapPin className="w-3.5 h-3.5" /> Place Name *
              </label>
              <input
                required
                className={`mt-2 ${inp}`}
                placeholder="e.g. Dal Lake"
                value={form.name}
                onChange={(e) => onNameChange(e.target.value)}
              />
              <p className={hint}>Shown in headings and breadcrumbs.</p>
            </div>

            <div>
              <label className={label}>
                <Tag className="w-3.5 h-3.5" /> Parent Town
              </label>
              <input
                className={`mt-2 ${inp}`}
                placeholder="e.g. Srinagar — leave blank if this IS a town"
                value={form.parentTown}
                onChange={(e) => f('parentTown', e.target.value)}
              />
            </div>

            <div>
              <label className={label}>Place Key *</label>
              <input
                required
                className={`mt-2 ${inp}`}
                placeholder="dal-lake"
                value={form.placeKey}
                onChange={(e) => onPlaceKeyChange(e.target.value)}
              />
              <p className={hint}>
                Must match the tag on each stay exactly — this is what the listing queries.
              </p>
            </div>

            <div>
              <label className={label}>URL</label>
              <div className="mt-2 flex items-center gap-2">
                <span className="shrink-0 text-xs text-slate-600 font-mono">/stays/</span>
                <input
                  required
                  className={`${inp} min-w-0`}
                  placeholder="dal-lake-stays"
                  value={form.slug}
                  onChange={(e) => f('slug', slugify(e.target.value))}
                />
              </div>
              <p className={hint}>Must end in “-stays” or the route will treat it as a property.</p>
            </div>
          </div>
        </CMSSection>

        {/* ── 2. Hero ── */}
        <CMSSection title="Hero" icon={<AlignLeft className="w-4 h-4" />} defaultOpen>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={label}>Eyebrow</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="e.g. Dal Lake"
                  value={form.eyebrow}
                  onChange={(e) => f('eyebrow', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className={label}>H1 *</label>
                <input
                  required
                  className={`mt-2 ${inp}`}
                  placeholder="e.g. Where to Stay on Dal Lake"
                  value={form.title}
                  onChange={(e) => f('title', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className={label}>Title Accent</label>
              <input
                className={`mt-2 ${inp}`}
                placeholder="Part of the H1 rendered in the sky→cyan gradient"
                value={form.titleAccent}
                onChange={(e) => f('titleAccent', e.target.value)}
              />
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
                placeholder="40–60 words. This is the block most likely to be lifted into an AI Overview or featured snippet."
                value={form.quickAnswer}
                onChange={(e) => f('quickAnswer', e.target.value)}
              />
              <p className={hint}>
                The hero&apos;s stay count and “from ₹X” are calculated from the live listings —
                never type a price here.
              </p>
            </div>

            <div className="pt-2">
              <CMSMediaSection
                image={form.heroImage.image}
                alt={form.heroImage.alt}
                editorType="stay-place"
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

        {/* ── 3. Archive ── */}
        <CMSSection title="Archive (Listing)" icon={<Layers className="w-4 h-4" />} defaultOpen={false}>
          <p className="mb-4 rounded-xl border border-blue-600/20 bg-blue-600/5 px-4 py-3 text-xs text-slate-400">
            The listing itself is not edited here — it shows every stay tagged{' '}
            <span className="font-mono text-blue-400">{form.placeKey || 'place-key'}</span>. These
            two fields only change the section heading above it.
          </p>
          <div className="space-y-4">
            <div>
              <label className={label}>Section Heading</label>
              <input
                className={`mt-2 ${inp}`}
                placeholder="Defaults to “Stays in {Place}”"
                value={form.archiveHeading}
                onChange={(e) => f('archiveHeading', e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Section Intro</label>
              <textarea
                className={`mt-2 ${ta}`}
                placeholder="Short line under the listing heading"
                value={form.archiveIntro}
                onChange={(e) => f('archiveIntro', e.target.value)}
              />
            </div>
          </div>
        </CMSSection>

        {/* ── 4. Sartaj's tips ── */}
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
                  placeholder="Defaults to “Sartaj's tips for {Place}”"
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

        {/* ── 5. FAQs ── */}
        <CMSSection
          title="FAQs"
          icon={<MessageCircleQuestion className="w-4 h-4" />}
          defaultOpen={false}
          badge={form.faqs.length || undefined}
        >
          <div className="space-y-4">
            <p className="rounded-xl border border-amber-600/20 bg-amber-600/5 px-4 py-3 text-xs text-slate-400">
              These render on the page <em>and</em> as FAQPage schema. Keep them specific to this
              place so they don&apos;t compete with the /stays hub FAQs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={label}>Section Heading</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="Defaults to “{Place} stay questions, answered”"
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

        {/* ── 6. Internal linking ── */}
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
                  placeholder="e.g. Planning the rest of Dal Lake?"
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

        {/* ── 7. SEO ── */}
        <CMSSection title="SEO" defaultOpen={false}>
          <div className="space-y-4">
            <CMSSeoSection
              metaTitle={form.metaTitle}
              metaDescription={form.metaDescription}
              onChange={(field, value) =>
                f(field as 'metaTitle' | 'metaDescription', value)
              }
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
            className={`px-4 py-3 rounded-xl text-sm font-medium shadow-xl border ${
              t.type === 'success'
                ? 'bg-emerald-600/90 text-white border-emerald-500/40'
                : 'bg-red-600/90 text-white border-red-500/40'
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}
