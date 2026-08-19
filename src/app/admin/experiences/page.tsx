'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Clock,
  ExternalLink,
  Eye,
  Filter,
  LayoutGrid,
  List,
  MapPin,
  Mountain,
  Pencil,
  Plus,
  Search,
  SortAsc,
  SortDesc,
  Trash2,
  X,
} from 'lucide-react';
import CountUp from '@/utils/CountUp';

/**
 * /admin/experiences — every /experiences/[slug] activity page.
 *
 * Two of the stats are honesty gauges rather than progress bars:
 *
 *   • "Thin" counts records that would publish without the sections the page
 *     exists for. It is a nudge, not a gate.
 *   • "Unverified" counts published records whose price has not been checked.
 *     Those pages ship without a schema.org Offer by design — this is the list
 *     of prices somebody still needs to confirm.
 */

interface ActivityItem {
  _id: string;
  title: string;
  slug: string;
  location?: string;
  duration?: string;
  quickAnswer?: string;
  status: 'draft' | 'published';
  pricePerPerson?: number;
  priceVerified?: boolean;
  gallery?: { image?: string; alt?: string }[];
  whatToExpect?: unknown[];
  sartajTips?: unknown[];
  faqs?: unknown[];
  timing?: { schedules?: unknown[] };
  createdAt?: string;
}

const isThin = (a: ActivityItem) =>
  !a.sartajTips?.length || !a.faqs?.length || !a.whatToExpect?.length;

const isUnverified = (a: ActivityItem) =>
  a.status === 'published' && !a.priceVerified;

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
                <h3 className="text-base font-semibold text-white">
                  Delete Activity?
                </h3>
                <p className="text-xs text-slate-500">This action cannot be undone</p>
              </div>
            </div>
            <p className="mb-6 pl-1 text-sm text-slate-400">
              The activity page will 404 and it will disappear from the
              experiences hub and every related rail that links to it.
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
      className={`fixed top-24 right-6 z-50 rounded-xl border px-4 py-3 text-sm font-medium shadow-xl ${
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

export default function AdminExperiencesPage() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'card' | 'table'>('card');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sort, setSort] = useState<'latest' | 'oldest' | 'name'>('latest');

  const [selectedId, setSelectedId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(
    null,
  );

  const showToast = (msg: string, type: 'ok' | 'err') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch('/api/experiences', { cache: 'no-store' });
        const data = await res.json();
        if (!cancelled) setActivities(data.activities ?? []);
      } catch {
        if (!cancelled) setToast({ msg: 'Failed to load activities', type: 'err' });
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = async () => {
    if (!selectedId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/experiences/${selectedId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      setActivities((prev) => prev.filter((a) => a._id !== selectedId));
      showToast('Activity deleted', 'ok');
      setModalOpen(false);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Delete failed', 'err');
    } finally {
      setIsDeleting(false);
    }
  };

  const filtered = activities
    .filter((a) => {
      const q = search.toLowerCase();
      const matchSearch =
        a.title.toLowerCase().includes(q) ||
        a.slug.toLowerCase().includes(q) ||
        (a.location ?? '').toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || a.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sort === 'name') return a.title.localeCompare(b.title);
      const ta = new Date(a.createdAt ?? 0).getTime();
      const tb = new Date(b.createdAt ?? 0).getTime();
      return sort === 'latest' ? tb - ta : ta - tb;
    });

  const total = activities.length;
  const published = activities.filter((a) => a.status === 'published').length;
  const thin = activities.filter(isThin).length;
  const unverified = activities.filter(isUnverified).length;

  const selectCls =
    'px-3 py-2 bg-[#0b1730] border border-[#19315d]/50 rounded-xl text-slate-300 text-sm focus:outline-none focus:border-blue-500/50 cursor-pointer appearance-none pr-8 transition-all';

  const activeFilters = search || statusFilter !== 'all';

  return (
    <section className="min-h-screen pb-16">
      <AnimatePresence>
        {toast && <Toast msg={toast.msg} type={toast.type} />}
      </AnimatePresence>

      <DeleteModal
        open={modalOpen}
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
        isDeleting={isDeleting}
      />

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-blue-50">Experiences</h1>
        <p className="mt-0.5 text-sm text-blue-300/50">
          Every /experiences/[activity] page — gallery, price, what to expect,
          timings, tips and FAQs
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard title="Total" value={total} color="text-blue-400" />
        <StatCard title="Published" value={published} color="text-emerald-400" />
        <StatCard
          title="Thin"
          value={thin}
          color="text-violet-400"
          sub="Missing steps, tips or FAQs"
        />
        <StatCard
          title="Unverified price"
          value={unverified}
          color="text-amber-400"
          sub="Live, but shipping without an Offer"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <div className="relative min-w-52 flex-1">
          <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            placeholder="Search by title, slug or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#19315d]/50 bg-[#0b1730] py-2 pr-4 pl-10 text-sm text-slate-300 placeholder-slate-600 transition-all focus:border-blue-500/50 focus:outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-600 hover:text-slate-400"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="relative">
          <Eye className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`${selectCls} pl-9`}
          >
            <option value="all" className="bg-[#0b1730]">
              All Status
            </option>
            <option value="published" className="bg-[#0b1730]">
              Published
            </option>
            <option value="draft" className="bg-[#0b1730]">
              Draft
            </option>
          </select>
        </div>

        <div className="relative">
          {sort === 'latest' ? (
            <SortDesc className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          ) : (
            <SortAsc className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          )}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className={`${selectCls} pl-9`}
          >
            <option value="latest" className="bg-[#0b1730]">
              Latest First
            </option>
            <option value="oldest" className="bg-[#0b1730]">
              Oldest First
            </option>
            <option value="name" className="bg-[#0b1730]">
              Title A → Z
            </option>
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
          href="/admin/experiences/create"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-blue-500"
        >
          <Plus className="h-4 w-4" />
          New Activity
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
          <p className="text-sm text-slate-600">Loading activities...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-28 text-slate-600">
          <Mountain className="h-10 w-10" />
          <p className="text-sm font-medium">No activities found</p>
          {activities.length === 0 ? (
            <>
              <Link
                href="/admin/experiences/create"
                className="mt-1 text-sm text-blue-400 hover:underline"
              >
                Add your first activity →
              </Link>
              <p className="max-w-md text-center text-xs text-slate-700">
                The existing pages still render from the static file until they
                are seeded — POST /api/experiences/seed in development to import
                them as drafts.
              </p>
            </>
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
      ) : view === 'card' ? (
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
        >
          {filtered.map((activity, idx) => (
            <motion.div
              key={activity._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.3, ease: 'easeOut' }}
              className="group relative overflow-hidden rounded-2xl border border-[#19315d]/40 bg-[#0b1730] transition-all duration-300 hover:-translate-y-1 hover:border-[#244278]/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
            >
              <span
                className={`absolute top-3 right-3 z-10 rounded-full border px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm ${
                  activity.status === 'published'
                    ? 'border-emerald-700/50 bg-emerald-900/70 text-emerald-300'
                    : 'border-amber-700/50 bg-amber-900/70 text-amber-300'
                }`}
              >
                {activity.status}
              </span>

              <div className="h-40 overflow-hidden bg-[#07111f]">
                {activity.gallery?.[0]?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={activity.gallery[0].image}
                    alt={activity.gallery[0].alt || activity.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Mountain className="h-8 w-8 text-slate-700" />
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="mb-0.5 line-clamp-1 text-sm font-semibold text-white">
                  {activity.title}
                </h3>
                <p className="mb-3 truncate text-xs text-slate-600">
                  /experiences/{activity.slug}
                </p>

                <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-slate-500">
                  {activity.location && (
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="h-3 w-3 shrink-0" /> {activity.location}
                    </span>
                  )}
                  {activity.duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 shrink-0" /> {activity.duration}
                    </span>
                  )}
                </div>

                <div className="mb-4 flex flex-wrap gap-1.5">
                  {isThin(activity) && (
                    <span className="rounded-full border border-violet-600/25 bg-violet-600/10 px-2 py-0.5 text-[10px] text-violet-400">
                      Thin — add steps, tips or FAQs
                    </span>
                  )}
                  {isUnverified(activity) && (
                    <span className="rounded-full border border-amber-600/25 bg-amber-600/10 px-2 py-0.5 text-[10px] text-amber-400">
                      Price unverified
                    </span>
                  )}
                  {!isThin(activity) && !isUnverified(activity) && (
                    <span className="rounded-full border border-[#19315d]/50 bg-[#07111f] px-2 py-0.5 text-[10px] text-slate-500">
                      {activity.gallery?.length ?? 0} photos ·{' '}
                      {activity.faqs?.length ?? 0} FAQs
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/experiences/${activity._id}/edit`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#19315d]/50 bg-[#0f1e3a] px-3 py-2 text-xs font-medium text-slate-300 transition-all hover:bg-[#13254b] hover:text-white"
                  >
                    <Pencil className="h-3 w-3" /> Edit
                  </Link>
                  <Link
                    href={`/experiences/${activity.slug}`}
                    target="_blank"
                    className="rounded-xl border border-[#19315d]/50 bg-[#0f1e3a] p-2 text-slate-500 transition-all hover:text-blue-400"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedId(activity._id);
                      setModalOpen(true);
                    }}
                    className="rounded-xl border border-[#19315d]/50 bg-[#0f1e3a] p-2 text-slate-500 transition-all hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#19315d]/40 bg-[#0b1730]">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-[#19315d]/40 text-xs text-slate-500 uppercase">
              <tr>
                <th className="px-5 py-3 font-medium">Activity</th>
                <th className="px-5 py-3 font-medium">URL</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Timings</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((activity) => (
                <tr
                  key={activity._id}
                  className="border-b border-[#19315d]/25 transition-colors last:border-0 hover:bg-[#0f1e3a]/50"
                >
                  <td className="px-5 py-3 font-medium text-white">
                    {activity.title}
                  </td>
                  <td className="px-5 py-3 text-xs text-slate-500">
                    /experiences/{activity.slug}
                  </td>
                  <td className="px-5 py-3 text-slate-400">
                    ₹{(activity.pricePerPerson ?? 0).toLocaleString('en-IN')}
                    {!activity.priceVerified && (
                      <span className="ml-1.5 text-[10px] text-amber-400">
                        unverified
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-slate-400">
                    {activity.timing?.schedules?.length ?? 0}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                        activity.status === 'published'
                          ? 'border-emerald-700/50 bg-emerald-900/40 text-emerald-300'
                          : 'border-amber-700/50 bg-amber-900/40 text-amber-300'
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/experiences/${activity._id}/edit`}
                        className="rounded-lg p-1.5 text-slate-500 transition-all hover:text-blue-400"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedId(activity._id);
                          setModalOpen(true);
                        }}
                        className="rounded-lg p-1.5 text-slate-500 transition-all hover:text-red-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
