'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  CalendarDays,
  Eye,
  EyeOff,
  Filter,
  Link2,
  Lightbulb,
  MapPin,
  MessageCircleQuestion,
  Pencil,
  Plus,
  Search,
  SortAsc,
  SortDesc,
  Trash2,
  X,
} from 'lucide-react';
import CountUp from '@/utils/CountUp';

// ─── Types ──────────────────────────────────────────────
interface StayPlaceItem {
  _id: string;
  name: string;
  slug: string;
  placeKey: string;
  parentTown?: string;
  title: string;
  status: 'draft' | 'published';
  heroImage?: { image?: string; alt?: string };
  sartajTips?: unknown[];
  faqs?: unknown[];
  internalLinks?: unknown[];
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full max-w-sm rounded-2xl border border-[#19315d]/50 bg-[#0b1730] p-6 shadow-2xl shadow-black/50"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-600/25 bg-red-600/15">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Delete Place Page?</h3>
                <p className="text-xs text-slate-500">This action cannot be undone</p>
              </div>
            </div>
            <p className="mb-6 pl-1 text-sm text-slate-400">
              The page will 404 immediately. The stays themselves are not affected.
            </p>
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 rounded-xl border border-[#19315d]/50 bg-[#0f1e3a] px-4 py-2.5 text-sm font-medium text-slate-400 transition-all hover:bg-[#13254b] hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isDeleting}
                className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-800"
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
      className={`fixed right-6 top-24 z-50 rounded-xl border px-4 py-3 text-sm font-medium shadow-xl ${
        type === 'ok'
          ? 'border-emerald-500/40 bg-emerald-600/90 text-white'
          : 'border-red-500/40 bg-red-600/90 text-white'
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
  sub,
}: {
  title: string;
  value: number;
  color: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-[#19315d]/40 bg-[#0b1730] p-5 transition-transform duration-200 hover:-translate-y-0.5">
      <p className={`mb-1 text-sm font-medium ${color}`}>{title}</p>
      <h2 className="text-2xl font-bold text-white">
        <CountUp end={value} duration={1200} />
      </h2>
      {sub && <p className="mt-0.5 text-xs text-slate-600">{sub}</p>}
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────
export default function StayPlacesPage() {
  const [places, setPlaces] = useState<StayPlaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sort, setSort] = useState<'latest' | 'oldest' | 'name'>('latest');

  const [selectedId, setSelectedId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  const showToast = (msg: string, type: 'ok' | 'err') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  // Defined inside the effect so it has no stale-closure deps, and `loading`
  // starts true rather than being set synchronously in the effect body.
  useEffect(() => {
    let cancelled = false;

    const fetchPlaces = async () => {
      try {
        const res = await fetch('/api/stays/places', { cache: 'no-store' });
        const data = await res.json();
        if (!cancelled) setPlaces(data.places ?? []);
      } catch {
        if (!cancelled) setToast({ msg: 'Failed to load stay places', type: 'err' });
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPlaces();
    return () => {
      cancelled = true;
    };
  }, []);

  const openDelete = (id: string) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/stays/places/${selectedId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setPlaces((prev) => prev.filter((p) => p._id !== selectedId));
      showToast('Place page deleted', 'ok');
      setModalOpen(false);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Delete failed', 'err');
    } finally {
      setIsDeleting(false);
    }
  };

  const filtered = places
    .filter((p) => {
      const q = search.toLowerCase();
      const matchSearch =
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.parentTown ?? '').toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      const ta = new Date(a.createdAt ?? 0).getTime();
      const tb = new Date(b.createdAt ?? 0).getTime();
      return sort === 'latest' ? tb - ta : ta - tb;
    });

  const total = places.length;
  const published = places.filter((p) => p.status === 'published').length;
  const drafts = places.filter((p) => p.status === 'draft').length;
  const missingCopy = places.filter(
    (p) => !p.sartajTips?.length || !p.faqs?.length,
  ).length;

  const selectCls =
    'px-3 py-2 bg-[#0b1730] border border-[#19315d]/50 rounded-xl text-slate-300 text-sm focus:outline-none focus:border-blue-500/50 cursor-pointer appearance-none pr-8 transition-all';

  const activeFilters = search || statusFilter !== 'all';

  return (
    <section className="min-h-screen pb-16">
      <AnimatePresence>{toast && <Toast msg={toast.msg} type={toast.type} />}</AnimatePresence>

      <DeleteModal
        open={modalOpen}
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
        isDeleting={isDeleting}
      />

      {/* ── Header ── */}
      <div className="mb-6">
        <nav className="mb-2 text-xs text-slate-600">
          <Link href="/admin/stays" className="hover:text-slate-400">
            Stays
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-slate-500">Places</span>
        </nav>
        <h1 className="text-2xl font-semibold text-blue-50">Stay Place Pages</h1>
        <p className="mt-0.5 text-sm text-blue-300/50">
          Landing pages for each town and area — /stays/[place]-stays
        </p>
      </div>

      {/* ── Stats ── */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard title="Total" value={total} color="text-blue-400" />
        <StatCard title="Published" value={published} color="text-emerald-400" />
        <StatCard title="Drafts" value={drafts} color="text-amber-400" />
        <StatCard
          title="Needs Copy"
          value={missingCopy}
          color="text-violet-400"
          sub="Missing tips or FAQs"
        />
      </div>

      {/* ── Controls ── */}
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="relative min-w-52 flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            placeholder="Search by place, slug or town..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#19315d]/50 bg-[#0b1730] py-2 pl-10 pr-4 text-sm text-slate-300 placeholder-slate-600 transition-all focus:border-blue-500/50 focus:outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="relative">
          <Eye className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
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

        <div className="relative">
          {sort === 'latest' ? (
            <SortDesc className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          ) : (
            <SortAsc className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          )}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className={`${selectCls} pl-9`}
          >
            <option value="latest" className="bg-[#0b1730]">Latest First</option>
            <option value="oldest" className="bg-[#0b1730]">Oldest First</option>
            <option value="name" className="bg-[#0b1730]">Name A → Z</option>
          </select>
        </div>

        <Link
          href="/admin/stays/places/create"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-blue-500"
        >
          <Plus className="h-4 w-4" />
          New Place Page
        </Link>
      </div>

      {/* ── Filter summary ── */}
      {activeFilters && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="h-3.5 w-3.5" />
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
          {search && (
            <span className="flex items-center gap-1.5 rounded-full border border-blue-600/20 bg-blue-600/10 px-2.5 py-1 text-xs text-blue-400">
              &quot;{search}&quot;
              <button onClick={() => setSearch('')}>
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {statusFilter !== 'all' && (
            <span className="flex items-center gap-1.5 rounded-full border border-[#19315d]/40 bg-[#0f1e3a] px-2.5 py-1 text-xs text-slate-400">
              {statusFilter}
              <button onClick={() => setStatusFilter('all')}>
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* ── Content ── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-4 py-28">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#19315d] border-t-blue-500" />
          <p className="text-sm text-slate-600">Loading stay places...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-28 text-slate-600">
          <MapPin className="h-10 w-10" />
          <p className="text-sm font-medium">No place pages found</p>
          {places.length === 0 ? (
            <Link
              href="/admin/stays/places/create"
              className="mt-1 text-sm text-blue-400 hover:underline"
            >
              Create your first place page →
            </Link>
          ) : (
            <button
              onClick={() => {
                setSearch('');
                setStatusFilter('all');
              }}
              className="mt-1 text-sm text-blue-400 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}
        >
          {filtered.map((place, idx) => (
            <motion.div
              key={place._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.3, ease: 'easeOut' }}
              className="group relative overflow-hidden rounded-2xl border border-[#19315d]/40 bg-[#0b1730] transition-all duration-300 hover:-translate-y-1 hover:border-[#244278]/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
            >
              <span
                className={`absolute right-3 top-3 z-10 rounded-full border px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm ${
                  place.status === 'published'
                    ? 'border-emerald-700/50 bg-emerald-900/70 text-emerald-300'
                    : 'border-amber-700/50 bg-amber-900/70 text-amber-300'
                }`}
              >
                {place.status}
              </span>

              {/* Hero image */}
              <div className="h-36 overflow-hidden bg-[#07111f]">
                {place.heroImage?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={place.heroImage.image}
                    alt={place.heroImage.alt || place.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <MapPin className="h-8 w-8 text-slate-700" />
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="mb-0.5 text-sm font-semibold leading-snug text-white">
                  {place.name}
                  {place.parentTown && (
                    <span className="ml-1.5 text-xs font-normal text-slate-500">
                      · {place.parentTown}
                    </span>
                  )}
                </h3>
                <p className="mb-3 truncate text-xs text-slate-600">/stays/{place.slug}</p>

                {/* Section completeness */}
                <div className="mb-4 flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Lightbulb
                      className={`h-3 w-3 shrink-0 ${
                        place.sartajTips?.length ? 'text-emerald-500' : 'text-slate-700'
                      }`}
                    />
                    {place.sartajTips?.length ?? 0} tips
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircleQuestion
                      className={`h-3 w-3 shrink-0 ${
                        place.faqs?.length ? 'text-emerald-500' : 'text-slate-700'
                      }`}
                    />
                    {place.faqs?.length ?? 0} FAQs
                  </span>
                  <span className="flex items-center gap-1">
                    <Link2
                      className={`h-3 w-3 shrink-0 ${
                        place.internalLinks?.length ? 'text-emerald-500' : 'text-slate-700'
                      }`}
                    />
                    {place.internalLinks?.length ?? 0} links
                  </span>
                </div>

                <div className="mb-3 flex items-center gap-1.5 text-[11px] text-slate-600">
                  <CalendarDays className="h-3 w-3 shrink-0" />
                  {place.createdAt
                    ? new Date(place.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })
                    : '—'}
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/admin/stays/places/${place._id}/edit`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-blue-600/20 bg-blue-600/10 py-2 text-xs font-medium text-blue-400 transition-all hover:border-blue-500/40 hover:bg-blue-600/20"
                  >
                    <Pencil className="h-3 w-3" /> Edit
                  </Link>
                  <Link
                    href={`/stays/${place.slug}`}
                    target="_blank"
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-[#19315d]/50 px-3 py-2 text-xs font-medium text-slate-400 transition-all hover:text-white"
                  >
                    {place.status === 'published' ? (
                      <Eye className="h-3 w-3" />
                    ) : (
                      <EyeOff className="h-3 w-3" />
                    )}
                  </Link>
                  <button
                    onClick={() => openDelete(place._id)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-red-600/20 bg-red-600/10 px-3 py-2 text-xs font-medium text-red-400 transition-all hover:border-red-500/40 hover:bg-red-600/20"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
