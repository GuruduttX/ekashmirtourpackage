'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Pencil, Trash2, Eye, Clock,
  Star, AlertTriangle, X, Filter,
} from 'lucide-react';
import CountUp from '@/utils/CountUp';

// ─── Types ──────────────────────────────────────────────
interface DurationHubItem {
  _id: string;
  slug: string;
  days: number;
  nights: number;
  title: string;
  status: 'draft' | 'published';
  rating: number;
  reviewsCount: number;
  heroImage?: { image: string; alt: string };
  createdAt?: string;
}

// ─── Delete Modal ────────────────────────────────────────
function DeleteModal({
  open, onConfirm, onCancel, isDeleting,
}: { open: boolean; onConfirm: () => void; onCancel: () => void; isDeleting: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
                <h3 className="text-white font-semibold text-base">Delete Duration Hub?</h3>
                <p className="text-slate-500 text-xs">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-6 pl-1">
              The duration hub page will be permanently removed from the database.
            </p>
            <div className="flex gap-3">
              <button onClick={onCancel}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 bg-[#0f1e3a] border border-[#19315d]/50 hover:text-white hover:bg-[#13254b] transition-all">
                Cancel
              </button>
              <button onClick={onConfirm} disabled={isDeleting}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-500 disabled:bg-red-800 disabled:cursor-not-allowed transition-all">
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
      initial={{ opacity: 0, y: 12, x: 12 }} animate={{ opacity: 1, y: 0, x: 0 }} exit={{ opacity: 0, y: -8 }}
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
function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <div className="bg-[#0b1730] border border-[#19315d]/40 rounded-2xl p-5 hover:-translate-y-0.5 transition-transform duration-200">
      <p className={`text-sm font-medium mb-1 ${color}`}>{title}</p>
      <h2 className="text-2xl font-bold text-white">
        <CountUp end={value} duration={1200} />
      </h2>
    </div>
  );
}

// ─── Cards ───────────────────────────────────────────────
function HubCards({ hubs, onDelete }: { hubs: DurationHubItem[]; onDelete: (id: string) => void }) {
  return (
    <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
      {hubs.map((hub, idx) => (
        <motion.div
          key={hub._id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.04, duration: 0.3, ease: 'easeOut' }}
          className="group relative rounded-2xl overflow-hidden bg-[#0b1730] border border-[#19315d]/40
            hover:-translate-y-1 hover:border-[#244278]/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]
            transition-all duration-300"
        >
          <span className={`absolute top-3 right-3 z-10 px-2.5 py-1 text-[11px] font-semibold rounded-full border backdrop-blur-sm ${
            hub.status === 'published'
              ? 'bg-emerald-900/70 text-emerald-300 border-emerald-700/50'
              : 'bg-amber-900/70 text-amber-300 border-amber-700/50'
          }`}>
            {hub.status}
          </span>

          <div className="h-44 overflow-hidden bg-[#07111f]">
            {hub.heroImage?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={hub.heroImage.image}
                alt={hub.heroImage.alt || hub.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-slate-700" />
              </div>
            )}
          </div>

          <div className="p-4">
            <h3 className="text-white font-semibold text-sm leading-snug mb-2 line-clamp-2">
              {hub.title || `${hub.days} Days ${hub.nights} Nights`}
            </h3>

            <div className="flex flex-wrap gap-x-3 gap-y-1.5 mb-4 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 shrink-0" /> {hub.days}D / {hub.nights}N
              </span>
              {hub.rating > 0 && (
                <span className="flex items-center gap-1 text-amber-400/80">
                  <Star className="w-3 h-3 shrink-0 fill-amber-400/60" />
                  {hub.rating.toFixed(1)}
                  {hub.reviewsCount > 0 && <span className="text-slate-600">({hub.reviewsCount})</span>}
                </span>
              )}
              <span className="text-slate-600">/{hub.slug}</span>
            </div>

            <div className="flex gap-2">
              <Link
                href={`/admin/duration-hubs/${hub._id}/edit`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium
                  bg-blue-600/10 text-blue-400 border border-blue-600/20
                  hover:bg-blue-600/20 hover:border-blue-500/40 transition-all"
              >
                <Pencil className="w-3 h-3" /> Edit
              </Link>
              <button
                onClick={() => onDelete(hub._id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium
                  bg-red-600/10 text-red-400 border border-red-600/20
                  hover:bg-red-600/20 hover:border-red-500/40 transition-all"
              >
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────
export default function DurationHubsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [hubs, setHubs] = useState<DurationHubItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  const showToast = (msg: string, type: 'ok' | 'err') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const fetchHubs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/duration-hubs', { cache: 'no-store' });
      const data = await res.json();
      setHubs(data.durationHubs ?? []);
    } catch {
      showToast('Failed to load duration hubs', 'err');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHubs(); }, []);

  const openDelete = (id: string) => { setSelectedId(id); setModalOpen(true); };

  const handleDelete = async () => {
    if (!selectedId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/duration-hubs/${selectedId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setHubs((prev) => prev.filter((h) => h._id !== selectedId));
      showToast('Duration hub deleted successfully', 'ok');
      setModalOpen(false);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Delete failed', 'err');
    } finally {
      setIsDeleting(false);
    }
  };

  const filtered = hubs.filter((h) => {
    const q = search.toLowerCase();
    const matchSearch =
      h.title.toLowerCase().includes(q) ||
      h.slug.toLowerCase().includes(q) ||
      `${h.days}`.includes(q) ||
      `${h.nights}`.includes(q);
    const matchStatus = statusFilter === 'all' || h.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const total = hubs.length;
  const published = hubs.filter((h) => h.status === 'published').length;
  const drafts = hubs.filter((h) => h.status === 'draft').length;

  const selectCls =
    'px-3 py-2 bg-[#0b1730] border border-[#19315d]/50 rounded-xl text-slate-300 text-sm focus:outline-none focus:border-blue-500/50 cursor-pointer appearance-none pr-8 transition-all';

  const activeFilters = search || statusFilter !== 'all';

  return (
    <section className="min-h-screen pb-16">
      <AnimatePresence>{toast && <Toast msg={toast.msg} type={toast.type} />}</AnimatePresence>
      <DeleteModal open={modalOpen} onConfirm={handleDelete} onCancel={() => setModalOpen(false)} isDeleting={isDeleting} />

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-blue-50">Duration Hub Management</h1>
        <p className="text-sm text-blue-300/50 mt-0.5">Duration-based landing pages</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard title="Total" value={total} color="text-blue-400" />
        <StatCard title="Published" value={published} color="text-emerald-400" />
        <StatCard title="Drafts" value={drafts} color="text-amber-400" />
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-52">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            placeholder="Search by title, slug, days..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#0b1730] border border-[#19315d]/50 rounded-xl text-slate-300 text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
          />
          {search && (
            <button onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="relative">
          <Eye className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className={`${selectCls} pl-9`}>
            <option value="all" className="bg-[#0b1730]">All Status</option>
            <option value="published" className="bg-[#0b1730]">Published</option>
            <option value="draft" className="bg-[#0b1730]">Draft</option>
          </select>
        </div>

        <Link
          href="/admin/duration-hubs/create"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/30"
        >
          <Plus className="w-4 h-4" />
          New Duration Hub
        </Link>
      </div>

      {activeFilters && (
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
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-28 gap-4">
          <div className="w-8 h-8 border-2 border-[#19315d] border-t-blue-500 rounded-full animate-spin" />
          <p className="text-slate-600 text-sm">Loading duration hubs...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-28 gap-3 text-slate-600">
          <Clock className="w-10 h-10" />
          <p className="text-sm font-medium">No duration hubs found</p>
          {hubs.length === 0 ? (
            <Link href="/admin/duration-hubs/create" className="mt-1 text-blue-400 text-sm hover:underline">
              Create your first duration hub →
            </Link>
          ) : (
            <button onClick={() => { setSearch(''); setStatusFilter('all'); }}
              className="mt-1 text-blue-400 text-sm hover:underline">
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <HubCards hubs={filtered} onDelete={openDelete} />
      )}
    </section>
  );
}
