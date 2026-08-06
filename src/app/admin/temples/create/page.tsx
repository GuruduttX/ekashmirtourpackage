'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlignLeft, MapPin, Clock, Route, Sparkles, ScrollText, Lightbulb, Plus, Trash2, Link2, IndianRupee, Image as ImageIcon,
} from 'lucide-react';

import CMSHeader from '@/components/admin/cms/CMSHeader';
import CMSSection from '@/components/admin/CMSSection';
import CMSMetaSection from '@/components/admin/cms/CMSMetaSection';
import CMSSeoSection from '@/components/admin/cms/CMSSeoSection';
import CMSMediaSection from '@/components/admin/cms/CMSMediaSection';
import CMSActions from '@/components/admin/cms/CMSActions';
import FaqHandler, { FaqItem } from '@/components/admin/cms/FaqHandler';
import TempleTimingsEditor from '@/components/admin/temples/TempleTimingsEditor';
import TempleDistancesEditor from '@/components/admin/temples/TempleDistancesEditor';
import TempleSartajTipsEditor from '@/components/admin/temples/TempleSartajTipsEditor';
import TempleRitualsEditor from '@/components/admin/temples/TempleRitualsEditor';
import TempleBestTimesEditor from '@/components/admin/temples/TempleBestTimesEditor';
import TempleTagsEditor from '@/components/admin/temples/TempleTagsEditor';
import type {
  ITempleSeasonTimings, ITempleDistance, ITempleSartajTip, ITempleGalleryImage,
  ITempleRitual, ITempleBestTime, ITempleTag,
} from '@/types/templeTypes';

// ─── Types ───────────────────────────────────────────────
interface NearbyPlace { id: string; name: string; link: string }

interface TempleForm {
  title: string; templeType: string; slug: string;
  deity: string; location: string;
  entryFeeINR: string; dressCode: string;
  stepsOrClimb: string; photographyNote: string; bestTimeToVisit: string;
  overview: string;
  howToReach: string; cabFareNote: string;
  ritualsDarshan: string; mainFestival: string;
  aboutTemple: string;
  history: string; mythology: string; significance: string;
  address: string;
  metaTitle: string; metaDescription: string;
  image: string; alt: string;
  status: 'draft' | 'published';
}

const TEMPLE_TYPES = ['Temple', 'Shrine', 'Mosque', 'Cave Shrine', 'Sufi Shrine'];

const INITIAL: TempleForm = {
  title: '', templeType: '', slug: '',
  deity: '', location: '',
  entryFeeINR: '', dressCode: '',
  stepsOrClimb: '', photographyNote: '', bestTimeToVisit: '',
  overview: '',
  howToReach: '', cabFareNote: '',
  ritualsDarshan: '', mainFestival: '',
  aboutTemple: '',
  history: '', mythology: '', significance: '',
  address: '',
  metaTitle: '', metaDescription: '',
  image: '', alt: '',
  status: 'draft',
};

interface Toast { id: number; message: string; type: 'success' | 'error' }

const STORAGE_KEY = 'cms_temple_create_draft';
const uid = () => crypto.randomUUID();
const slugify = (v: string) =>
  v.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';
const ta = `${inp} resize-y min-h-24`;
const label = 'text-sm text-slate-400 flex items-center gap-1.5';
const addBtn =
  'flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all';
const removeBtn =
  'p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0';

export default function CreateTemplePage() {
  const router = useRouter();

  const [form, setForm] = useState<TempleForm>(INITIAL);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([]);
  const [distances, setDistances] = useState<ITempleDistance[]>([]);
  const [seasonalTimings, setSeasonalTimings] = useState<ITempleSeasonTimings[]>([]);
  const [sartajTips, setSartajTips] = useState<ITempleSartajTip[]>([]);
  const [galleryImages, setGalleryImages] = useState<ITempleGalleryImage[]>([]);
  const [rituals, setRituals] = useState<ITempleRitual[]>([]);
  const [bestTimes, setBestTimes] = useState<ITempleBestTime[]>([]);
  const [tags, setTags] = useState<ITempleTag[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d.form) setForm(d.form);
        if (d.faqs) setFaqs(d.faqs);
        if (d.nearbyPlaces) setNearbyPlaces(d.nearbyPlaces);
        if (d.distances) setDistances(d.distances);
        if (d.seasonalTimings) setSeasonalTimings(d.seasonalTimings);
        if (d.sartajTips) setSartajTips(d.sartajTips);
        if (d.galleryImages) setGalleryImages(d.galleryImages);
        if (d.rituals) setRituals(d.rituals);
        if (d.bestTimes) setBestTimes(d.bestTimes);
        if (d.tags) setTags(d.tags);
      }
    } catch { /* ignore */ }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ form, faqs, nearbyPlaces, distances, seasonalTimings, sartajTips, galleryImages, rituals, bestTimes, tags }),
    );
  }, [form, faqs, nearbyPlaces, distances, seasonalTimings, sartajTips, galleryImages, rituals, bestTimes, tags, isLoaded]);

  const f = (field: string, value: string) => {
    setForm((prev) => {
      // CMSMetaSection emits the generic "category" field — map it to templeType here.
      const key = field === 'category' ? 'templeType' : field;
      const next = { ...prev, [key]: value } as TempleForm;
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
    title: form.title, templeType: form.templeType, slug: form.slug,
    deity: form.deity, location: form.location,
    entryFeeINR: Number(form.entryFeeINR) || 0, dressCode: form.dressCode,
    stepsOrClimb: form.stepsOrClimb, photographyNote: form.photographyNote,
    bestTimeToVisit: form.bestTimeToVisit,
    overview: form.overview,
    howToReach: form.howToReach, cabFareNote: form.cabFareNote,
    ritualsDarshan: form.ritualsDarshan, mainFestival: form.mainFestival,
    aboutTemple: form.aboutTemple,
    history: form.history, mythology: form.mythology, significance: form.significance,
    address: form.address,
    metaTitle: form.metaTitle, metaDescription: form.metaDescription,
    image: form.image, alt: form.alt,
    nearbyPlaces, faqs, distances, seasonalTimings, sartajTips, galleryImages,
    rituals, bestTimes, tags,
    status,
  });

  const post = async (status: 'draft' | 'published') => {
    const res = await fetch('/api/temples', {
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
      showToast('Temple published!', 'success');
      setTimeout(() => router.push('/admin/temples'), 1200);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to publish', 'error');
    } finally { setIsSubmitting(false); }
  };

  const saveDraft = async () => {
    setIsSaving(true);
    try {
      await post('draft');
      showToast('Saved as draft!', 'success');
      setTimeout(() => router.push('/admin/temples'), 1200);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save', 'error');
    } finally { setIsSaving(false); }
  };

  return (
    <div className="w-full py-8 pb-24">
      <CMSHeader editorType="Temple" />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Temple Details */}
        <CMSSection title="Temple Details" defaultOpen>
          <CMSMetaSection
            title={form.title}
            category={form.templeType}
            slug={form.slug}
            onChange={f}
            editorType="Temple"
            categories={TEMPLE_TYPES}
          />
        </CMSSection>

        {/* Quick Facts */}
        <CMSSection title="Quick Facts" icon={<Clock className="w-4 h-4" />} defaultOpen>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={label}><Sparkles className="w-3.5 h-3.5" /> Deity</label>
              <input className={`mt-2 ${inp}`} placeholder="e.g. Lord Shiva" value={form.deity} onChange={(e) => f('deity', e.target.value)} />
            </div>
            <div>
              <label className={label}><MapPin className="w-3.5 h-3.5" /> Location</label>
              <input className={`mt-2 ${inp}`} placeholder="e.g. Srinagar" value={form.location} onChange={(e) => f('location', e.target.value)} />
            </div>
            <div>
              <label className={label}><IndianRupee className="w-3.5 h-3.5" /> Entry Fee (₹, 0 = Free)</label>
              <input type="number" min={0} className={`mt-2 ${inp}`} placeholder="0" value={form.entryFeeINR} onChange={(e) => f('entryFeeINR', e.target.value)} />
            </div>
            <div>
              <label className={label}>Dress Code</label>
              <input className={`mt-2 ${inp}`} placeholder="e.g. Modest dress recommended" value={form.dressCode} onChange={(e) => f('dressCode', e.target.value)} />
            </div>
            <div>
              <label className={label}>Steps / Climb</label>
              <input className={`mt-2 ${inp}`} placeholder="e.g. ~243 steps or None" value={form.stepsOrClimb} onChange={(e) => f('stepsOrClimb', e.target.value)} />
            </div>
            <div>
              <label className={label}>Photography</label>
              <input className={`mt-2 ${inp}`} placeholder="e.g. Not allowed inside" value={form.photographyNote} onChange={(e) => f('photographyNote', e.target.value)} />
            </div>
            <div>
              <label className={label}>Best Time to Visit</label>
              <input className={`mt-2 ${inp}`} placeholder="e.g. April–October, mornings" value={form.bestTimeToVisit} onChange={(e) => f('bestTimeToVisit', e.target.value)} />
            </div>
          </div>
        </CMSSection>

        {/* Distances */}
        <CMSSection title="Distances" icon={<Route className="w-4 h-4" />} defaultOpen={false} badge={distances.length || undefined}>
          <TempleDistancesEditor distances={distances} setDistances={setDistances} />
        </CMSSection>

        {/* Temple Timings */}
        <CMSSection title="Temple Timings" icon={<Clock className="w-4 h-4" />} defaultOpen={false} badge={seasonalTimings.length || undefined}>
          <TempleTimingsEditor seasonalTimings={seasonalTimings} setSeasonalTimings={setSeasonalTimings} />
        </CMSSection>

        {/* Overview */}
        <CMSSection title="Overview" icon={<AlignLeft className="w-4 h-4" />} defaultOpen>
          <textarea
            className={ta}
            placeholder="A short 40-60 word answer-first description: timings, entry, distance, standout fact..."
            value={form.overview}
            onChange={(e) => f('overview', e.target.value)}
          />
        </CMSSection>

        {/* How to Reach */}
        <CMSSection title="How to Reach & Cab Fare" icon={<Route className="w-4 h-4" />} defaultOpen={false}>
          <div className="space-y-4">
            <div>
              <label className={label}>How to Reach</label>
              <textarea className={`mt-2 ${ta}`} placeholder="Route, road condition, nearest airport/city, parking notes..." value={form.howToReach} onChange={(e) => f('howToReach', e.target.value)} />
            </div>
            <div>
              <label className={label}>Cab Fare Note</label>
              <input className={`mt-2 ${inp}`} placeholder="e.g. Covered by Srinagar sightseeing cab, ~₹1,800–2,500" value={form.cabFareNote} onChange={(e) => f('cabFareNote', e.target.value)} />
            </div>
          </div>
        </CMSSection>

        {/* Rituals & Festival */}
        <CMSSection title="Rituals, Darshan & Festival" icon={<Sparkles className="w-4 h-4" />} defaultOpen={false}>
          <div className="space-y-4">
            <div>
              <label className={label}>Rituals / Darshan</label>
              <textarea className={`mt-2 ${ta}`} placeholder="What pilgrims do here — darshan process, rituals, offerings..." value={form.ritualsDarshan} onChange={(e) => f('ritualsDarshan', e.target.value)} />
            </div>
            <div>
              <label className={label}>Main Festival</label>
              <input className={`mt-2 ${inp}`} placeholder="e.g. Maha Shivaratri" value={form.mainFestival} onChange={(e) => f('mainFestival', e.target.value)} />
            </div>
          </div>
        </CMSSection>

        {/* About the Temple */}
        <CMSSection title="About the Temple" icon={<AlignLeft className="w-4 h-4" />} defaultOpen>
          <div className="space-y-4">
            <div>
              <label className={label}>About</label>
              <textarea className={`mt-2 ${ta}`} placeholder="Long-form description shown in the 'About the Temple' card..." value={form.aboutTemple} onChange={(e) => f('aboutTemple', e.target.value)} />
            </div>
            <div>
              <label className={label}>Tags</label>
              <div className="mt-2">
                <TempleTagsEditor tags={tags} setTags={setTags} />
              </div>
            </div>
          </div>
        </CMSSection>

        {/* History & Significance */}
        <CMSSection title="History & Significance" icon={<ScrollText className="w-4 h-4" />} defaultOpen={false}>
          <div className="space-y-4">
            <div>
              <label className={label}>History</label>
              <textarea className={`mt-2 ${ta}`} placeholder="Origin, age, who built it..." value={form.history} onChange={(e) => f('history', e.target.value)} />
            </div>
            <div>
              <label className={label}>Mythology</label>
              <textarea className={`mt-2 ${ta}`} placeholder="The legend / mythological story behind the temple..." value={form.mythology} onChange={(e) => f('mythology', e.target.value)} />
            </div>
            <div>
              <label className={label}>Significance</label>
              <textarea className={`mt-2 ${ta}`} placeholder="Why this temple matters to pilgrims today..." value={form.significance} onChange={(e) => f('significance', e.target.value)} />
            </div>
          </div>
        </CMSSection>

        {/* Rituals & Darshan */}
        <CMSSection title="Rituals & Darshan" icon={<Sparkles className="w-4 h-4" />} defaultOpen={false} badge={rituals.length || undefined}>
          <TempleRitualsEditor rituals={rituals} setRituals={setRituals} />
        </CMSSection>

        {/* Best Time to Visit */}
        <CMSSection title="Best Time to Visit" icon={<Clock className="w-4 h-4" />} defaultOpen={false} badge={bestTimes.length || undefined}>
          <TempleBestTimesEditor bestTimes={bestTimes} setBestTimes={setBestTimes} />
        </CMSSection>

        {/* Temple Information */}
        <CMSSection title="Temple Information" icon={<MapPin className="w-4 h-4" />} defaultOpen={false}>
          <div>
            <label className={label}>Address</label>
            <input className={`mt-2 ${inp}`} placeholder="e.g. Katra, Jammu & Kashmir" value={form.address} onChange={(e) => f('address', e.target.value)} />
          </div>
        </CMSSection>

        {/* Sartaj's Tips */}
        <CMSSection title="Sartaj's Tips" icon={<Lightbulb className="w-4 h-4" />} defaultOpen={false} badge={sartajTips.length || undefined}>
          <TempleSartajTipsEditor tips={sartajTips} setTips={setSartajTips} />
        </CMSSection>

        {/* Nearby Places */}
        <CMSSection title="Nearby Places" icon={<Link2 className="w-4 h-4" />} defaultOpen={false} badge={nearbyPlaces.length || undefined}>
          <div className="space-y-3 mt-1">
            {nearbyPlaces.map((item, idx) => (
              <div key={item.id} className="flex items-center gap-3">
                <input
                  className={`${inp} flex-1`}
                  placeholder={`Place name ${idx + 1}`}
                  value={item.name}
                  onChange={(e) => setNearbyPlaces((p) => p.map((i) => (i.id === item.id ? { ...i, name: e.target.value } : i)))}
                />
                <input
                  className={`${inp} flex-1`}
                  placeholder="/destinations/srinagar/"
                  value={item.link}
                  onChange={(e) => setNearbyPlaces((p) => p.map((i) => (i.id === item.id ? { ...i, link: e.target.value } : i)))}
                />
                <button type="button" className={removeBtn} onClick={() => setNearbyPlaces((p) => p.filter((i) => i.id !== item.id))}>
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button type="button" className={addBtn} onClick={() => setNearbyPlaces((p) => [...p, { id: uid(), name: '', link: '' }])}>
              <Plus className="w-4 h-4" /> Add Nearby Place
            </button>
          </div>
        </CMSSection>

        {/* Media */}
        <CMSSection title="Media" defaultOpen={false}>
          <CMSMediaSection
            image={form.image}
            alt={form.alt}
            editorType="temple"
            onChange={(field, value) => f(field, value)}
          />
        </CMSSection>

        {/* Gallery Images */}
        <CMSSection title="Gallery Images" icon={<ImageIcon className="w-4 h-4" />} defaultOpen={false} badge={galleryImages.length || undefined}>
          <div className="space-y-4 mt-1">
            {galleryImages.map((img) => (
              <div key={img.id} className="rounded-xl border border-[#19315d]/40 bg-[#07111f]/60 p-4 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#19315d]/40">
                  <span className="text-sm text-slate-400 font-medium">Gallery Image</span>
                  <button type="button" className={removeBtn} onClick={() => setGalleryImages((p) => p.filter((i) => i.id !== img.id))}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <CMSMediaSection
                  image={img.image}
                  alt={img.alt}
                  editorType="temple"
                  onChange={(field, value) =>
                    setGalleryImages((p) => p.map((i) => (i.id === img.id ? { ...i, [field]: value } : i)))
                  }
                />
              </div>
            ))}
            <button type="button" className={addBtn} onClick={() => setGalleryImages((p) => [...p, { id: uid(), image: '', alt: '' }])}>
              <Plus className="w-4 h-4" /> Add Gallery Image
            </button>
          </div>
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
