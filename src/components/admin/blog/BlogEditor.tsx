'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Type,
  Image as ImageIcon,
  AlignLeft,
  Search,
  Code,
  MessageSquare,
  BookOpen,
} from 'lucide-react';
import CMSSection from '@/components/admin/CMSSection';
import CMSActions from '@/components/admin/CMSActions';
import FaqHandler from '@/components/admin/FaqHandler';

interface BlogFormData {
  title: string;
  category: string;
  slug: string;
  author: string;
  meta: { title: string; description: string };
  image: string;
  alt: string;
  subContent: string;
  content: string;
  structuredData: { title: string; description: string };
  faqs: Array<{ id: string; question: string; answer: string }>;
  status: 'draft' | 'published';
}

const EMPTY: BlogFormData = {
  title: '',
  category: '',
  slug: '',
  author: '',
  meta: { title: '', description: '' },
  image: '',
  alt: '',
  subContent: '',
  content: '',
  structuredData: { title: '', description: '' },
  faqs: [],
  status: 'draft',
};

const slugify = (v: string) =>
  v.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const input =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';
const textarea = `${input} min-h-[120px] resize-y`;
const label = 'block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide';

interface Props {
  initialData?: Partial<BlogFormData> | null;
  blogId?: string;
}

export default function BlogEditor({ initialData, blogId }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<BlogFormData>({ ...EMPTY, ...initialData });
  const [isSaving, setIsSaving] = useState(false);
  const [slugLocked, setSlugLocked] = useState(!!blogId);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  useEffect(() => {
    if (!slugLocked && form.title) {
      setForm((f) => ({ ...f, slug: slugify(f.title) }));
    }
  }, [form.title, slugLocked]);

  const set = <K extends keyof BlogFormData>(key: K, val: BlogFormData[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const setNested = <P extends 'meta' | 'structuredData'>(
    parent: P,
    key: keyof BlogFormData[P],
    val: string
  ) => setForm((f) => ({ ...f, [parent]: { ...f[parent], [key]: val } }));

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
      const url = blogId ? `/api/blogs/${blogId}` : '/api/blogs';
      const method = blogId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Failed to save');
      }
      showToast(blogId ? 'Blog updated.' : 'Blog created.', 'ok');
      if (!blogId) {
        const { blog } = await res.json();
        router.push(`/admin/blogs/${blog._id}/edit`);
      }
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : 'Error saving blog', 'err');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-28">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-xl bg-blue-600/15 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-blue-400" />
          </div>
          <h1 className="text-xl font-bold text-white">
            {blogId ? 'Edit Blog' : 'New Blog Post'}
          </h1>
        </div>
        <p className="text-slate-500 text-sm ml-11">
          {blogId ? 'Update blog content and settings' : 'Create a new blog article'}
        </p>
      </motion.div>

      {/* Sections */}
      <div className="space-y-4">
        {/* ── Basics ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.3 }}
        >
          <CMSSection title="Basics" icon={<Type className="w-4 h-4" />} defaultOpen>
            <div className="pt-4 space-y-4">
              {/* Title */}
              <div>
                <label className={label}>Title</label>
                <input
                  className={input}
                  placeholder="Blog post title..."
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                />
              </div>

              {/* Slug */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={label}>Slug</label>
                  <button
                    type="button"
                    onClick={() => setSlugLocked((v) => !v)}
                    className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {slugLocked ? 'Unlock' : 'Lock'}
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-sm select-none">
                    /blog/
                  </span>
                  <input
                    className={`${input} pl-14`}
                    placeholder="auto-generated-from-title"
                    value={form.slug}
                    readOnly={!slugLocked}
                    onChange={(e) => set('slug', slugify(e.target.value))}
                  />
                </div>
              </div>

              {/* Category + Author */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={label}>Category</label>
                  <input
                    className={input}
                    placeholder="e.g. Travel, Kashmir"
                    value={form.category}
                    onChange={(e) => set('category', e.target.value)}
                  />
                </div>
                <div>
                  <label className={label}>Author</label>
                  <input
                    className={input}
                    placeholder="Author name"
                    value={form.author}
                    onChange={(e) => set('author', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CMSSection>
        </motion.div>

        {/* ── Media ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.3 }}
        >
          <CMSSection title="Media" icon={<ImageIcon className="w-4 h-4" />} defaultOpen>
            <div className="pt-4 space-y-4">
              <div>
                <label className={label}>Cover Image URL</label>
                <input
                  className={input}
                  placeholder="https://images.unsplash.com/..."
                  value={form.image}
                  onChange={(e) => set('image', e.target.value)}
                />
              </div>
              {form.image && (
                <div className="rounded-xl overflow-hidden border border-[#19315d]/40 aspect-video relative bg-[#07111f]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.image} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <label className={label}>Alt Text</label>
                <input
                  className={input}
                  placeholder="Describe the image..."
                  value={form.alt}
                  onChange={(e) => set('alt', e.target.value)}
                />
              </div>
            </div>
          </CMSSection>
        </motion.div>

        {/* ── Content ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.11, duration: 0.3 }}
        >
          <CMSSection title="Content" icon={<AlignLeft className="w-4 h-4" />} defaultOpen>
            <div className="pt-4 space-y-4">
              <div>
                <label className={label}>Sub-Content (Excerpt)</label>
                <textarea
                  className={textarea}
                  placeholder="A short excerpt or subtitle for this post..."
                  value={form.subContent}
                  onChange={(e) => set('subContent', e.target.value)}
                />
              </div>
              <div>
                <label className={label}>Main Content (HTML)</label>
                <textarea
                  className={`${textarea} min-h-[280px] font-mono text-xs`}
                  placeholder="<p>Your blog content as HTML...</p>"
                  value={form.content}
                  onChange={(e) => set('content', e.target.value)}
                />
                <p className="text-[11px] text-slate-600 mt-1.5">
                  Accepts raw HTML. Use &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, &lt;strong&gt;, etc.
                </p>
              </div>
            </div>
          </CMSSection>
        </motion.div>

        {/* ── SEO ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.3 }}
        >
          <CMSSection
            title="SEO"
            icon={<Search className="w-4 h-4" />}
            defaultOpen={false}
          >
            <div className="pt-4 space-y-4">
              <div>
                <label className={label}>Meta Title</label>
                <input
                  className={input}
                  placeholder="SEO title (50–60 chars)"
                  value={form.meta.title}
                  onChange={(e) => setNested('meta', 'title', e.target.value)}
                />
                <p className="text-[11px] text-slate-600 mt-1">{form.meta.title.length}/60 chars</p>
              </div>
              <div>
                <label className={label}>Meta Description</label>
                <textarea
                  className={textarea}
                  placeholder="SEO description (150–160 chars)"
                  value={form.meta.description}
                  onChange={(e) => setNested('meta', 'description', e.target.value)}
                />
                <p className="text-[11px] text-slate-600 mt-1">
                  {form.meta.description.length}/160 chars
                </p>
              </div>

              {/* SEO Preview */}
              {(form.meta.title || form.meta.description) && (
                <div className="rounded-xl border border-[#19315d]/40 bg-[#07111f] p-4">
                  <p className="text-[11px] text-slate-500 mb-2 uppercase tracking-widest">
                    Search Preview
                  </p>
                  <p className="text-blue-400 text-sm font-medium truncate">
                    {form.meta.title || form.title || 'Page Title'}
                  </p>
                  <p className="text-emerald-600 text-xs mt-0.5">
                    ekashmirtours.com/blog/{form.slug || 'post-slug'}
                  </p>
                  <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                    {form.meta.description || 'Meta description will appear here...'}
                  </p>
                </div>
              )}
            </div>
          </CMSSection>
        </motion.div>

        {/* ── Structured Data ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.17, duration: 0.3 }}
        >
          <CMSSection
            title="Structured Data"
            icon={<Code className="w-4 h-4" />}
            defaultOpen={false}
          >
            <div className="pt-4 space-y-4">
              <div>
                <label className={label}>Schema Title</label>
                <input
                  className={input}
                  placeholder="Schema.org article title"
                  value={form.structuredData.title}
                  onChange={(e) => setNested('structuredData', 'title', e.target.value)}
                />
              </div>
              <div>
                <label className={label}>Schema Description</label>
                <textarea
                  className={textarea}
                  placeholder="Schema.org article description"
                  value={form.structuredData.description}
                  onChange={(e) => setNested('structuredData', 'description', e.target.value)}
                />
              </div>
            </div>
          </CMSSection>
        </motion.div>

        {/* ── FAQs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <CMSSection
            title="FAQs"
            icon={<MessageSquare className="w-4 h-4" />}
            defaultOpen={false}
            badge={form.faqs.length || undefined}
          >
            <div className="pt-4">
              <FaqHandler faqs={form.faqs} onChange={(faqs) => set('faqs', faqs)} />
            </div>
          </CMSSection>
        </motion.div>
      </div>

      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
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
        backHref="/admin/blogs"
        saveLabel={blogId ? 'Update Blog' : 'Create Blog'}
      />
    </div>
  );
}
