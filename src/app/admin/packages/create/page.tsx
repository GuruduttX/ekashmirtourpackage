'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircle2, XCircle, Plus, Trash2, Star, FileText, AlignLeft,
  Clock, Navigation, Map, Users, Info, SlidersHorizontal, ChevronsUpDown, ImageIcon,
} from 'lucide-react';

import CMSHeader from '@/components/admin/cms/CMSHeader';
import CMSSection from '@/components/admin/CMSSection';
import CMSMetaSection from '@/components/admin/cms/CMSMetaSection';
import CMSSeoSection from '@/components/admin/cms/CMSSeoSection';
import CMSSchema from '@/components/admin/cms/CMSSchema';
import CMSMediaSection from '@/components/admin/cms/CMSMediaSection';
import CMSActions from '@/components/admin/cms/CMSActions';
import FaqHandler, { FaqItem } from '@/components/admin/cms/FaqHandler';
import DANDestination from '@/components/admin/cms/package/DANDestination';
import SourceCitySelector from '@/components/admin/cms/package/SourceCitySelector';
import DurationSection from '@/components/admin/cms/package/DurationSection';
import PackageOverview from '@/components/admin/cms/package/PackageOverview';
import ItineraryMaker from '@/components/admin/cms/package/ItineraryMaker';

// ─── Types ───────────────────────────────────────────────
interface DurationItem  { id: string; days: string; place: string }
interface SimpleItem    { id: string; description: string }
interface ItineraryItem { id: string; day: number; title: string; description: string }
interface ChildImage    { id: string; image: string; alt: string }
interface Testimonial   { id: string; name: string; description: string; rating: string }
interface Segment       { id: string; from: string; to: string }

interface PkgForm {
  title: string; category: string; slug: string;
  price: string; rating: string; reviews: string;
  duration: string; days: string; nights: string;
  destination: string; overview: string;
  refund: string; cancel: string; confirmation: string; payment: string;
  metaTitle: string; metaDescription: string;
  schemaTitle: string; schemaDescription: string;
  heroImage: string; heroAlt: string;
  isTransferIncluded: boolean; isStayIncluded: boolean;
  isBreakfastIncluded: boolean; isSightseeingIncluded: boolean;
  status: 'draft' | 'published';
}

const INITIAL: PkgForm = {
  title: '', category: '', slug: '',
  price: '', rating: '', reviews: '',
  duration: '', days: '', nights: '',
  destination: '', overview: '',
  refund: '', cancel: '', confirmation: '', payment: '',
  metaTitle: '', metaDescription: '',
  schemaTitle: '', schemaDescription: '',
  heroImage: '', heroAlt: '',
  isTransferIncluded: false, isStayIncluded: false,
  isBreakfastIncluded: false, isSightseeingIncluded: false,
  status: 'draft',
};

interface Toast { id: number; message: string; type: 'success' | 'error' }

const STORAGE_KEY = 'cms_package_create_draft';
const uid = () => crypto.randomUUID();
const slugify = (v: string) =>
  v.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';
const ta = `${inp} resize-y min-h-24`;
const addBtn =
  'flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all';
const removeBtn =
  'p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0';

export default function CreatePackagePage() {
  const router = useRouter();

  const [form, setForm] = useState<PkgForm>(INITIAL);
  const [faqs,         setFaqs]         = useState<FaqItem[]>([]);
  const [highlights,   setHighlights]   = useState<SimpleItem[]>([]);
  const [inclusions,   setInclusions]   = useState<SimpleItem[]>([]);
  const [exclusions,   setExclusions]   = useState<SimpleItem[]>([]);
  const [kbyg,         setKbyg]         = useState<SimpleItem[]>([]);
  const [itinerary,    setItinerary]    = useState<ItineraryItem[]>([]);
  const [breakdown,    setBreakdown]    = useState<DurationItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [childImages,  setChildImages]  = useState<ChildImage[]>([]);
  const [availableSrc, setAvailableSrc] = useState<string[]>([]);
  const [route,        setRoute]        = useState({ source: '', destination: '', segments: [] as Segment[] });

  const [isLoaded,     setIsLoaded]     = useState(false);
  const [isSaving,     setIsSaving]     = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts,       setToasts]       = useState<Toast[]>([]);

  // ── Read from localStorage once ──
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d.form)        setForm(d.form);
        if (d.faqs)        setFaqs(d.faqs);
        if (d.highlights)  setHighlights(d.highlights);
        if (d.inclusions)  setInclusions(d.inclusions);
        if (d.exclusions)  setExclusions(d.exclusions);
        if (d.kbyg)        setKbyg(d.kbyg);
        if (d.itinerary)   setItinerary(d.itinerary);
        if (d.breakdown)   setBreakdown(d.breakdown);
        if (d.testimonials) setTestimonials(d.testimonials);
        if (d.childImages) setChildImages(d.childImages);
        if (d.availableSrc) setAvailableSrc(d.availableSrc);
        if (d.route)       setRoute(d.route);
      }
    } catch { /* ignore */ }
    setIsLoaded(true);
  }, []);

  // ── Auto-save after load ──
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      form, faqs, highlights, inclusions, exclusions,
      kbyg, itinerary, breakdown, testimonials, childImages, availableSrc, route,
    }));
  }, [form, faqs, highlights, inclusions, exclusions, kbyg, itinerary,
      breakdown, testimonials, childImages, availableSrc, route, isLoaded]);

  const f = (field: keyof PkgForm, value: string | boolean) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'title') next.slug = slugify(value as string);
      return next;
    });
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4000);
  };

  const buildPayload = (status: 'draft' | 'published') => ({
    title: form.title, category: form.category, slug: form.slug,
    price:   Number(form.price)   || 0,
    rating:  Number(form.rating)  || 0,
    reviews: Number(form.reviews) || 0,
    days:    Number(form.days)    || 0,
    nights:  Number(form.nights)  || 0,
    duration: form.duration, destination: form.destination, overview: form.overview,
    refund: form.refund, cancel: form.cancel, confirmation: form.confirmation, payment: form.payment,
    heroImage: { image: form.heroImage, alt: form.heroAlt },
    metaTitle: form.metaTitle, metaDescription: form.metaDescription,
    schemaTitle: form.schemaTitle, schemaDescription: form.schemaDescription,
    isTransferIncluded: form.isTransferIncluded,
    isStayIncluded: form.isStayIncluded,
    isBreakfastIncluded: form.isBreakfastIncluded,
    isSightseeingIncluded: form.isSightseeingIncluded,
    faqs, highlights, inclusions, exclusions,
    knowBeforeYouGo: kbyg,
    itinerary, durationbreakdown: breakdown.map((b) => ({ ...b, days: Number(b.days) })),
    testimonials, childImages, availableSrc,
    routes: route,
    status,
  });

  const post = async (status: 'draft' | 'published') => {
    const res = await fetch('/api/packages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildPayload(status)),
    });
    if (!res.ok) throw new Error(await res.text());
    localStorage.removeItem(STORAGE_KEY);
    return res.json();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await post(form.status);
      showToast('Package published!', 'success');
      setTimeout(() => router.push('/admin/packages'), 1200);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to publish', 'error');
    } finally { setIsSubmitting(false); }
  };

  const saveDraft = async () => {
    setIsSaving(true);
    try {
      await post('draft');
      showToast('Saved as draft!', 'success');
      setTimeout(() => router.push('/admin/packages'), 1200);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save', 'error');
    } finally { setIsSaving(false); }
  };

  return (
    <div className="w-full py-8 pb-24">
      <CMSHeader editorType="Package" />

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Post Details */}
        <CMSSection title="Package Details" defaultOpen>
          <CMSMetaSection
            title={form.title}
            category={form.category}
            slug={form.slug}
            onChange={(field, val) => f(field as keyof PkgForm, val)}
            editorType="Package"
            categories={[]}
          />
        </CMSSection>

        {/* Pricing & Stats */}
        <CMSSection title="Pricing & Stats" defaultOpen>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-slate-400">Price (₹) <span className="text-red-400">*</span></label>
                <input type="number" className={`mt-2 ${inp}`} placeholder="0" value={form.price}
                  onChange={(e) => f('price', e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-slate-400">Rating</label>
                <input type="number" min={0} max={5} step={0.1} className={`mt-2 ${inp}`} placeholder="4.5"
                  value={form.rating} onChange={(e) => f('rating', e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-slate-400">Reviews</label>
                <input type="number" className={`mt-2 ${inp}`} placeholder="0"
                  value={form.reviews} onChange={(e) => f('reviews', e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-400">Duration Label</label>
              <input className={`mt-2 ${inp}`} placeholder="e.g. 7N/8D" value={form.duration}
                onChange={(e) => f('duration', e.target.value)} />
            </div>
          </div>
        </CMSSection>

        {/* Destination */}
        <CMSSection title="Destination" defaultOpen>
          <div className="mt-1">
            <DANDestination
              destination={form.destination}
              onChange={(field, val) => f(field as keyof PkgForm, val)}
            />
          </div>
        </CMSSection>

        {/* Package Overview */}
        <CMSSection title="Package Overview" icon={<AlignLeft className="w-4 h-4" />} defaultOpen>
          <div className="mt-1">
            <PackageOverview
              overview={form.overview}
              onChange={(field, val) => f(field as keyof PkgForm, val)}
            />
          </div>
        </CMSSection>

        {/* What's Included */}
        <CMSSection title="What's Included" icon={<SlidersHorizontal className="w-4 h-4" />} defaultOpen={false}>
          <div className="grid grid-cols-2 gap-3 mt-1">
            {([
              ['isTransferIncluded',   'Transfer'],
              ['isStayIncluded',       'Stay'],
              ['isBreakfastIncluded',  'Breakfast'],
              ['isSightseeingIncluded','Sightseeing'],
            ] as const).map(([key, label]) => (
              <button key={key} type="button"
                onClick={() => setForm((p) => ({ ...p, [key]: !p[key] }))}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-sm font-medium ${
                  form[key]
                    ? 'bg-emerald-600/10 border-emerald-600/30 text-emerald-400'
                    : 'bg-[#07111f] border-[#19315d]/50 text-slate-500 hover:border-[#244278]/50'
                }`}
              >
                {form[key] ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
                {label}
              </button>
            ))}
          </div>
        </CMSSection>

        {/* Duration */}
        <CMSSection title="Duration" icon={<Clock className="w-4 h-4" />} defaultOpen={false}>
          <div className="mt-1">
            <DurationSection
              days={form.days}
              nights={form.nights}
              breakdown={breakdown}
              onChange={(field, val) => f(field as keyof PkgForm, val)}
              setBreakdown={setBreakdown}
            />
          </div>
        </CMSSection>

        {/* Source Cities */}
        <CMSSection title="Source Cities" icon={<Navigation className="w-4 h-4" />} defaultOpen={false} badge={availableSrc.length || undefined}>
          <div className="mt-1">
            <SourceCitySelector availableSrc={availableSrc} setAvailableSrc={setAvailableSrc} />
          </div>
        </CMSSection>

        {/* Routes */}
        <CMSSection title="Routes" icon={<Map className="w-4 h-4" />} defaultOpen={false}>
          <div className="space-y-4 mt-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-400">Source City</label>
                <input className={`mt-2 ${inp}`} placeholder="e.g. Delhi" value={route.source}
                  onChange={(e) => setRoute((r) => ({ ...r, source: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm text-slate-400">Destination City</label>
                <input className={`mt-2 ${inp}`} placeholder="e.g. Srinagar" value={route.destination}
                  onChange={(e) => setRoute((r) => ({ ...r, destination: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              {route.segments.map((seg) => (
                <div key={seg.id} className="flex items-center gap-3 rounded-xl border border-[#19315d]/40 bg-[#07111f]/60 p-3">
                  <input className={`${inp} flex-1`} placeholder="From" value={seg.from}
                    onChange={(e) => setRoute((r) => ({ ...r, segments: r.segments.map((s) => s.id === seg.id ? { ...s, from: e.target.value } : s) }))} />
                  <ChevronsUpDown className="w-4 h-4 text-slate-600 shrink-0 rotate-90" />
                  <input className={`${inp} flex-1`} placeholder="To" value={seg.to}
                    onChange={(e) => setRoute((r) => ({ ...r, segments: r.segments.map((s) => s.id === seg.id ? { ...s, to: e.target.value } : s) }))} />
                  <button type="button" className={removeBtn}
                    onClick={() => setRoute((r) => ({ ...r, segments: r.segments.filter((s) => s.id !== seg.id) }))}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button type="button" className={addBtn}
                onClick={() => setRoute((r) => ({ ...r, segments: [...r.segments, { id: uid(), from: '', to: '' }] }))}>
                <Plus className="w-4 h-4" /> Add Segment
              </button>
            </div>
          </div>
        </CMSSection>

        {/* Highlights */}
        <CMSSection title="Trip Highlights" icon={<Star className="w-4 h-4" />} defaultOpen={false} badge={highlights.length || undefined}>
          <div className="space-y-3 mt-1">
            {highlights.map((item, idx) => (
              <div key={item.id} className="flex items-center gap-3">
                <span className="text-xs text-slate-600 w-5 shrink-0">{idx + 1}</span>
                <input className={`${inp} flex-1`} placeholder="Highlight description" value={item.description}
                  onChange={(e) => setHighlights((p) => p.map((i) => i.id === item.id ? { ...i, description: e.target.value } : i))} />
                <button type="button" className={removeBtn} onClick={() => setHighlights((p) => p.filter((i) => i.id !== item.id))}>
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button type="button" className={addBtn} onClick={() => setHighlights((p) => [...p, { id: uid(), description: '' }])}>
              <Plus className="w-4 h-4" /> Add Highlight
            </button>
          </div>
        </CMSSection>

        {/* Itinerary */}
        <CMSSection title="Itinerary" icon={<FileText className="w-4 h-4" />} defaultOpen={false} badge={itinerary.length || undefined}>
          <div className="mt-1">
            <ItineraryMaker itinerary={itinerary} setItinerary={setItinerary} />
          </div>
        </CMSSection>

        {/* Inclusions */}
        <CMSSection title="Inclusions" icon={<CheckCircle2 className="w-4 h-4" />} defaultOpen={false} badge={inclusions.length || undefined}>
          <div className="space-y-3 mt-1">
            {inclusions.map((item, idx) => (
              <div key={item.id} className="flex items-center gap-3">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <input className={`${inp} flex-1`} placeholder={`Inclusion ${idx + 1}`} value={item.description}
                  onChange={(e) => setInclusions((p) => p.map((i) => i.id === item.id ? { ...i, description: e.target.value } : i))} />
                <button type="button" className={removeBtn} onClick={() => setInclusions((p) => p.filter((i) => i.id !== item.id))}>
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button type="button" className={addBtn} onClick={() => setInclusions((p) => [...p, { id: uid(), description: '' }])}>
              <Plus className="w-4 h-4" /> Add Inclusion
            </button>
          </div>
        </CMSSection>

        {/* Exclusions */}
        <CMSSection title="Exclusions" icon={<XCircle className="w-4 h-4" />} defaultOpen={false} badge={exclusions.length || undefined}>
          <div className="space-y-3 mt-1">
            {exclusions.map((item, idx) => (
              <div key={item.id} className="flex items-center gap-3">
                <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <input className={`${inp} flex-1`} placeholder={`Exclusion ${idx + 1}`} value={item.description}
                  onChange={(e) => setExclusions((p) => p.map((i) => i.id === item.id ? { ...i, description: e.target.value } : i))} />
                <button type="button" className={removeBtn} onClick={() => setExclusions((p) => p.filter((i) => i.id !== item.id))}>
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button type="button" className={addBtn} onClick={() => setExclusions((p) => [...p, { id: uid(), description: '' }])}>
              <Plus className="w-4 h-4" /> Add Exclusion
            </button>
          </div>
        </CMSSection>

        {/* FAQs */}
        <CMSSection title="FAQs" defaultOpen={false} badge={faqs.length || undefined}>
          <div className="mt-1">
            <FaqHandler faqs={faqs} setFaqs={setFaqs} />
          </div>
        </CMSSection>

        {/* Testimonials */}
        <CMSSection title="Testimonials" icon={<Users className="w-4 h-4" />} defaultOpen={false} badge={testimonials.length || undefined}>
          <div className="space-y-3 mt-1">
            {testimonials.map((t) => (
              <div key={t.id} className="rounded-xl border border-[#19315d]/40 bg-[#07111f]/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Review</span>
                  <button type="button" className={removeBtn} onClick={() => setTestimonials((p) => p.filter((i) => i.id !== t.id))}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input className={inp} placeholder="Name" value={t.name}
                    onChange={(e) => setTestimonials((p) => p.map((i) => i.id === t.id ? { ...i, name: e.target.value } : i))} />
                  <input className={inp} placeholder="Rating (e.g. 5)" value={t.rating}
                    onChange={(e) => setTestimonials((p) => p.map((i) => i.id === t.id ? { ...i, rating: e.target.value } : i))} />
                </div>
                <textarea className={`${ta} min-h-20`} placeholder="Review text" value={t.description}
                  onChange={(e) => setTestimonials((p) => p.map((i) => i.id === t.id ? { ...i, description: e.target.value } : i))} />
              </div>
            ))}
            <button type="button" className={addBtn}
              onClick={() => setTestimonials((p) => [...p, { id: uid(), name: '', description: '', rating: '' }])}>
              <Plus className="w-4 h-4" /> Add Testimonial
            </button>
          </div>
        </CMSSection>

        {/* Know Before You Go */}
        <CMSSection title="Know Before You Go" icon={<Info className="w-4 h-4" />} defaultOpen={false} badge={kbyg.length || undefined}>
          <div className="space-y-3 mt-1">
            {kbyg.map((item, idx) => (
              <div key={item.id} className="flex items-center gap-3">
                <span className="text-xs text-slate-600 w-5 shrink-0">{idx + 1}</span>
                <input className={`${inp} flex-1`} placeholder="Important note..." value={item.description}
                  onChange={(e) => setKbyg((p) => p.map((i) => i.id === item.id ? { ...i, description: e.target.value } : i))} />
                <button type="button" className={removeBtn} onClick={() => setKbyg((p) => p.filter((i) => i.id !== item.id))}>
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button type="button" className={addBtn} onClick={() => setKbyg((p) => [...p, { id: uid(), description: '' }])}>
              <Plus className="w-4 h-4" /> Add Note
            </button>
          </div>
        </CMSSection>

        {/* Policies */}
        <CMSSection title="Policies" icon={<FileText className="w-4 h-4" />} defaultOpen={false}>
          <div className="space-y-4 mt-1">
            {([
              ['refund',       'Refund Policy'],
              ['cancel',       'Cancellation Policy'],
              ['confirmation', 'Confirmation Policy'],
              ['payment',      'Payment Policy'],
            ] as const).map(([key, label]) => (
              <div key={key}>
                <label className="text-sm text-slate-400">{label}</label>
                <textarea className={`mt-2 ${ta}`} placeholder={`${label}...`} value={form[key]}
                  onChange={(e) => f(key, e.target.value)} />
              </div>
            ))}
          </div>
        </CMSSection>

        {/* Hero Image */}
        <CMSSection title="Hero Image" icon={<ImageIcon className="w-4 h-4" />}>
          <div className="mt-1">
            <CMSMediaSection
              image={form.heroImage}
              alt={form.heroAlt}
              editorType="Package"
              onChange={(field, value) =>
                setForm((p) => ({ ...p, [field === 'image' ? 'heroImage' : 'heroAlt']: value }))
              }
            />
          </div>
        </CMSSection>

        {/* Gallery */}
        <CMSSection title="Gallery Images" icon={<ImageIcon className="w-4 h-4" />} defaultOpen={false} badge={childImages.length || undefined}>
          <div className="space-y-3 mt-1">
            {childImages.map((img) => (
              <div key={img.id} className="rounded-xl border border-[#19315d]/40 bg-[#07111f]/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Image</span>
                  <button type="button" className={removeBtn} onClick={() => setChildImages((p) => p.filter((i) => i.id !== img.id))}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input className={inp} placeholder="Image URL" value={img.image}
                  onChange={(e) => setChildImages((p) => p.map((i) => i.id === img.id ? { ...i, image: e.target.value } : i))} />
                <input className={inp} placeholder="Alt text" value={img.alt}
                  onChange={(e) => setChildImages((p) => p.map((i) => i.id === img.id ? { ...i, alt: e.target.value } : i))} />
              </div>
            ))}
            <button type="button" className={addBtn}
              onClick={() => setChildImages((p) => [...p, { id: uid(), image: '', alt: '' }])}>
              <Plus className="w-4 h-4" /> Add Image
            </button>
          </div>
        </CMSSection>

        {/* SEO */}
        <CMSSection title="SEO">
          <div className="mt-1">
            <CMSSeoSection
              metaTitle={form.metaTitle}
              metaDescription={form.metaDescription}
              onChange={(field, val) => f(field as keyof PkgForm, val)}
            />
          </div>
        </CMSSection>

        {/* Structured Data */}
        <CMSSection title="Structured Data" defaultOpen={false}>
          <div className="mt-1">
            <CMSSchema
              schemaTitle={form.schemaTitle}
              schemaDescription={form.schemaDescription}
              onChange={(field, val) => f(field as keyof PkgForm, val)}
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
            <motion.div key={t.id}
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
              {t.type === 'success'
                ? <CheckCircle2 className="w-4 h-4 shrink-0" />
                : <XCircle className="w-4 h-4 shrink-0" />}
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
