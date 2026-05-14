'use client';

import { useState, useEffect, useCallback, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

import CMSHeader from '@/components/admin/cms/CMSHeader';
import CMSMetaSection from '@/components/admin/cms/CMSMetaSection';
import CMSSeoSection from '@/components/admin/cms/CMSSeoSection';
import CMSSchema from '@/components/admin/cms/CMSSchema';
import CMSMediaSection from '@/components/admin/cms/CMSMediaSection';
import CMSContentSection from '@/components/admin/cms/CMSContentSection';
import CMSActions from '@/components/admin/cms/CMSActions';
import FaqHandler, { FaqItem } from '@/components/admin/cms/FaqHandler';
import CMSSection from '@/components/admin/CMSSection';

const STORAGE_KEY = 'cms_blog_create_draft';

interface FormState {
  title: string;
  category: string;
  author: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  schemaTitle: string;
  schemaDescription: string;
  image: string;
  alt: string;
  subContent: string;
  content: string;
  status: "draft" | "published";
}

const INITIAL: FormState = {
  title: "",
  category: "",
  slug: "",
  author: "",
  metaTitle: "",
  metaDescription: "",
  schemaTitle: "",
  schemaDescription: "",
  image: "",
  alt: "",
  subContent: "",
  content: "",
  status: "draft",
};

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

export default function CreateBlogPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Read from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.form) setForm(saved.form);
        if (saved.faqs) setFaqs(saved.faqs);
      }
    } catch {
      // ignore corrupt data
    }
    setIsLoaded(true);
  }, []);

  // Write to localStorage only after initial load
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, faqs }));
  }, [form, faqs, isLoaded]);

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  };

  const handleChange = useCallback((field: string, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'title') {
        next.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-');
      }
      return next;
    });
  }, []);

  const buildPayload = (overrideStatus?: 'draft' | 'published') => ({
    title: form.title,
    category: form.category,
    slug: form.slug,
    author: form.author,
    meta: { title: form.metaTitle, description: form.metaDescription },
    structuredData: { title: form.schemaTitle, description: form.schemaDescription },
    image: form.image,
    alt: form.alt,
    subContent: form.subContent,
    content: form.content,
    faqs,
    status: overrideStatus ?? form.status,
  });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload()),
      });
      if (!res.ok) throw new Error(await res.text());
      localStorage.removeItem(STORAGE_KEY);
      showToast('Blog published successfully!', 'success');
      setTimeout(() => router.push('/admin/blogs'), 1200);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to publish', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload('draft')),
      });
      if (!res.ok) throw new Error(await res.text());
      localStorage.removeItem(STORAGE_KEY);
      showToast('Saved as draft!', 'success');
      setTimeout(() => router.push('/admin/blogs'), 1200);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save draft', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full py-8 pb-24">
      <CMSHeader editorType="Blog" />

      <form onSubmit={submit} className="space-y-6">
        <CMSSection title="Post Details" defaultOpen>
          <CMSMetaSection
            title={form.title}
            category={form.category}
            slug={form.slug}
            author={form.author}
            onChange={handleChange}
            editorType="Blog"
          />
        </CMSSection>

        <CMSSection title="Featured Image">
          <CMSMediaSection image={form.image} alt={form.alt} onChange={handleChange} />
        </CMSSection>

        <CMSSection title="Content" defaultOpen>
          <CMSContentSection
            subContent={form.subContent}
            content={form.content}
            onChange={handleChange}
          />
        </CMSSection>

        <CMSSection title="FAQs">
          <FaqHandler faqs={faqs} setFaqs={setFaqs} />
        </CMSSection>

        <CMSSection title="SEO">
          <CMSSeoSection
            metaTitle={form.metaTitle}
            metaDescription={form.metaDescription}
            onChange={handleChange}
          />
        </CMSSection>

        <CMSSection title="Structured Data">
          <CMSSchema
            schemaTitle={form.schemaTitle}
            schemaDescription={form.schemaDescription}
            onChange={handleChange}
          />
        </CMSSection>

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
