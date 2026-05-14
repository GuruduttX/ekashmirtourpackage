'use client';

import { useState, useEffect, useCallback, FormEvent, use } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

import CMSHeader from '@/components/admin/cms/CMSHeader';
import CMSMetaSection from '@/components/admin/cms/CMSMetaSection';
import CMSSeoSection from '@/components/admin/cms/CMSSeoSection';
import CMSSchema from '@/components/admin/cms/CMSSchema';
import CMSMediaSection from '@/components/admin/cms/CMSMediaSection';
import CMSContentSection from '@/components/admin/cms/CMSContentSection';
import CMSActions from '@/components/admin/cms/CMSActions';
import FaqHandler, { FaqItem } from '@/components/admin/cms/FaqHandler';
import CMSSection from '@/components/admin/CMSSection';


interface FormState {
  title: string;
  category: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  schemaTitle: string;
  schemaDescription: string;
  author: string;
  image: string;
  alt: string;
  subContent: string;
  content: string;
  status: 'draft' | 'published';
}

const EMPTY: FormState = {
  title: '',
  category: '',
  slug: '',
  metaTitle: '',
  author: '',
  metaDescription: '',
  schemaTitle: '',
  schemaDescription: '',
  image: '',
  alt: '',
  subContent: '',
  content: '',
  status: 'draft',
};

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}


export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [form, setForm] = useState<FormState>(EMPTY);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);


 

  // Fetch blog data on mount
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) throw new Error('Not found');
        const { blog } = await res.json();

        setForm({
          title: blog.title ?? '',
          category: blog.category ?? '',
          slug: blog.slug ?? '',
          author: blog.author ?? '',
          metaTitle: blog.meta?.title ?? '',
          metaDescription: blog.meta?.description ?? '',
          schemaTitle: blog.structuredData?.title ?? '',
          schemaDescription: blog.structuredData?.description ?? '',
          image: blog.image ?? '',
          alt: blog.alt ?? '',
          subContent: blog.subContent ?? '',
          content: blog.content ?? '',
          status: blog.status ?? 'draft',
        });

        setFaqs(
          (blog.faqs ?? []).map((f: { id?: string; question: string; answer: string }) => ({
            id: f.id ?? crypto.randomUUID(),
            question: f.question,
            answer: f.answer,
          }))
        );
      } catch {
        showToast('Failed to load blog data', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  };

  const handleChange = useCallback((field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const buildPayload = (overrideStatus?: 'draft' | 'published') => ({
    title: form.title,
    category: form.category,
    slug: form.slug,
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
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload()),
      });
      if (!res.ok) throw new Error(await res.text());
      showToast('Blog updated successfully!', 'success');
      setTimeout(() => router.push('/admin/blogs'), 1200);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Update failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload('draft')),
      });
      if (!res.ok) throw new Error(await res.text());
      showToast('Saved as draft!', 'success');
      setTimeout(() => router.push('/admin/blogs'), 1200);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Save failed', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8 flex items-center justify-center min-h-64">
        <div className="flex flex-col items-center gap-4 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-sm">Loading blog data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 pb-24">
      <CMSHeader editorType="Blog" />

      <form onSubmit={submit} className="space-y-6">
        <CMSSection title="Post Details" defaultOpen>
          <CMSMetaSection
            title={form.title}
            category={form.category}
            author={form.author}
            slug={form.slug}
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
