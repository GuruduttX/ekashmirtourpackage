'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle2, XCircle, Plus, Trash2, AlignLeft, Fuel, Users, IndianRupee, Snowflake,
} from 'lucide-react';

import CMSHeader from '@/components/admin/cms/CMSHeader';
import CMSSection from '@/components/admin/CMSSection';
import CMSMetaSection from '@/components/admin/cms/CMSMetaSection';
import CMSSeoSection from '@/components/admin/cms/CMSSeoSection';
import CMSMediaSection from '@/components/admin/cms/CMSMediaSection';
import CMSActions from '@/components/admin/cms/CMSActions';
import FaqHandler, { FaqItem } from '@/components/admin/cms/FaqHandler';

// ─── Types ───────────────────────────────────────────────
interface SimpleItem { id: string; description: string }

interface CabForm {
  title: string; cabType: string; slug: string;
  basePrice: string; seats: string; fuelType: string; isAC: boolean;
  overview: string;
  metaTitle: string; metaDescription: string;
  image: string; alt: string;
  status: 'draft' | 'published';
}

const CAB_TYPES = ['SUV', 'Sedan', 'Hatchback', 'Tempo Traveller', 'Luxury', 'Electric'];
const FUEL_TYPES = ['Petrol', 'Diesel', 'Electric', 'CNG'];

const INITIAL: CabForm = {
  title: '', cabType: '', slug: '',
  basePrice: '', seats: '', fuelType: '', isAC: true,
  overview: '',
  metaTitle: '', metaDescription: '',
  image: '', alt: '',
  status: 'draft',
};

interface Toast { id: number; message: string; type: 'success' | 'error' }

const STORAGE_KEY = 'cms_cab_create_draft';
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

export default function CreateCabPage() {
  const router = useRouter();

  const [form, setForm] = useState<CabForm>(INITIAL);
  const [faqs,       setFaqs]       = useState<FaqItem[]>([]);
  const [inclusions, setInclusions] = useState<SimpleItem[]>([]);
  const [exclusions, setExclusions] = useState<SimpleItem[]>([]);

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
        if (d.form)       setForm(d.form);
        if (d.faqs)       setFaqs(d.faqs);
        if (d.inclusions) setInclusions(d.inclusions);
        if (d.exclusions) setExclusions(d.exclusions);
      }
    } catch { /* ignore */ }
    setIsLoaded(true);
  }, []);

  // ── Auto-save after load ──
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, faqs, inclusions, exclusions }));
  }, [form, faqs, inclusions, exclusions, isLoaded]);

  const f = (field: string, value: string) => {
    setForm((prev) => {
      // CMSMetaSection emits the generic "category" field — map it to cabType here.
      const key = field === 'category' ? 'cabType' : field;
      const next = { ...prev, [key]: value } as CabForm;
      if (field === 'title') next.slug = slugify(value);
      return next;
    });
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4000);
  };

  const buildPayload = (status: 'draft' | 'published') => ({
    title: form.title, cabType: form.cabType, slug: form.slug,
    basePrice: Number(form.basePrice) || 0,
    seats:     Number(form.seats)     || 0,
    fuelType: form.fuelType, isAC: form.isAC,
    overview: form.overview,
    metaTitle: form.metaTitle, metaDescription: form.metaDescription,
    image: form.image, alt: form.alt,
    inclusions, exclusions, faqs,
    status,
  });

  const post = async (status: 'draft' | 'published') => {
    const res = await fetch('/api/cabs', {
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
      showToast('Cab published!', 'success');
      setTimeout(() => router.push('/admin/cabs'), 1200);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to publish', 'error');
    } finally { setIsSubmitting(false); }
  };

  const saveDraft = async () => {
    setIsSaving(true);
    try {
      await post('draft');
      showToast('Saved as draft!', 'success');
      setTimeout(() => router.push('/admin/cabs'), 1200);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save', 'error');
    } finally { setIsSaving(false); }
  };

  return (
    <div className="w-full py-8 pb-24">
      <CMSHeader editorType="Cab" />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Cab Details */}
        <CMSSection title="Cab Details" defaultOpen>
          <CMSMetaSection
            title={form.title}
            category={form.cabType}
            slug={form.slug}
            onChange={f}
            editorType="Cab"
            categories={CAB_TYPES}
          />
        </CMSSection>

        {/* Pricing & Specs */}
        <CMSSection title="Pricing & Specs" defaultOpen>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-slate-400 flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5" /> Base Price (₹)
              </label>
              <input
                type="number"
                className={`mt-2 ${inp}`}
                placeholder="0"
                value={form.basePrice}
                onChange={(e) => f('basePrice', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Seats
              </label>
              <input
                type="number"
                min={0}
                className={`mt-2 ${inp}`}
                placeholder="4"
                value={form.seats}
                onChange={(e) => f('seats', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 flex items-center gap-1.5">
                <Fuel className="w-3.5 h-3.5" /> Fuel Type
              </label>
              <select
                className={`mt-2 ${inp} cursor-pointer`}
                value={form.fuelType}
                onChange={(e) => f('fuelType', e.target.value)}
              >
                <option value="" className="bg-[#0b1730]">Select Fuel Type</option>
                {FUEL_TYPES.map((ft) => (
                  <option key={ft} value={ft} className="bg-[#0b1730]">{ft}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-400">AC / Non-AC</label>
              <button
                type="button"
                onClick={() => setForm((p) => ({ ...p, isAC: !p.isAC }))}
                className={`mt-2 w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm font-medium ${
                  form.isAC
                    ? 'bg-emerald-600/10 border-emerald-600/30 text-emerald-400'
                    : 'bg-[#07111f] border-[#19315d]/50 text-slate-500 hover:border-[#244278]/50'
                }`}
              >
                <Snowflake className="w-4 h-4 shrink-0" />
                {form.isAC ? 'AC' : 'Non-AC'}
              </button>
            </div>
          </div>
        </CMSSection>

        {/* Overview */}
        <CMSSection title="Overview" icon={<AlignLeft className="w-4 h-4" />} defaultOpen>
          <textarea
            className={ta}
            placeholder="A short answer-first description of this cab and its service..."
            value={form.overview}
            onChange={(e) => f('overview', e.target.value)}
          />
        </CMSSection>

        {/* Inclusions */}
        <CMSSection
          title="Inclusions"
          icon={<CheckCircle2 className="w-4 h-4" />}
          defaultOpen={false}
          badge={inclusions.length || undefined}
        >
          <div className="space-y-3 mt-1">
            {inclusions.map((item, idx) => (
              <div key={item.id} className="flex items-center gap-3">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <input
                  className={`${inp} flex-1`}
                  placeholder={`Inclusion ${idx + 1}`}
                  value={item.description}
                  onChange={(e) =>
                    setInclusions((p) =>
                      p.map((i) => (i.id === item.id ? { ...i, description: e.target.value } : i)),
                    )
                  }
                />
                <button
                  type="button"
                  className={removeBtn}
                  onClick={() => setInclusions((p) => p.filter((i) => i.id !== item.id))}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              className={addBtn}
              onClick={() => setInclusions((p) => [...p, { id: uid(), description: '' }])}
            >
              <Plus className="w-4 h-4" /> Add Inclusion
            </button>
          </div>
        </CMSSection>

        {/* Exclusions */}
        <CMSSection
          title="Exclusions"
          icon={<XCircle className="w-4 h-4" />}
          defaultOpen={false}
          badge={exclusions.length || undefined}
        >
          <div className="space-y-3 mt-1">
            {exclusions.map((item, idx) => (
              <div key={item.id} className="flex items-center gap-3">
                <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <input
                  className={`${inp} flex-1`}
                  placeholder={`Exclusion ${idx + 1}`}
                  value={item.description}
                  onChange={(e) =>
                    setExclusions((p) =>
                      p.map((i) => (i.id === item.id ? { ...i, description: e.target.value } : i)),
                    )
                  }
                />
                <button
                  type="button"
                  className={removeBtn}
                  onClick={() => setExclusions((p) => p.filter((i) => i.id !== item.id))}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              className={addBtn}
              onClick={() => setExclusions((p) => [...p, { id: uid(), description: '' }])}
            >
              <Plus className="w-4 h-4" /> Add Exclusion
            </button>
          </div>
        </CMSSection>

        {/* Media */}
        <CMSSection title="Media" defaultOpen={false}>
          <CMSMediaSection
            image={form.image}
            alt={form.alt}
            editorType="cab"
            onChange={(field, value) => f(field, value)}
          />
        </CMSSection>

        {/* SEO */}
        <CMSSection title="SEO" defaultOpen={false}>
          <CMSSeoSection
            metaTitle={form.metaTitle}
            metaDescription={form.metaDescription}
            onChange={f}
          />
        </CMSSection>

        {/* FAQs */}
        <CMSSection title="FAQs" defaultOpen={false} badge={faqs.length || undefined}>
          <FaqHandler faqs={faqs} setFaqs={setFaqs} />
        </CMSSection>

        <CMSActions
          status={form.status}
          isSaving={isSaving}
          isSubmitting={isSubmitting}
          onDraft={saveDraft}
          onStatusChange={(status) => setForm((p) => ({ ...p, status }))}
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
