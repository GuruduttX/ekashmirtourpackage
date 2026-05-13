'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Package,
  AlignLeft,
  Clock,
  Navigation,
  Star,
  Map,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  MessageSquare,
  Image as ImageIcon,
  Users,
  Info,
  Search,
  Code,
  FileText,
  SlidersHorizontal,
  ChevronsUpDown,
} from 'lucide-react';
import CMSSection from '@/components/admin/CMSSection';
import CMSActions from '@/components/admin/CMSActions';
import FaqHandler from '@/components/admin/FaqHandler';

// ─── Types ───────────────────────────────────────────────
interface DurationBreakdownItem { id: string; days: number; place: string }
interface HighlightItem { id: string; description: string }
interface ItineraryItem { id: string; day: number; title: string; description: string }
interface ChildImageItem { id: string; image: string; alt: string }
interface TestimonialItem { id: string; name: string; description: string; rating: string }
interface SegmentItem { id: string; from: string; to: string }
interface KBYGItem { id: string; description: string }

interface PackageFormData {
  title: string; slug: string; category: string;
  price: number; rating: number; reviews: number;
  duration: string; status: 'draft' | 'published';
  days: number; nights: number;
  durationbreakdown: DurationBreakdownItem[];
  availableSrc: string[];
  destination: string; overview: string;
  highlights: HighlightItem[];
  itinerary: ItineraryItem[];
  inclusions: HighlightItem[];
  exclusions: HighlightItem[];
  faqs: Array<{ id: string; question: string; answer: string }>;
  metaTitle: string; metaDescription: string;
  schemaTitle: string; schemaDescription: string;
  refund: string; cancel: string; confirmation: string; payment: string;
  heroImage: { alt: string; image: string };
  childImages: ChildImageItem[];
  testimonials: TestimonialItem[];
  knowBeforeYouGo: KBYGItem[];
  routes: { source: string; destination: string; segments: SegmentItem[] };
  isTransferIncluded: boolean;
  isStayIncluded: boolean;
  isBreakfastIncluded: boolean;
  isSightseeingIncluded: boolean;
}

const EMPTY: PackageFormData = {
  title: '', slug: '', category: '',
  price: 0, rating: 0, reviews: 0,
  duration: '', status: 'draft',
  days: 0, nights: 0,
  durationbreakdown: [], availableSrc: [],
  destination: '', overview: '',
  highlights: [], itinerary: [],
  inclusions: [], exclusions: [],
  faqs: [],
  metaTitle: '', metaDescription: '',
  schemaTitle: '', schemaDescription: '',
  refund: '', cancel: '', confirmation: '', payment: '',
  heroImage: { alt: '', image: '' },
  childImages: [], testimonials: [], knowBeforeYouGo: [],
  routes: { source: '', destination: '', segments: [] },
  isTransferIncluded: false, isStayIncluded: false,
  isBreakfastIncluded: false, isSightseeingIncluded: false,
};

// ─── Styles ──────────────────────────────────────────────
const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';
const ta = `${inp} resize-y min-h-[100px]`;
const lbl = 'block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide';
const addBtn =
  'flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all';
const removeBtn =
  'p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0';

const slugify = (v: string) =>
  v.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const uid = () => crypto.randomUUID();

// ─── Section animation ────────────────────────────────────
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.28, ease: [0.4, 0, 0.2, 1] as [number,number,number,number] },
});

// ─── Component ───────────────────────────────────────────
interface Props {
  initialData?: Partial<PackageFormData> | null;
  packageId?: string;
}

export default function PackageEditor({ initialData, packageId }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<PackageFormData>({
    ...EMPTY,
    ...(initialData ?? {}),
    heroImage: { ...EMPTY.heroImage, ...(initialData?.heroImage ?? {}) },
    routes: { ...EMPTY.routes, ...(initialData?.routes ?? {}) },
  });
  const [isSaving, setIsSaving] = useState(false);
  const [slugLocked, setSlugLocked] = useState(!!packageId);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  useEffect(() => {
    if (!slugLocked && form.title) {
      setForm((f) => ({ ...f, slug: slugify(f.title) }));
    }
  }, [form.title, slugLocked]);

  const set = <K extends keyof PackageFormData>(k: K, v: PackageFormData[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const showToast = (msg: string, type: 'ok' | 'err') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      showToast('Title and slug are required.', 'err');
      return;
    }
    setIsSaving(true);
    try {
      const url = packageId ? `/api/packages/${packageId}` : '/api/packages';
      const method = packageId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Failed to save');
      }
      showToast(packageId ? 'Package updated.' : 'Package created.', 'ok');
      if (!packageId) {
        const data = await res.json();
        router.push(`/admin/packages/${data.package._id}/edit`);
      }
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : 'Error saving', 'err');
    } finally {
      setIsSaving(false);
    }
  };

  // ── List helpers ──
  const addSimple = (key: 'highlights' | 'inclusions' | 'exclusions' | 'knowBeforeYouGo') =>
    set(key, [...form[key], { id: uid(), description: '' }]);

  const removeSimple = (key: 'highlights' | 'inclusions' | 'exclusions' | 'knowBeforeYouGo', id: string) =>
    set(key, form[key].filter((i) => i.id !== id));

  const updateSimple = (
    key: 'highlights' | 'inclusions' | 'exclusions' | 'knowBeforeYouGo',
    id: string,
    val: string
  ) => set(key, form[key].map((i) => (i.id === id ? { ...i, description: val } : i)));

  return (
    <div className="max-w-3xl mx-auto pb-28">
      {/* Header */}
      <motion.div {...fadeUp(0)} className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-xl bg-violet-600/15 flex items-center justify-center">
            <Package className="w-4 h-4 text-violet-400" />
          </div>
          <h1 className="text-xl font-bold text-white">
            {packageId ? 'Edit Package' : 'New Tour Package'}
          </h1>
        </div>
        <p className="text-slate-500 text-sm ml-11">
          {packageId ? 'Update package details and content' : 'Create a new Kashmir tour package'}
        </p>
      </motion.div>

      <div className="space-y-4">

        {/* ── 1. Basics ── */}
        <motion.div {...fadeUp(0.04)}>
          <CMSSection title="Basics" icon={<Package className="w-4 h-4" />} defaultOpen>
            <div className="pt-4 space-y-4">
              <div>
                <label className={lbl}>Title</label>
                <input className={inp} placeholder="e.g. Gulmarg Snow Retreat 7N/8D" value={form.title} onChange={(e) => set('title', e.target.value)} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={lbl}>Slug</label>
                  <button type="button" onClick={() => setSlugLocked(v => !v)} className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors">
                    {slugLocked ? 'Unlock' : 'Lock'}
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-sm select-none">/package/</span>
                  <input className={`${inp} pl-20`} placeholder="auto-generated-from-title" value={form.slug} readOnly={!slugLocked} onChange={(e) => set('slug', slugify(e.target.value))} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>Category</label>
                  <input className={inp} placeholder="e.g. Adventure, Luxury" value={form.category} onChange={(e) => set('category', e.target.value)} />
                </div>
                <div>
                  <label className={lbl}>Price (₹)</label>
                  <input type="number" className={inp} placeholder="0" value={form.price} onChange={(e) => set('price', Number(e.target.value))} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={lbl}>Rating</label>
                  <input type="number" min={0} max={5} step={0.1} className={inp} placeholder="4.5" value={form.rating} onChange={(e) => set('rating', Number(e.target.value))} />
                </div>
                <div>
                  <label className={lbl}>Reviews</label>
                  <input type="number" className={inp} placeholder="0" value={form.reviews} onChange={(e) => set('reviews', Number(e.target.value))} />
                </div>
                <div>
                  <label className={lbl}>Duration</label>
                  <input className={inp} placeholder="e.g. 7N/8D" value={form.duration} onChange={(e) => set('duration', e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>Days</label>
                  <input type="number" className={inp} placeholder="8" value={form.days} onChange={(e) => set('days', Number(e.target.value))} />
                </div>
                <div>
                  <label className={lbl}>Nights</label>
                  <input type="number" className={inp} placeholder="7" value={form.nights} onChange={(e) => set('nights', Number(e.target.value))} />
                </div>
              </div>
            </div>
          </CMSSection>
        </motion.div>

        {/* ── 2. Overview ── */}
        <motion.div {...fadeUp(0.07)}>
          <CMSSection title="Overview" icon={<AlignLeft className="w-4 h-4" />} defaultOpen>
            <div className="pt-4 space-y-4">
              <div>
                <label className={lbl}>Destination</label>
                <input className={inp} placeholder="e.g. Gulmarg, Kashmir" value={form.destination} onChange={(e) => set('destination', e.target.value)} />
              </div>
              <div>
                <label className={lbl}>Overview</label>
                <textarea className={`${ta} min-h-37.5`} placeholder="Package overview description..." value={form.overview} onChange={(e) => set('overview', e.target.value)} />
              </div>
            </div>
          </CMSSection>
        </motion.div>

        {/* ── 3. Inclusions Flags ── */}
        <motion.div {...fadeUp(0.1)}>
          <CMSSection title="What's Included" icon={<SlidersHorizontal className="w-4 h-4" />} defaultOpen>
            <div className="pt-4 grid grid-cols-2 gap-3">
              {([
                ['isTransferIncluded', 'Transfer'],
                ['isStayIncluded', 'Stay'],
                ['isBreakfastIncluded', 'Breakfast'],
                ['isSightseeingIncluded', 'Sightseeing'],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => set(key, !form[key])}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-sm font-medium ${
                    form[key]
                      ? 'bg-emerald-600/10 border-emerald-600/30 text-emerald-400'
                      : 'bg-[#07111f] border-[#19315d]/50 text-slate-500 hover:border-[#244278]/50'
                  }`}
                >
                  {form[key] ? (
                    <CheckCircle className="w-4 h-4 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 shrink-0" />
                  )}
                  {label}
                </button>
              ))}
            </div>
          </CMSSection>
        </motion.div>

        {/* ── 4. Duration Breakdown ── */}
        <motion.div {...fadeUp(0.13)}>
          <CMSSection title="Duration Breakdown" icon={<Clock className="w-4 h-4" />} defaultOpen={false} badge={form.durationbreakdown.length || undefined}>
            <div className="pt-4 space-y-3">
              {form.durationbreakdown.map((item, idx) => (
                <div key={item.id} className="flex items-center gap-3 rounded-xl border border-[#19315d]/40 bg-[#07111f]/60 p-3">
                  <span className="text-xs text-slate-600 w-5 shrink-0">{idx + 1}</span>
                  <input type="number" className={`${inp} w-20 shrink-0`} placeholder="Days" value={item.days}
                    onChange={(e) => set('durationbreakdown', form.durationbreakdown.map(i => i.id === item.id ? { ...i, days: Number(e.target.value) } : i))} />
                  <input className={`${inp} flex-1`} placeholder="Place name" value={item.place}
                    onChange={(e) => set('durationbreakdown', form.durationbreakdown.map(i => i.id === item.id ? { ...i, place: e.target.value } : i))} />
                  <button type="button" className={removeBtn} onClick={() => set('durationbreakdown', form.durationbreakdown.filter(i => i.id !== item.id))}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button type="button" className={addBtn}
                onClick={() => set('durationbreakdown', [...form.durationbreakdown, { id: uid(), days: 1, place: '' }])}>
                <Plus className="w-4 h-4" /> Add Stop
              </button>
            </div>
          </CMSSection>
        </motion.div>

        {/* ── 5. Available Sources ── */}
        <motion.div {...fadeUp(0.16)}>
          <CMSSection title="Available Source Cities" icon={<Navigation className="w-4 h-4" />} defaultOpen={false} badge={form.availableSrc.length || undefined}>
            <div className="pt-4 space-y-3">
              {form.availableSrc.map((src, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input className={`${inp} flex-1`} placeholder="City name" value={src}
                    onChange={(e) => {
                      const updated = [...form.availableSrc];
                      updated[idx] = e.target.value;
                      set('availableSrc', updated);
                    }} />
                  <button type="button" className={removeBtn} onClick={() => set('availableSrc', form.availableSrc.filter((_, i) => i !== idx))}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button type="button" className={addBtn} onClick={() => set('availableSrc', [...form.availableSrc, ''])}>
                <Plus className="w-4 h-4" /> Add City
              </button>
            </div>
          </CMSSection>
        </motion.div>

        {/* ── 6. Routes ── */}
        <motion.div {...fadeUp(0.19)}>
          <CMSSection title="Routes" icon={<Map className="w-4 h-4" />} defaultOpen={false}>
            <div className="pt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>Source City</label>
                  <input className={inp} placeholder="e.g. Delhi" value={form.routes.source}
                    onChange={(e) => set('routes', { ...form.routes, source: e.target.value })} />
                </div>
                <div>
                  <label className={lbl}>Destination City</label>
                  <input className={inp} placeholder="e.g. Srinagar" value={form.routes.destination}
                    onChange={(e) => set('routes', { ...form.routes, destination: e.target.value })} />
                </div>
              </div>
              <div>
                <label className={lbl}>Route Segments</label>
                <div className="space-y-2">
                  {form.routes.segments.map((seg) => (
                    <div key={seg.id} className="flex items-center gap-3 rounded-xl border border-[#19315d]/40 bg-[#07111f]/60 p-3">
                      <input className={`${inp} flex-1`} placeholder="From" value={seg.from}
                        onChange={(e) => set('routes', { ...form.routes, segments: form.routes.segments.map(s => s.id === seg.id ? { ...s, from: e.target.value } : s) })} />
                      <ChevronsUpDown className="w-4 h-4 text-slate-600 shrink-0 rotate-90" />
                      <input className={`${inp} flex-1`} placeholder="To" value={seg.to}
                        onChange={(e) => set('routes', { ...form.routes, segments: form.routes.segments.map(s => s.id === seg.id ? { ...s, to: e.target.value } : s) })} />
                      <button type="button" className={removeBtn} onClick={() => set('routes', { ...form.routes, segments: form.routes.segments.filter(s => s.id !== seg.id) })}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button type="button" className={addBtn}
                    onClick={() => set('routes', { ...form.routes, segments: [...form.routes.segments, { id: uid(), from: '', to: '' }] })}>
                    <Plus className="w-4 h-4" /> Add Segment
                  </button>
                </div>
              </div>
            </div>
          </CMSSection>
        </motion.div>

        {/* ── 7. Highlights ── */}
        <motion.div {...fadeUp(0.22)}>
          <CMSSection title="Trip Highlights" icon={<Star className="w-4 h-4" />} defaultOpen={false} badge={form.highlights.length || undefined}>
            <div className="pt-4 space-y-3">
              {form.highlights.map((item, idx) => (
                <div key={item.id} className="flex items-center gap-3">
                  <span className="text-xs text-slate-600 w-5 shrink-0">{idx + 1}</span>
                  <input className={`${inp} flex-1`} placeholder="Highlight description" value={item.description}
                    onChange={(e) => updateSimple('highlights', item.id, e.target.value)} />
                  <button type="button" className={removeBtn} onClick={() => removeSimple('highlights', item.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button type="button" className={addBtn} onClick={() => addSimple('highlights')}>
                <Plus className="w-4 h-4" /> Add Highlight
              </button>
            </div>
          </CMSSection>
        </motion.div>

        {/* ── 8. Itinerary ── */}
        <motion.div {...fadeUp(0.25)}>
          <CMSSection title="Itinerary" icon={<FileText className="w-4 h-4" />} defaultOpen={false} badge={form.itinerary.length || undefined}>
            <div className="pt-4 space-y-3">
              {form.itinerary.map((item) => (
                <div key={item.id} className="rounded-xl border border-[#19315d]/40 bg-[#07111f]/60 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/15 border border-blue-600/20 flex items-center justify-center">
                        <span className="text-blue-400 text-xs font-bold">{item.day}</span>
                      </div>
                      <input type="number" className={`${inp} w-20`} placeholder="Day" value={item.day}
                        onChange={(e) => set('itinerary', form.itinerary.map(i => i.id === item.id ? { ...i, day: Number(e.target.value) } : i))} />
                    </div>
                    <button type="button" className={removeBtn} onClick={() => set('itinerary', form.itinerary.filter(i => i.id !== item.id))}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input className={inp} placeholder="Day title" value={item.title}
                    onChange={(e) => set('itinerary', form.itinerary.map(i => i.id === item.id ? { ...i, title: e.target.value } : i))} />
                  <textarea className={`${ta} min-h-20`} placeholder="Day description" value={item.description}
                    onChange={(e) => set('itinerary', form.itinerary.map(i => i.id === item.id ? { ...i, description: e.target.value } : i))} />
                </div>
              ))}
              <button type="button" className={addBtn}
                onClick={() => set('itinerary', [...form.itinerary, { id: uid(), day: form.itinerary.length + 1, title: '', description: '' }])}>
                <Plus className="w-4 h-4" /> Add Day
              </button>
            </div>
          </CMSSection>
        </motion.div>

        {/* ── 9. Inclusions ── */}
        <motion.div {...fadeUp(0.28)}>
          <CMSSection title="Inclusions" icon={<CheckCircle className="w-4 h-4" />} defaultOpen={false} badge={form.inclusions.length || undefined}>
            <div className="pt-4 space-y-3">
              {form.inclusions.map((item, idx) => (
                <div key={item.id} className="flex items-center gap-3">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <input className={`${inp} flex-1`} placeholder={`Inclusion ${idx + 1}`} value={item.description}
                    onChange={(e) => updateSimple('inclusions', item.id, e.target.value)} />
                  <button type="button" className={removeBtn} onClick={() => removeSimple('inclusions', item.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button type="button" className={addBtn} onClick={() => addSimple('inclusions')}>
                <Plus className="w-4 h-4" /> Add Inclusion
              </button>
            </div>
          </CMSSection>
        </motion.div>

        {/* ── 10. Exclusions ── */}
        <motion.div {...fadeUp(0.31)}>
          <CMSSection title="Exclusions" icon={<XCircle className="w-4 h-4" />} defaultOpen={false} badge={form.exclusions.length || undefined}>
            <div className="pt-4 space-y-3">
              {form.exclusions.map((item, idx) => (
                <div key={item.id} className="flex items-center gap-3">
                  <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <input className={`${inp} flex-1`} placeholder={`Exclusion ${idx + 1}`} value={item.description}
                    onChange={(e) => updateSimple('exclusions', item.id, e.target.value)} />
                  <button type="button" className={removeBtn} onClick={() => removeSimple('exclusions', item.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button type="button" className={addBtn} onClick={() => addSimple('exclusions')}>
                <Plus className="w-4 h-4" /> Add Exclusion
              </button>
            </div>
          </CMSSection>
        </motion.div>

        {/* ── 11. FAQs ── */}
        <motion.div {...fadeUp(0.34)}>
          <CMSSection title="FAQs" icon={<MessageSquare className="w-4 h-4" />} defaultOpen={false} badge={form.faqs.length || undefined}>
            <div className="pt-4">
              <FaqHandler faqs={form.faqs} onChange={(faqs) => set('faqs', faqs)} />
            </div>
          </CMSSection>
        </motion.div>

        {/* ── 12. Media ── */}
        <motion.div {...fadeUp(0.37)}>
          <CMSSection title="Hero Image" icon={<ImageIcon className="w-4 h-4" />} defaultOpen={false}>
            <div className="pt-4 space-y-4">
              <div>
                <label className={lbl}>Hero Image URL</label>
                <input className={inp} placeholder="https://..." value={form.heroImage.image}
                  onChange={(e) => set('heroImage', { ...form.heroImage, image: e.target.value })} />
              </div>
              {form.heroImage.image && (
                <div className="rounded-xl overflow-hidden border border-[#19315d]/40 aspect-video bg-[#07111f]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.heroImage.image} alt="hero preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <label className={lbl}>Hero Image Alt</label>
                <input className={inp} placeholder="Describe the image" value={form.heroImage.alt}
                  onChange={(e) => set('heroImage', { ...form.heroImage, alt: e.target.value })} />
              </div>
            </div>
          </CMSSection>
        </motion.div>

        {/* ── 13. Gallery ── */}
        <motion.div {...fadeUp(0.4)}>
          <CMSSection title="Gallery Images" icon={<ImageIcon className="w-4 h-4" />} defaultOpen={false} badge={form.childImages.length || undefined}>
            <div className="pt-4 space-y-3">
              {form.childImages.map((img) => (
                <div key={img.id} className="rounded-xl border border-[#19315d]/40 bg-[#07111f]/60 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Image</span>
                    <button type="button" className={removeBtn} onClick={() => set('childImages', form.childImages.filter(i => i.id !== img.id))}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input className={inp} placeholder="Image URL" value={img.image}
                    onChange={(e) => set('childImages', form.childImages.map(i => i.id === img.id ? { ...i, image: e.target.value } : i))} />
                  <input className={inp} placeholder="Alt text" value={img.alt}
                    onChange={(e) => set('childImages', form.childImages.map(i => i.id === img.id ? { ...i, alt: e.target.value } : i))} />
                </div>
              ))}
              <button type="button" className={addBtn}
                onClick={() => set('childImages', [...form.childImages, { id: uid(), image: '', alt: '' }])}>
                <Plus className="w-4 h-4" /> Add Image
              </button>
            </div>
          </CMSSection>
        </motion.div>

        {/* ── 14. Testimonials ── */}
        <motion.div {...fadeUp(0.43)}>
          <CMSSection title="Testimonials" icon={<Users className="w-4 h-4" />} defaultOpen={false} badge={form.testimonials.length || undefined}>
            <div className="pt-4 space-y-3">
              {form.testimonials.map((t) => (
                <div key={t.id} className="rounded-xl border border-[#19315d]/40 bg-[#07111f]/60 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Review</span>
                    <button type="button" className={removeBtn} onClick={() => set('testimonials', form.testimonials.filter(i => i.id !== t.id))}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input className={inp} placeholder="Name" value={t.name}
                      onChange={(e) => set('testimonials', form.testimonials.map(i => i.id === t.id ? { ...i, name: e.target.value } : i))} />
                    <input className={inp} placeholder="Rating (e.g. 5)" value={t.rating}
                      onChange={(e) => set('testimonials', form.testimonials.map(i => i.id === t.id ? { ...i, rating: e.target.value } : i))} />
                  </div>
                  <textarea className={`${ta} min-h-20`} placeholder="Review text" value={t.description}
                    onChange={(e) => set('testimonials', form.testimonials.map(i => i.id === t.id ? { ...i, description: e.target.value } : i))} />
                </div>
              ))}
              <button type="button" className={addBtn}
                onClick={() => set('testimonials', [...form.testimonials, { id: uid(), name: '', description: '', rating: '' }])}>
                <Plus className="w-4 h-4" /> Add Testimonial
              </button>
            </div>
          </CMSSection>
        </motion.div>

        {/* ── 15. Know Before You Go ── */}
        <motion.div {...fadeUp(0.46)}>
          <CMSSection title="Know Before You Go" icon={<Info className="w-4 h-4" />} defaultOpen={false} badge={form.knowBeforeYouGo.length || undefined}>
            <div className="pt-4 space-y-3">
              {form.knowBeforeYouGo.map((item, idx) => (
                <div key={item.id} className="flex items-center gap-3">
                  <span className="text-xs text-slate-600 w-5 shrink-0">{idx + 1}</span>
                  <input className={`${inp} flex-1`} placeholder="Important note..." value={item.description}
                    onChange={(e) => updateSimple('knowBeforeYouGo', item.id, e.target.value)} />
                  <button type="button" className={removeBtn} onClick={() => removeSimple('knowBeforeYouGo', item.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button type="button" className={addBtn} onClick={() => addSimple('knowBeforeYouGo')}>
                <Plus className="w-4 h-4" /> Add Note
              </button>
            </div>
          </CMSSection>
        </motion.div>

        {/* ── 16. SEO ── */}
        <motion.div {...fadeUp(0.49)}>
          <CMSSection title="SEO" icon={<Search className="w-4 h-4" />} defaultOpen={false}>
            <div className="pt-4 space-y-4">
              <div>
                <label className={lbl}>Meta Title</label>
                <input className={inp} placeholder="SEO title (50–60 chars)" value={form.metaTitle} onChange={(e) => set('metaTitle', e.target.value)} />
                <p className="text-[11px] text-slate-600 mt-1">{form.metaTitle.length}/60 chars</p>
              </div>
              <div>
                <label className={lbl}>Meta Description</label>
                <textarea className={ta} placeholder="SEO description (150–160 chars)" value={form.metaDescription} onChange={(e) => set('metaDescription', e.target.value)} />
                <p className="text-[11px] text-slate-600 mt-1">{form.metaDescription.length}/160 chars</p>
              </div>
              {(form.metaTitle || form.metaDescription) && (
                <div className="rounded-xl border border-[#19315d]/40 bg-[#07111f] p-4">
                  <p className="text-[11px] text-slate-500 mb-2 uppercase tracking-widest">Search Preview</p>
                  <p className="text-blue-400 text-sm font-medium truncate">{form.metaTitle || form.title || 'Page Title'}</p>
                  <p className="text-emerald-600 text-xs mt-0.5">ekashmirtours.com/package/{form.slug || 'package-slug'}</p>
                  <p className="text-slate-400 text-xs mt-1 line-clamp-2">{form.metaDescription || 'Meta description...'}</p>
                </div>
              )}
            </div>
          </CMSSection>
        </motion.div>

        {/* ── 17. Structured Data ── */}
        <motion.div {...fadeUp(0.52)}>
          <CMSSection title="Structured Data" icon={<Code className="w-4 h-4" />} defaultOpen={false}>
            <div className="pt-4 space-y-4">
              <div>
                <label className={lbl}>Schema Title</label>
                <input className={inp} placeholder="Schema.org title" value={form.schemaTitle} onChange={(e) => set('schemaTitle', e.target.value)} />
              </div>
              <div>
                <label className={lbl}>Schema Description</label>
                <textarea className={ta} placeholder="Schema.org description" value={form.schemaDescription} onChange={(e) => set('schemaDescription', e.target.value)} />
              </div>
            </div>
          </CMSSection>
        </motion.div>

        {/* ── 18. Policies ── */}
        <motion.div {...fadeUp(0.55)}>
          <CMSSection title="Policies" icon={<FileText className="w-4 h-4" />} defaultOpen={false}>
            <div className="pt-4 grid grid-cols-1 gap-4">
              {([
                ['refund', 'Refund Policy'],
                ['cancel', 'Cancellation Policy'],
                ['confirmation', 'Confirmation Policy'],
                ['payment', 'Payment Policy'],
              ] as const).map(([key, fieldLabel]) => (
                <div key={key}>
                  <label className={lbl}>{fieldLabel}</label>
                  <textarea className={`${ta} min-h-20`} placeholder={`${fieldLabel}...`} value={form[key]} onChange={(e) => set(key, e.target.value)} />
                </div>
              ))}
            </div>
          </CMSSection>
        </motion.div>

      </div>

      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-20 right-6 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-xl ${
            toast.type === 'ok'
              ? 'bg-emerald-600/90 text-white border border-emerald-500/40'
              : 'bg-red-600/90 text-white border border-red-500/40'
          }`}
        >
          {toast.msg}
        </motion.div>
      )}

      {/* Sticky Actions */}
      <CMSActions
        status={form.status}
        onStatusChange={(s) => set('status', s)}
        onSave={handleSave}
        isSaving={isSaving}
        backHref="/admin/packages"
        saveLabel={packageId ? 'Update Package' : 'Create Package'}
      />
    </div>
  );
}
