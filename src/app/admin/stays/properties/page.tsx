'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  BedDouble,
  CalendarDays,
  Eye,
  EyeOff,
  Filter,
  IndianRupee,
  LayoutGrid,
  List,
  MapPin,
  Pencil,
  Plus,
  Search,
  SortAsc,
  SortDesc,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import CountUp from '@/utils/CountUp';
import { STAY_CATEGORIES } from '@/types/stayTypes';

interface StayItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  town?: string;
  area?: string;
  placeTags?: string[];
  priceFrom?: number;
  sleeps?: number;
  status: 'draft' | 'published';
  heroImage?: { image?: string; alt?: string };
  gallery?: unknown[];
  sartajTips?: unknown[];
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
                <h3 className="text-base font-semibold text-white">Delete Stay?</h3>
                <p className="text-xs text-slate-500">This action cannot be undone</p>
              </div>
            </div>
            <p className="mb-6 pl-1 text-sm text-slate-400">
              The property page will 404 and it will disappear from every place and type listing.
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

export default function StayPropertiesPage() {
  const [stays, setStays] = useState<StayItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'card' | 'table'>('card');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sort, setSort] = useState<'latest' | 'oldest' | 'price-asc' | 'price-desc'>('latest');

  const [selectedId, setSelectedId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  const showToast = (msg: string, type: 'ok' | 'err') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  useEffect(() => {
    let cancelled = false;

    const fetchStays = async () => {
      try {
        const res = await fetch('/api/stays/properties', { cache: 'no-store' });
        const data = await res.json();
        if (!cancelled) setStays(data.stays ?? []);
      } catch {
        if (!cancelled) setToast({ msg: 'Failed to load stays', type: 'err' });
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchStays();
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
      const res = await fetch(`/api/stays/properties/${selectedId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setStays((prev) => prev.filter((s) => s._id !== selectedId));
      showToast('Stay deleted', 'ok');
      setModalOpen(false);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Delete failed', 'err');
    } finally {
      setIsDeleting(false);
    }
  };

  const filtered = stays
    .filter((s) => {
      const q = search.toLowerCase();
      const matchSearch =
        s.title.toLowerCase().includes(q) ||
        (s.town ?? '').toLowerCase().includes(q) ||
        (s.area ?? '').toLowerCase().includes(q) ||
        s.slug.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || s.status === statusFilter;
      const matchCategory = categoryFilter === 'all' || s.category === categoryFilter;
      return matchSearch && matchStatus && matchCategory;
    })
    .sort((a, b) => {
      if (sort === 'price-asc') return (a.priceFrom ?? 0) - (b.priceFrom ?? 0);
      if (sort === 'price-desc') return (b.priceFrom ?? 0) - (a.priceFrom ?? 0);
      const ta = new Date(a.createdAt ?? 0).getTime();
      const tb = new Date(b.createdAt ?? 0).getTime();
      return sort === 'latest' ? tb - ta : ta - tb;
    });

  const total = stays.length;
  const published = stays.filter((s) => s.status === 'published').length;
  const drafts = stays.filter((s) => s.status === 'draft').length;
  const untagged = stays.filter((s) => !s.placeTags?.length).length;

  const selectCls =
    'px-3 py-2 bg-[#0b1730] border border-[#19315d]/50 rounded-xl text-slate-300 text-sm focus:outline-none focus:border-blue-500/50 cursor-pointer appearance-none pr-8 transition-all';

  const activeFilters = search || statusFilter !== 'all' || categoryFilter !== 'all';

  return (
    <section className="min-h-screen pb-16">
      <AnimatePresence>{toast && <Toast msg={toast.msg} type={toast.type} />}</AnimatePresence>

      <DeleteModal
        open={modalOpen}
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
        isDeleting={isDeleting}
      />

      <div className="mb-6">
        <nav className="mb-2 text-xs text-slate-600">
          <Link href="/admin/stays" className="hover:text-slate-400">
            Stays
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-slate-500">Properties</span>
        </nav>
        <h1 className="text-2xl font-semibold text-blue-50">Stay Properties</h1>
        <p className="mt-0.5 text-sm text-blue-300/50">
          Individual houseboats, hotels, resorts and homestays
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard title="Total" value={total} color="text-blue-400" />
        <StatCard title="Published" value={published} color="text-emerald-400" />
        <StatCard title="Drafts" value={drafts} color="text-amber-400" />
        <StatCard
          title="Untagged"
          value={untagged}
          color="text-violet-400"
          sub="Won't appear on any place page"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <div className="relative min-w-52 flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            placeholder="Search by name, town, area or slug..."
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
          <BedDouble className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={`${selectCls} pl-9`}
          >
            <option value="all" className="bg-[#0b1730]">All Types</option>
            {STAY_CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-[#0b1730]">
                {c}
              </option>
            ))}
          </select>
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
          {sort === 'latest' || sort === 'price-desc' ? (
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
            <option value="price-asc" className="bg-[#0b1730]">Price: Low → High</option>
            <option value="price-desc" className="bg-[#0b1730]">Price: High → Low</option>
          </select>
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-[#19315d]/50 bg-[#0b1730] p-1">
          <button
            onClick={() => setView('card')}
            className={`rounded-lg p-2 transition-all ${
              view === 'card'
                ? 'border border-blue-600/25 bg-blue-600/20 text-blue-400'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setView('table')}
            className={`rounded-lg p-2 transition-all ${
              view === 'table'
                ? 'border border-blue-600/25 bg-blue-600/20 text-blue-400'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <List size={15} />
          </button>
        </div>

        <Link
          href="/admin/stays/properties/create"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-blue-500"
        >
          <Plus className="h-4 w-4" />
          New Stay
        </Link>
      </div>

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
          {categoryFilter !== 'all' && (
            <span className="flex items-center gap-1.5 rounded-full border border-[#19315d]/40 bg-[#0f1e3a] px-2.5 py-1 text-xs text-slate-400">
              {categoryFilter}
              <button onClick={() => setCategoryFilter('all')}>
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

      {loading ? (
        <div className="flex flex-col items-center justify-center gap-4 py-28">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#19315d] border-t-blue-500" />
          <p className="text-sm text-slate-600">Loading stays...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-28 text-slate-600">
          <BedDouble className="h-10 w-10" />
          <p className="text-sm font-medium">No stays found</p>
          {stays.length === 0 ? (
            <Link
              href="/admin/stays/properties/create"
              className="mt-1 text-sm text-blue-400 hover:underline"
            >
              Add your first stay →
            </Link>
          ) : (
            <button
              onClick={() => {
                setSearch('');
                setStatusFilter('all');
                setCategoryFilter('all');
              }}
              className="mt-1 text-sm text-blue-400 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : view === 'card' ? (
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
        >
          {filtered.map((stay, idx) => (
            <motion.div
              key={stay._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.3, ease: 'easeOut' }}
              className="group relative overflow-hidden rounded-2xl border border-[#19315d]/40 bg-[#0b1730] transition-all duration-300 hover:-translate-y-1 hover:border-[#244278]/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
            >
              <span
                className={`absolute right-3 top-3 z-10 rounded-full border px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm ${
                  stay.status === 'published'
                    ? 'border-emerald-700/50 bg-emerald-900/70 text-emerald-300'
                    : 'border-amber-700/50 bg-amber-900/70 text-amber-300'
                }`}
              >
                {stay.status}
              </span>

              {(stay.priceFrom ?? 0) > 0 && (
                <span className="absolute left-3 top-3 z-10 flex items-center gap-0.5 rounded-full border border-blue-700/50 bg-blue-900/80 px-2.5 py-1 text-[11px] font-semibold text-blue-200 backdrop-blur-sm">
                  <IndianRupee className="h-2.5 w-2.5" />
                  {stay.priceFrom!.toLocaleString('en-IN')}
                </span>
              )}

              <div className="h-40 overflow-hidden bg-[#07111f]">
                {stay.heroImage?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={stay.heroImage.image}
                    alt={stay.heroImage.alt || stay.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <BedDouble className="h-8 w-8 text-slate-700" />
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="mb-0.5 line-clamp-1 text-sm font-semibold text-white">
                  {stay.title}
                </h3>
                <p className="mb-3 truncate text-xs text-slate-600">/stays/{stay.slug}</p>

                <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <BedDouble className="h-3 w-3 shrink-0" /> {stay.category}
                  </span>
                  {stay.sleeps ? (
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3 shrink-0" /> {stay.sleeps}
                    </span>
                  ) : null}
                  {stay.area && (
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="h-3 w-3 shrink-0" /> {stay.area}
                    </span>
                  )}
                </div>

                <div className="mb-4 flex flex-wrap gap-1.5">
                  {stay.placeTags?.length ? (
                    stay.placeTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#19315d]/50 bg-[#07111f] px-2 py-0.5 text-[10px] text-slate-500"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-full border border-amber-600/25 bg-amber-600/10 px-2 py-0.5 text-[10px] text-amber-400">
                      No place tags
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/admin/stays/properties/${stay._id}/edit`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-blue-600/20 bg-blue-600/10 py-2 text-xs font-medium text-blue-400 transition-all hover:border-blue-500/40 hover:bg-blue-600/20"
                  >
                    <Pencil className="h-3 w-3" /> Edit
                  </Link>
                  <Link
                    href={`/stays/${stay.slug}`}
                    target="_blank"
                    className="flex items-center justify-center rounded-xl border border-[#19315d]/50 px-3 py-2 text-xs font-medium text-slate-400 transition-all hover:text-white"
                  >
                    {stay.status === 'published' ? (
                      <Eye className="h-3 w-3" />
                    ) : (
                      <EyeOff className="h-3 w-3" />
                    )}
                  </Link>
                  <button
                    onClick={() => openDelete(stay._id)}
                    className="flex items-center justify-center rounded-xl border border-red-600/20 bg-red-600/10 px-3 py-2 text-xs font-medium text-red-400 transition-all hover:border-red-500/40 hover:bg-red-600/20"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#19315d]/50 bg-[#0b1730]/50">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#19315d]/40">
                  <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">Stay</th>
                  <th className="hidden px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500 md:table-cell">Type</th>
                  <th className="hidden px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500 lg:table-cell">Price</th>
                  <th className="hidden px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500 lg:table-cell">Place Tags</th>
                  <th className="px-4 py-3.5 text-center text-[11px] font-bold uppercase tracking-widest text-slate-500">Status</th>
                  <th className="hidden px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500 lg:table-cell">Created</th>
                  <th className="px-5 py-3.5 text-right text-[11px] font-bold uppercase tracking-widest text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#19315d]/25">
                {filtered.map((stay, idx) => (
                  <motion.tr
                    key={stay._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className="transition-colors hover:bg-[#0f1e3a]/40"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        {stay.heroImage?.image && (
                          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#07111f]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={stay.heroImage.image} alt="" className="h-full w-full object-cover" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="max-w-52 truncate text-sm font-medium text-white">{stay.title}</p>
                          <p className="max-w-52 truncate text-xs text-slate-600">/stays/{stay.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3.5 md:table-cell">
                      <span className="text-xs text-slate-400">{stay.category}</span>
                    </td>
                    <td className="hidden px-4 py-3.5 lg:table-cell">
                      <span className="flex items-center gap-0.5 text-sm font-medium text-slate-300">
                        {stay.priceFrom ? (
                          <>
                            <IndianRupee className="h-3 w-3 text-slate-500" />
                            {stay.priceFrom.toLocaleString('en-IN')}
                          </>
                        ) : (
                          '—'
                        )}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3.5 lg:table-cell">
                      <span className="text-xs text-slate-500">
                        {stay.placeTags?.length ? stay.placeTags.join(', ') : (
                          <span className="text-amber-400">none</span>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                          stay.status === 'published'
                            ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                            : 'border-amber-500/20 bg-amber-500/10 text-amber-400'
                        }`}
                      >
                        {stay.status === 'published' ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        {stay.status}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3.5 lg:table-cell">
                      <span className="flex items-center gap-1.5 text-xs text-slate-500">
                        <CalendarDays className="h-3 w-3 shrink-0 text-slate-600" />
                        {stay.createdAt
                          ? new Date(stay.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })
                          : '—'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/stays/properties/${stay._id}/edit`}
                          className="rounded-lg p-2 text-slate-500 transition-all hover:bg-blue-600/10 hover:text-blue-400"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          onClick={() => openDelete(stay._id)}
                          className="rounded-lg p-2 text-slate-500 transition-all hover:bg-red-600/10 hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </section>
  );
}
