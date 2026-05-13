'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid,
  List,
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  BookOpen,
  SortDesc,
  SortAsc,
  Tag,
  Filter,
  X,
  CalendarDays,
  AlertTriangle,
} from 'lucide-react';
import CountUp from '@/utils/CountUp';

// ─── Kashmir Blog Categories ───────────────────────────
const BLOG_CATEGORIES = [
  'Gulmarg Guide',
  'Dal Lake Guide',
  'Pahalgam Guide',
  'Sonamarg Guide',
  'Srinagar Guide',
  'Kashmir Travel Tips',
  'Things to Do in Kashmir',
  'Kashmir Adventure',
  'Kashmir Culture & Heritage',
  'Food in Kashmir',
  'Hotels in Kashmir',
  'Tour Packages Guide',
  'Kashmir Photography',
  'Winter in Kashmir',
  'Kashmir Wildlife',
  'Budget Travel Kashmir',
  'Luxury Kashmir',
  'Festivals & Events',
  'Travel Guides',
  'Latest Updates',
];

// ─── Types ──────────────────────────────────────────────
interface Blog {
  _id: string;
  title: string;
  category: string;
  author: string;
  slug: string;
  image: string;
  subContent: string;
  status: 'draft' | 'published';
  createdAt?: string;
}

// ─── Delete Modal ────────────────────────────────────────
function DeleteModal({
  open,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-[#0b1730] border border-[#19315d]/50 rounded-2xl p-6 max-w-sm w-full shadow-2xl shadow-black/50"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-600/25 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-base">Delete Blog?</h3>
                <p className="text-slate-500 text-xs">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-6 pl-1">
              The blog post will be permanently removed from the database.
            </p>
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 bg-[#0f1e3a] border border-[#19315d]/50 hover:text-white hover:bg-[#13254b] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-500 disabled:bg-red-800 disabled:cursor-not-allowed transition-all"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Toast ───────────────────────────────────────────────
function Toast({ msg, type }: { msg: string; type: 'ok' | 'err' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, x: 12 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className={`fixed top-24 right-6 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-xl border ${
        type === 'ok'
          ? 'bg-emerald-600/90 text-white border-emerald-500/40'
          : 'bg-red-600/90 text-white border-red-500/40'
      }`}
    >
      {msg}
    </motion.div>
  );
}

// ─── Stat Card ───────────────────────────────────────────
function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-[#0b1730] border border-[#19315d]/40 rounded-2xl p-5 hover:-translate-y-0.5 transition-transform duration-200">
      <p className={`text-sm font-medium mb-1 ${color}`}>{title}</p>
      <h2 className="text-2xl font-bold text-white">
        <CountUp end={value} duration={1200} />
      </h2>
    </div>
  );
}

// ─── Card View ──────────────────────────────────────────
function BlogCards({
  blogs,
  onDelete,
}: {
  blogs: Blog[];
  onDelete: (id: string) => void;
}) {
  return (
    <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))' }}>
      {blogs.map((blog, idx) => (
        <motion.div
          key={blog._id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.04, duration: 0.3, ease: 'easeOut' }}
          className="group relative rounded-2xl overflow-hidden bg-[#0b1730] border border-[#19315d]/40 hover:-translate-y-1 hover:border-[#244278]/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300"
        >
          {/* Status badge */}
          <span
            className={`absolute top-3 right-3 z-10 px-2.5 py-1 text-[11px] font-semibold rounded-full border ${
              blog.status === 'published'
                ? 'bg-emerald-900/70 text-emerald-300 border-emerald-700/50 backdrop-blur-sm'
                : 'bg-amber-900/70 text-amber-300 border-amber-700/50 backdrop-blur-sm'
            }`}
          >
            {blog.status}
          </span>

          {/* Image */}
          <div className="h-44 overflow-hidden bg-[#07111f]">
            {blog.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-slate-700" />
              </div>
            )}
          </div>

          {/* Body */}
          <div className="p-4">
            <h3 className="text-white font-semibold text-sm leading-snug mb-2 line-clamp-2">
              {blog.title}
            </h3>

            {blog.subContent && (
              <p className="text-slate-500 text-xs line-clamp-2 mb-3">{blog.subContent}</p>
            )}

            <div className="flex items-center justify-between text-[11px] text-slate-600 mb-4">
              <span className="flex items-center gap-1.5">
                <Tag className="w-3 h-3" />
                {blog.category || '—'}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-3 h-3" />
                {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
              </span>
            </div>

            <div className="flex gap-2">
              <Link
                href={`/admin/blogs/${blog._id}/edit`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium bg-blue-600/10 text-blue-400 border border-blue-600/20 hover:bg-blue-600/20 hover:border-blue-500/40 transition-all"
              >
                <Pencil className="w-3 h-3" />
                Edit
              </Link>
              <button
                onClick={() => onDelete(blog._id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium bg-red-600/10 text-red-400 border border-red-600/20 hover:bg-red-600/20 hover:border-red-500/40 transition-all"
              >
                <Trash2 className="w-3 h-3" />
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Table View ─────────────────────────────────────────
function BlogTable({
  blogs,
  onDelete,
}: {
  blogs: Blog[];
  onDelete: (id: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-[#19315d]/50 bg-[#0b1730]/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#19315d]/40">
              <th className="text-left px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Blog
              </th>
              <th className="text-left px-4 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest hidden md:table-cell">
                Category
              </th>
              <th className="text-left px-4 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest hidden lg:table-cell">
                Author
              </th>
              <th className="text-center px-4 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Status
              </th>
              <th className="text-left px-4 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest hidden lg:table-cell">
                Created
              </th>
              <th className="text-right px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#19315d]/25">
            {blogs.map((blog, idx) => (
              <motion.tr
                key={blog._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.03 }}
                className="hover:bg-[#0f1e3a]/40 transition-colors"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    {blog.image && (
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#07111f] shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={blog.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate max-w-50">
                        {blog.title}
                      </p>
                      <p className="text-slate-600 text-xs truncate max-w-50">
                        /blog/{blog.slug}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 hidden md:table-cell">
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                    <Tag className="w-3 h-3 text-slate-600" />
                    {blog.category || '—'}
                  </span>
                </td>
                <td className="px-4 py-3.5 hidden lg:table-cell">
                  <span className="text-slate-400 text-sm">{blog.author || '—'}</span>
                </td>
                <td className="px-4 py-3.5 text-center">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${
                      blog.status === 'published'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}
                  >
                    {blog.status === 'published' ? (
                      <Eye className="w-3 h-3" />
                    ) : (
                      <EyeOff className="w-3 h-3" />
                    )}
                    {blog.status}
                  </span>
                </td>
                <td className="px-4 py-3.5 hidden lg:table-cell">
                  <span className="text-slate-500 text-xs">
                    {blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '—'}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2 justify-end">
                    <Link
                      href={`/admin/blogs/${blog._id}/edit`}
                      className="p-2 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-600/10 transition-all"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => onDelete(blog._id)}
                      className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-600/10 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────
export default function BlogsPage() {
  const [view, setView] = useState<'card' | 'table'>('card');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sort, setSort] = useState<'latest' | 'oldest'>('latest');

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedId, setSelectedId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  const showToast = (msg: string, type: 'ok' | 'err') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  // ── Fetch ──
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/blogs', { cache: 'no-store' });
      const data = await res.json();
      setBlogs(data.blogs ?? []);
    } catch {
      showToast('Failed to load blogs', 'err');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ── Delete ──
  const openDelete = (id: string) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/blogs/${selectedId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Delete failed');
      setBlogs((prev) => prev.filter((b) => b._id !== selectedId));
      showToast('Blog deleted successfully', 'ok');
      setModalOpen(false);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Delete failed', 'err');
    } finally {
      setIsDeleting(false);
    }
  };

  // ── Filter + Sort ──
  const filtered = blogs
    .filter((b) => {
      const q = search.toLowerCase();
      const matchSearch =
        b.title.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        (b.author ?? '').toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || b.status === statusFilter;
      const matchCat = categoryFilter === 'all' || b.category === categoryFilter;
      return matchSearch && matchStatus && matchCat;
    })
    .sort((a, b) => {
      const ta = new Date(a.createdAt ?? 0).getTime();
      const tb = new Date(b.createdAt ?? 0).getTime();
      return sort === 'latest' ? tb - ta : ta - tb;
    });

  // ── Stats ──
  const total = blogs.length;
  const published = blogs.filter((b) => b.status === 'published').length;
  const drafts = blogs.filter((b) => b.status === 'draft').length;

  // ── Select styles ──
  const selectCls =
    'px-3 py-2 bg-[#0b1730] border border-[#19315d]/50 rounded-xl text-slate-300 text-sm focus:outline-none focus:border-blue-500/50 cursor-pointer appearance-none pr-8';

  return (
    <section className="min-h-screen pb-16">
      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast msg={toast.msg} type={toast.type} />}
      </AnimatePresence>

      {/* Delete Modal */}
      <DeleteModal
        open={modalOpen}
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
        isDeleting={isDeleting}
      />

      {/* ── Header ── */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-blue-50">Blog Management</h1>
        <p className="text-sm text-blue-300/50 mt-0.5">Advanced CMS dashboard</p>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard title="Total" value={total} color="text-blue-400" />
        <StatCard title="Published" value={published} color="text-emerald-400" />
        <StatCard title="Drafts" value={drafts} color="text-amber-400" />
      </div>

      {/* ── Controls ── */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-50">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#0b1730] border border-[#19315d]/50 rounded-xl text-slate-300 text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status filter */}
        <div className="relative">
          <Eye className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`${selectCls} pl-9`}
          >
            <option value="all" className="bg-[#0b1730]">All Status</option>
            <option value="published" className="bg-[#0b1730]">Published</option>
            <option value="draft" className="bg-[#0b1730]">Draft</option>
          </select>
        </div>

        {/* Category filter */}
        <div className="relative">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={`${selectCls} pl-9 max-w-45`}
          >
            <option value="all" className="bg-[#0b1730]">All Categories</option>
            {BLOG_CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="bg-[#0b1730]">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="relative">
          {sort === 'latest' ? (
            <SortDesc className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          ) : (
            <SortAsc className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          )}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as 'latest' | 'oldest')}
            className={`${selectCls} pl-9`}
          >
            <option value="latest" className="bg-[#0b1730]">Latest</option>
            <option value="oldest" className="bg-[#0b1730]">Oldest</option>
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-[#0b1730] border border-[#19315d]/50 rounded-xl p-1 gap-1">
          <button
            onClick={() => setView('card')}
            className={`p-2 rounded-lg transition-all ${
              view === 'card'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-600/25'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setView('table')}
            className={`p-2 rounded-lg transition-all ${
              view === 'table'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-600/25'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <List size={15} />
          </button>
        </div>

        {/* Create Blog */}
        <Link
          href="/admin/blogs/create"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/30"
        >
          <Plus className="w-4 h-4" />
          New Blog
        </Link>
      </div>

      {/* ── Filter summary ── */}
      {(search || statusFilter !== 'all' || categoryFilter !== 'all') && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-xs text-slate-500 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
          {search && (
            <span className="flex items-center gap-1.5 text-xs bg-blue-600/10 text-blue-400 border border-blue-600/20 px-2.5 py-1 rounded-full">
              &quot;{search}&quot;
              <button onClick={() => setSearch('')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {statusFilter !== 'all' && (
            <span className="flex items-center gap-1.5 text-xs bg-[#0f1e3a] text-slate-400 border border-[#19315d]/40 px-2.5 py-1 rounded-full">
              {statusFilter}
              <button onClick={() => setStatusFilter('all')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {categoryFilter !== 'all' && (
            <span className="flex items-center gap-1.5 text-xs bg-[#0f1e3a] text-slate-400 border border-[#19315d]/40 px-2.5 py-1 rounded-full">
              {categoryFilter}
              <button onClick={() => setCategoryFilter('all')}><X className="w-3 h-3" /></button>
            </span>
          )}
        </div>
      )}

      {/* ── Content ── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-28 gap-4">
          <div className="w-8 h-8 border-2 border-[#19315d] border-t-blue-500 rounded-full animate-spin" />
          <p className="text-slate-600 text-sm">Loading blogs...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-28 gap-3 text-slate-600">
          <BookOpen className="w-10 h-10" />
          <p className="text-sm font-medium">No blogs found</p>
          {blogs.length === 0 ? (
            <Link
              href="/admin/blogs/create"
              className="mt-1 text-blue-400 text-sm hover:underline"
            >
              Create your first blog →
            </Link>
          ) : (
            <button
              onClick={() => {
                setSearch('');
                setStatusFilter('all');
                setCategoryFilter('all');
              }}
              className="mt-1 text-blue-400 text-sm hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : view === 'card' ? (
        <BlogCards blogs={filtered} onDelete={openDelete} />
      ) : (
        <BlogTable blogs={filtered} onDelete={openDelete} />
      )}
    </section>
  );
}
