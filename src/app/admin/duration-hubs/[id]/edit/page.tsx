'use client';

import { useState, useEffect, FormEvent, use } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircle2, XCircle, Plus, Trash2, Star, AlignLeft,
  Users, ImageIcon, Images, Clock, MessageSquareText, BarChart3, Loader2,
} from 'lucide-react';

import CMSHeader from '@/components/admin/cms/CMSHeader';
import CMSSection from '@/components/admin/CMSSection';
import CMSSeoSection from '@/components/admin/cms/CMSSeoSection';
import CMSSchema from '@/components/admin/cms/CMSSchema';
import CMSMediaSection from '@/components/admin/cms/CMSMediaSection';
import CMSActions from '@/components/admin/cms/CMSActions';
import FaqHandler, { FaqItem } from '@/components/admin/cms/FaqHandler';
import TestimonialsHandler, { Testimonial } from '@/components/admin/cms/TestimonialsHandler';
import GalleryHandler from '@/components/admin/cms/GalleryHandler';
import PackageOverview from '@/components/admin/cms/package/PackageOverview';

// ─── Types ───────────────────────────────────────────────
interface StatItem  { id: string; value: string; label: string }

interface DurationHubForm {
  title: string; days: string; nights: string; slug: string;
  titleAccent: string; subtitle: string;
  quickAnswer: string; overview: string;
  rating: string; reviewsCount: string;
  heroImage: string; heroAlt: string;
  metaTitle: string; metaDescription: string;
  schemaTitle: string; schemaDescription: string;
  status: 'draft' | 'published';
}

const EMPTY: DurationHubForm = {
  title: '', days: '', nights: '', slug: '',
  titleAccent: '', subtitle: '',
  quickAnswer: '', overview: '',
  rating: '', reviewsCount: '',
  heroImage: '', heroAlt: '',
  metaTitle: '', metaDescription: '',
  schemaTitle: '', schemaDescription: '',
  status: 'draft',
};

interface Toast { id: number; message: string; type: 'success' | 'error' }

const uid = () => crypto.randomUUID();
const slugify = (v: string) =>
  v.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
const buildSlug = (days: string, nights: string) =>
  days && nights ? `${days}-days-${nights}-nights` : '';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toStr = (v: any) => (v != null ? String(v) : '');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withIds = (arr: any[], base: string) =>
  (arr ?? []).map((x, i) => ({ ...x, id: x.id ?? `${base}-${i}-${uid()}` }));

const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';
const ta = `${inp} resize-y min-h-24`;
const addBtn =
  'flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all';
const removeBtn =
  'p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0';

export default function EditDurationHubPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [form, setForm] = useState<DurationHubForm>(EMPTY);
  const [stats,        setStats]        = useState<StatItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs,         setFaqs]         = useState<FaqItem[]>([]);
  const [gallery,      setGallery]      = useState<string[]>([]);

  const [isLoading,    setIsLoading]    = useState(true);
  const [isSaving,     setIsSaving]     = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts,       setToasts]       = useState<Toast[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/duration-hubs/${id}`);
        if (!res.ok) throw new Error('Not found');
        const { durationHub: c } = await res.json();

        setForm({
          title:       c.title       ?? '',
          days:        toStr(c.days),
          nights:      toStr(c.nights),
          slug:        c.slug        ?? '',
          titleAccent: c.titleAccent ?? '',
          subtitle:    c.subtitle    ?? '',
          quickAnswer: c.quickAnswer ?? '',
          overview:    c.overview    ?? '',
          rating:      toStr(c.rating),
          reviewsCount: toStr(c.reviewsCount),
          heroImage:   c.heroImage?.image ?? '',
          heroAlt:     c.heroImage?.alt   ?? '',
          metaTitle:   c.metaTitle   ?? '',
          metaDescription: c.metaDescription ?? '',
          schemaTitle: c.schemaTitle ?? '',
          schemaDescription: c.schemaDescription ?? '',
          status:      c.status      ?? 'draft',
        });
        setStats(withIds(c.stats, 'stat'));
        setTestimonials(withIds(c.testimonials, 'rev'));
        setFaqs(withIds(c.faqs, 'faq'));
        setGallery(c.gallery ?? []);
      } catch {
        showToast('Failed to load duration hub', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const f = (field: keyof DurationHubForm, value: string | boolean) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'days' || field === 'nights') {
        const d = field === 'days' ? (value as string) : prev.days;
        const n = field === 'nights' ? (value as string) : prev.nights;
        next.slug = buildSlug(d, n);
      }
      return next;
    });
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    const tid = Date.now();
    setToasts((p) => [...p, { id: tid, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== tid)), 4000);
  };

  const buildPayload = (status: 'draft' | 'published') => ({
    title: form.title,
    days: Number(form.days) || 0,
    nights: Number(form.nights) || 0,
    slug: form.slug,
    titleAccent: form.titleAccent, subtitle: form.subtitle,
    quickAnswer: form.quickAnswer, overview: form.overview,
    rating: Number(form.rating) || 0,
    reviewsCount: Number(form.reviewsCount) || 0,
    heroImage: { image: form.heroImage, alt: form.heroAlt },
    stats,
    gallery,
    testimonials,
    faqs,
    metaTitle: form.metaTitle, metaDescription: form.metaDescription,
    schemaTitle: form.schemaTitle, schemaDescription: form.schemaDescription,
    status,
  });

  const put = async (status: 'draft' | 'published') => {
    const res = await fetch(`/api/duration-hubs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildPayload(status)),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await put(form.status);
      showToast('Duration hub updated!', 'success');
      setTimeout(() => router.push('/admin/duration-hubs'), 1200);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to update', 'error');
    } finally { setIsSubmitting(false); }
  };

  const saveDraft = async () => {
    setIsSaving(true);
    try {
      await put('draft');
      showToast('Saved as draft!', 'success');
      setTimeout(() => router.push('/admin/duration-hubs'), 1200);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save', 'error');
    } finally { setIsSaving(false); }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-slate-600 text-sm">Loading duration hub...</p>
      </div>
    );
  }

  return (
    <div className="w-full py-8 pb-24">
      <CMSHeader editorType="Duration Hub" />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Duration Hub Details */}
        <CMSSection title="Duration Hub Details" icon={<Clock className="w-4 h-4" />} defaultOpen>
          <div className="space-y-5 mt-1">
            <div>
              <label className="text-sm text-slate-400">
                Title (H1) <span className="text-red-400">*</span>
              </label>
              <input
                className={`mt-2 ${inp}`}
                placeholder="e.g. 6 Days 5 Nights Kashmir Tour Packages"
                value={form.title}
                required
                onChange={(e) => f('title', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="text-sm text-slate-400">
                  Days <span className="text-red-400">*</span>
                </label>
                <input
                  type="number" min={1}
                  className={`mt-2 ${inp}`}
                  placeholder="6"
                  value={form.days}
                  required
                  onChange={(e) => f('days', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-slate-400">
                  Nights <span className="text-red-400">*</span>
                </label>
                <input
                  type="number" min={0}
                  className={`mt-2 ${inp}`}
                  placeholder="5"
                  value={form.nights}
                  required
                  onChange={(e) => f('nights', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-slate-400">
                  Slug <span className="text-red-400">*</span>
                </label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="6-days-5-nights"
                  value={form.slug}
                  required
                  onChange={(e) => f('slug', slugify(e.target.value))}
                />
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Filters packages where days &amp; nights match exactly · /kashmir-tour-packages/{form.slug || '6-days-5-nights'}
            </p>
          </div>
        </CMSSection>

        {/* Hero */}
        <CMSSection title="Hero" icon={<Star className="w-4 h-4" />} defaultOpen>
          <div className="space-y-4 mt-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-400">Title Accent</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="e.g. 6 Days 5 Nights (highlighted phrase)"
                  value={form.titleAccent}
                  onChange={(e) => f('titleAccent', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-slate-400">Subtitle</label>
                <input
                  className={`mt-2 ${inp}`}
                  placeholder="e.g. The perfect week-long Kashmir escape"
                  value={form.subtitle}
                  onChange={(e) => f('subtitle', e.target.value)}
                />
              </div>
            </div>
          </div>
        </CMSSection>

        {/* Hero Stats */}
        <CMSSection
          title="Hero Stats"
          icon={<BarChart3 className="w-4 h-4" />}
          defaultOpen={false}
          badge={stats.length || undefined}
        >
          <div className="space-y-3 mt-1">
            {stats.map((s) => (
              <div key={s.id} className="flex items-center gap-3">
                <input
                  className={`${inp} flex-1`}
                  placeholder="Value (e.g. 18)"
                  value={s.value}
                  onChange={(e) =>
                    setStats((p) => p.map((i) => (i.id === s.id ? { ...i, value: e.target.value } : i)))
                  }
                />
                <input
                  className={`${inp} flex-1`}
                  placeholder="Label (e.g. Packages)"
                  value={s.label}
                  onChange={(e) =>
                    setStats((p) => p.map((i) => (i.id === s.id ? { ...i, label: e.target.value } : i)))
                  }
                />
                <button
                  type="button"
                  className={removeBtn}
                  onClick={() => setStats((p) => p.filter((i) => i.id !== s.id))}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              className={addBtn}
              onClick={() => setStats((p) => [...p, { id: uid(), value: '', label: '' }])}
            >
              <Plus className="w-4 h-4" /> Add Stat
            </button>
          </div>
        </CMSSection>

        {/* Quick Answer */}
        <CMSSection title="Quick Answer" icon={<MessageSquareText className="w-4 h-4" />} defaultOpen>
          <div className="space-y-2 mt-1">
            <label className="text-sm text-slate-400">Direct answer (40–60 words)</label>
            <textarea
              className={ta}
              placeholder="A concise, direct answer shown near the top — powers featured snippets & AI answers."
              value={form.quickAnswer}
              onChange={(e) => f('quickAnswer', e.target.value)}
            />
          </div>
        </CMSSection>

        {/* Overview (optional editorial body) */}
        <CMSSection title="Overview (optional)" icon={<AlignLeft className="w-4 h-4" />} defaultOpen={false}>
          <div className="mt-1">
            <PackageOverview
              overview={form.overview}
              onChange={(field, val) => setForm((p) => ({ ...p, [field]: val }))}
            />
            <p className="text-xs text-slate-500 mt-2">
              Optional unique copy for this duration (suggested itinerary, who it suits). Leave blank to hide it on the page.
            </p>
          </div>
        </CMSSection>

        {/* Reviews */}
        <CMSSection
          title="Reviews"
          icon={<Users className="w-4 h-4" />}
          defaultOpen={false}
          badge={testimonials.length || undefined}
        >
          <div className="space-y-4 mt-1">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-slate-400">Aggregate Rating</label>
                <input
                  type="number" min={0} max={5} step={0.1}
                  className={`mt-2 ${inp}`}
                  placeholder="4.8"
                  value={form.rating}
                  onChange={(e) => f('rating', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-slate-400">Reviews Count</label>
                <input
                  type="number"
                  className={`mt-2 ${inp}`}
                  placeholder="0"
                  value={form.reviewsCount}
                  onChange={(e) => f('reviewsCount', e.target.value)}
                />
              </div>
            </div>
            <TestimonialsHandler
              testimonials={testimonials}
              setTestimonials={setTestimonials}
              editorType="DurationHub"
            />
          </div>
        </CMSSection>

        {/* FAQs */}
        <CMSSection title="FAQs" defaultOpen={false} badge={faqs.length || undefined}>
          <div className="mt-1">
            <FaqHandler faqs={faqs} setFaqs={setFaqs} />
          </div>
        </CMSSection>

        {/* Hero Image */}
        <CMSSection title="Hero Image" icon={<ImageIcon className="w-4 h-4" />}>
          <div className="mt-1">
            <CMSMediaSection
              image={form.heroImage}
              alt={form.heroAlt}
              editorType="DurationHub"
              onChange={(field, value) =>
                setForm((p) => ({
                  ...p,
                  [field === 'image' ? 'heroImage' : 'heroAlt']: value,
                }))
              }
            />
          </div>
        </CMSSection>

        {/* Gallery */}
        <CMSSection title="Gallery" icon={<Images className="w-4 h-4" />} defaultOpen={false} badge={gallery.length || undefined}>
          <div className="mt-1">
            <GalleryHandler images={gallery} setImages={setGallery} editorType="DurationHub" />
          </div>
        </CMSSection>

        {/* SEO */}
        <CMSSection title="SEO">
          <div className="mt-1">
            <CMSSeoSection
              metaTitle={form.metaTitle}
              metaDescription={form.metaDescription}
              onChange={(field, val) => f(field as keyof DurationHubForm, val)}
            />
          </div>
        </CMSSection>

        {/* Structured Data */}
        <CMSSection title="Structured Data" defaultOpen={false}>
          <div className="mt-1">
            <CMSSchema
              schemaTitle={form.schemaTitle}
              schemaDescription={form.schemaDescription}
              onChange={(field, val) => f(field as keyof DurationHubForm, val)}
            />
          </div>
        </CMSSection>

        {/* Actions */}
        <CMSActions
          status={form.status}
          isSaving={isSaving}
          isSubmitting={isSubmitting}
          onDraft={saveDraft}
          onStatusChange={(s) => setForm((p) => ({ ...p, status: s }))}
        />
      </form>

      {/* Toasts */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-sm font-medium pointer-events-auto border ${
                t.type === 'success'
                  ? 'bg-emerald-900/80 border-emerald-500/30 text-emerald-200'
                  : 'bg-red-900/80 border-red-500/30 text-red-200'
              }`}
            >
              {t.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 shrink-0" />
              )}
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
