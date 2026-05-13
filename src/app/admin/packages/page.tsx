'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid, List, Search, Plus, Pencil, Trash2,
  Eye, EyeOff, Package, SortDesc, SortAsc, Tag, Filter,
  X, MapPin, Star, Clock, IndianRupee, AlertTriangle, CalendarDays,
} from 'lucide-react';
import CountUp from '@/utils/CountUp';

// ─── Types ──────────────────────────────────────────────
interface PkgItem {
  _id: string;
  title: string;
  category: string;
  slug: string;
  price: number;
  duration: string;
  days: number;
  nights: number;
  destination: string;
  rating: number;
  reviews: number;
  status: 'draft' | 'published';
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
                <h3 className="text-white font-semibold text-base">Delete Package?</h3>
                <p className="text-slate-500 text-xs">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-6 pl-1">
              The tour package will be permanently removed from the database.
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
function StatCard({ title, value, color, sub }: { title: string; value: number; color: string; sub?: string }) {
  return (
    <div className="bg-[#0b1730] border border-[#19315d]/40 rounded-2xl p-5 hover:-translate-y-0.5 transition-transform duration-200">
      <p className={`text-sm font-medium mb-1 ${color}`}>{title}</p>
      <h2 className="text-2xl font-bold text-white">
        <CountUp end={value} duration={1200} />
      </h2>
      {sub && <p className="text-xs text-slate-600 mt-0.5">{sub}</p>}
    </div>
  );
}

// ─── Package Cards ───────────────────────────────────────
function PackageCards({ packages, onDelete }: { packages: PkgItem[]; onDelete: (id: string) => void }) {
  return (
    <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
      {packages.map((pkg, idx) => (
        <motion.div
          key={pkg._id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.04, duration: 0.3, ease: 'easeOut' }}
          className="group relative rounded-2xl overflow-hidden bg-[#0b1730] border border-[#19315d]/40
            hover:-translate-y-1 hover:border-[#244278]/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]
            transition-all duration-300"
        >
          {/* Status badge */}
          <span className={`absolute top-3 right-3 z-10 px-2.5 py-1 text-[11px] font-semibold rounded-full border backdrop-blur-sm ${
            pkg.status === 'published'
              ? 'bg-emerald-900/70 text-emerald-300 border-emerald-700/50'
              : 'bg-amber-900/70 text-amber-300 border-amber-700/50'
          }`}>
            {pkg.status}
          </span>

          {/* Price badge */}
          {pkg.price > 0 && (
            <span className="absolute top-3 left-3 z-10 flex items-center gap-0.5 px-2.5 py-1
              text-[11px] font-semibold rounded-full bg-blue-900/80 text-blue-200
              border border-blue-700/50 backdrop-blur-sm">
              <IndianRupee className="w-2.5 h-2.5" />
              {pkg.price.toLocaleString('en-IN')}
            </span>
          )}

          {/* Image */}
          <div className="h-44 overflow-hidden bg-[#07111f]">
            {pkg.heroImage?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={pkg.heroImage.image}
                alt={pkg.heroImage.alt || pkg.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-8 h-8 text-slate-700" />
              </div>
            )}
          </div>

          {/* Body */}
          <div className="p-4">
            <h3 className="text-white font-semibold text-sm leading-snug mb-2 line-clamp-2">
              {pkg.title}
            </h3>

            <div className="flex flex-wrap gap-x-3 gap-y-1.5 mb-4 text-[11px] text-slate-500">
              {pkg.destination && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 shrink-0" /> {pkg.destination}
                </span>
              )}
              {pkg.duration && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 shrink-0" /> {pkg.duration}
                </span>
              )}
              {pkg.rating > 0 && (
                <span className="flex items-center gap-1 text-amber-400/80">
                  <Star className="w-3 h-3 shrink-0 fill-amber-400/60" />
                  {pkg.rating.toFixed(1)}
                  {pkg.reviews > 0 && <span className="text-slate-600">({pkg.reviews})</span>}
                </span>
              )}
              {pkg.category && (
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3 shrink-0" /> {pkg.category}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <Link
                href={`/admin/packages/${pkg._id}/edit`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium
                  bg-blue-600/10 text-blue-400 border border-blue-600/20
                  hover:bg-blue-600/20 hover:border-blue-500/40 transition-all"
              >
                <Pencil className="w-3 h-3" /> Edit
              </Link>
              <button
                onClick={() => onDelete(pkg._id)}
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

// ─── Package Table ───────────────────────────────────────
function PackageTable({ packages, onDelete }: { packages: PkgItem[]; onDelete: (id: string) => void }) {
  return (
    <div className="rounded-2xl border border-[#19315d]/50 bg-[#0b1730]/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#19315d]/40">
              <th className="text-left px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Package</th>
              <th className="text-left px-4 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest hidden md:table-cell">Destination</th>
              <th className="text-left px-4 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest hidden lg:table-cell">Price</th>
              <th className="text-left px-4 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest hidden lg:table-cell">Duration</th>
              <th className="text-center px-4 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
              <th className="text-left px-4 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest hidden lg:table-cell">Created</th>
              <th className="text-right px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#19315d]/25">
            {packages.map((pkg, idx) => (
              <motion.tr
                key={pkg._id}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.03 }}
                className="hover:bg-[#0f1e3a]/40 transition-colors"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    {pkg.heroImage?.image && (
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#07111f] shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={pkg.heroImage.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate max-w-52">{pkg.title}</p>
                      <p className="text-slate-600 text-xs truncate max-w-52">/package/{pkg.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 hidden md:table-cell">
                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin className="w-3 h-3 text-slate-600 shrink-0" />
                    {pkg.destination || '—'}
                  </span>
                </td>
                <td className="px-4 py-3.5 hidden lg:table-cell">
                  <span className="flex items-center gap-0.5 text-sm text-slate-300 font-medium">
                    {pkg.price > 0 ? (
                      <><IndianRupee className="w-3 h-3 text-slate-500" />{pkg.price.toLocaleString('en-IN')}</>
                    ) : '—'}
                  </span>
                </td>
                <td className="px-4 py-3.5 hidden lg:table-cell">
                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3 h-3 text-slate-600 shrink-0" />
                    {pkg.duration || '—'}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-center">
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${
                    pkg.status === 'published'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {pkg.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {pkg.status}
                  </span>
                </td>
                <td className="px-4 py-3.5 hidden lg:table-cell">
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <CalendarDays className="w-3 h-3 text-slate-600 shrink-0" />
                    {pkg.createdAt
                      ? new Date(pkg.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                      : '—'}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2 justify-end">
                    <Link href={`/admin/packages/${pkg._id}/edit`}
                      className="p-2 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-600/10 transition-all">
                      <Pencil className="w-3.5 h-3.5" />
                    </Link>
                    <button onClick={() => onDelete(pkg._id)}
                      className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-600/10 transition-all">
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
export default function PackagesPage() {
  const [view,           setView]           = useState<'card' | 'table'>('card');
  const [search,         setSearch]         = useState('');
  const [statusFilter,   setStatusFilter]   = useState('all');
  const [sort,           setSort]           = useState<'latest' | 'oldest' | 'price-asc' | 'price-desc'>('latest');

  const [packages,  setPackages]  = useState<PkgItem[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [selectedId, setSelectedId] = useState('');
  const [modalOpen,  setModalOpen]  = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast,      setToast]      = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  const showToast = (msg: string, type: 'ok' | 'err') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/packages', { cache: 'no-store' });
      const data = await res.json();
      setPackages(data.packages ?? []);
    } catch {
      showToast('Failed to load packages', 'err');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPackages(); }, []);

  const openDelete = (id: string) => { setSelectedId(id); setModalOpen(true); };

  const handleDelete = async () => {
    if (!selectedId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/packages/${selectedId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setPackages((prev) => prev.filter((p) => p._id !== selectedId));
      showToast('Package deleted successfully', 'ok');
      setModalOpen(false);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Delete failed', 'err');
    } finally {
      setIsDeleting(false);
    }
  };

  // ── Filter + Sort ──
  const filtered = packages
    .filter((p) => {
      const q = search.toLowerCase();
      const matchSearch =
        p.title.toLowerCase().includes(q) ||
        (p.category ?? '').toLowerCase().includes(q) ||
        (p.destination ?? '').toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sort === 'price-asc')  return (a.price ?? 0) - (b.price ?? 0);
      if (sort === 'price-desc') return (b.price ?? 0) - (a.price ?? 0);
      const ta = new Date(a.createdAt ?? 0).getTime();
      const tb = new Date(b.createdAt ?? 0).getTime();
      return sort === 'latest' ? tb - ta : ta - tb;
    });

  // ── Stats ──
  const total     = packages.length;
  const published = packages.filter((p) => p.status === 'published').length;
  const drafts    = packages.filter((p) => p.status === 'draft').length;
  const avgPrice  = packages.length > 0
    ? Math.round(packages.reduce((s, p) => s + (p.price ?? 0), 0) / packages.length)
    : 0;

  const selectCls =
    'px-3 py-2 bg-[#0b1730] border border-[#19315d]/50 rounded-xl text-slate-300 text-sm focus:outline-none focus:border-blue-500/50 cursor-pointer appearance-none pr-8 transition-all';

  const activeFilters = search || statusFilter !== 'all';

  return (
    <section className="min-h-screen pb-16">
      {/* Toast */}
      <AnimatePresence>{toast && <Toast msg={toast.msg} type={toast.type} />}</AnimatePresence>

      {/* Delete Modal */}
      <DeleteModal open={modalOpen} onConfirm={handleDelete} onCancel={() => setModalOpen(false)} isDeleting={isDeleting} />

      {/* ── Header ── */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-blue-50">Package Management</h1>
        <p className="text-sm text-blue-300/50 mt-0.5">Advanced CMS dashboard</p>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total" value={total} color="text-blue-400" />
        <StatCard title="Published" value={published} color="text-emerald-400" />
        <StatCard title="Drafts" value={drafts} color="text-amber-400" />
        <StatCard
          title="Avg. Price"
          value={avgPrice}
          color="text-violet-400"
          sub="₹ average across all packages"
        />
      </div>

      {/* ── Controls ── */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-52">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            placeholder="Search by title, category, destination..."
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

        {/* Status filter */}
        <div className="relative">
          <Eye className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className={`${selectCls} pl-9`}>
            <option value="all" className="bg-[#0b1730]">All Status</option>
            <option value="published" className="bg-[#0b1730]">Published</option>
            <option value="draft" className="bg-[#0b1730]">Draft</option>
          </select>
        </div>

        {/* Sort */}
        <div className="relative">
          {sort === 'latest' || sort === 'price-desc'
            ? <SortDesc className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
            : <SortAsc  className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          }
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}
            className={`${selectCls} pl-9`}>
            <option value="latest"     className="bg-[#0b1730]">Latest First</option>
            <option value="oldest"     className="bg-[#0b1730]">Oldest First</option>
            <option value="price-asc"  className="bg-[#0b1730]">Price: Low → High</option>
            <option value="price-desc" className="bg-[#0b1730]">Price: High → Low</option>
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-[#0b1730] border border-[#19315d]/50 rounded-xl p-1 gap-1">
          <button onClick={() => setView('card')}
            className={`p-2 rounded-lg transition-all ${
              view === 'card'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-600/25'
                : 'text-slate-500 hover:text-slate-300'
            }`}>
            <LayoutGrid size={15} />
          </button>
          <button onClick={() => setView('table')}
            className={`p-2 rounded-lg transition-all ${
              view === 'table'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-600/25'
                : 'text-slate-500 hover:text-slate-300'
            }`}>
            <List size={15} />
          </button>
        </div>

        {/* Create */}
        <Link
          href="/admin/packages/create"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/30"
        >
          <Plus className="w-4 h-4" />
          New Package
        </Link>
      </div>

      {/* ── Filter summary ── */}
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

      {/* ── Content ── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-28 gap-4">
          <div className="w-8 h-8 border-2 border-[#19315d] border-t-blue-500 rounded-full animate-spin" />
          <p className="text-slate-600 text-sm">Loading packages...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-28 gap-3 text-slate-600">
          <Package className="w-10 h-10" />
          <p className="text-sm font-medium">No packages found</p>
          {packages.length === 0 ? (
            <Link href="/admin/packages/create" className="mt-1 text-blue-400 text-sm hover:underline">
              Create your first package →
            </Link>
          ) : (
            <button onClick={() => { setSearch(''); setStatusFilter('all'); }}
              className="mt-1 text-blue-400 text-sm hover:underline">
              Clear filters
            </button>
          )}
        </div>
      ) : view === 'card' ? (
        <PackageCards packages={filtered} onDelete={openDelete} />
      ) : (
        <PackageTable packages={filtered} onDelete={openDelete} />
      )}
    </section>
  );
}
