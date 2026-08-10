'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  AlertTriangle,
  X,
} from 'lucide-react';
import ReviewForm, { ReviewFormData } from '@/components/admin/reviews/ReviewForm';

interface ReviewItem {
  _id: string;
  packageId: string;
  authorName: string;
  authorEmail: string;
  authorAvatar: string;
  rating: number;
  title: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  isVerifiedPurchase: boolean;
  createdAt: string;
}

interface PackageOption {
  _id: string;
  title: string;
}

function DeleteModal({ open, onConfirm, onCancel, isDeleting }: { open: boolean; onConfirm: () => void; onCancel: () => void; isDeleting: boolean; }) {
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
            initial={{ scale: 0.96, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="bg-[#0b1730] border border-[#19315d]/40 rounded-3xl p-6 w-full max-w-md shadow-2xl shadow-black/40"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-red-500/15 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold">Delete review?</h3>
                <p className="text-slate-500 text-sm mt-1">This will remove the review permanently.</p>
              </div>
            </div>
            <div className="text-slate-400 text-sm mb-6">Are you sure you want to delete this review? This action cannot be undone.</div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={onCancel}
                className="w-full rounded-2xl border border-slate-800 bg-[#07111f] px-4 py-3 text-sm font-medium text-slate-300 hover:bg-[#0f1e3a] transition"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isDeleting}
                className="w-full rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isDeleting ? 'Deleting...' : 'Delete review'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StatusBadge({ status }: { status: string }) {
  const classes: Record<string, string>= {
    pending: 'bg-amber-500/10 text-amber-200 border-amber-500/20',
    approved: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/20',
    rejected: 'bg-red-500/15 text-red-200 border-red-500/20',
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-semibold ${classes[status]}`}>
      {status}
    </span>
  );
}

export default function ReviewsAdminPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [packages, setPackages] = useState<PackageOption[]>([]);
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'ok' | 'err' } | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [reviewRes, packageRes] = await Promise.all([
          fetch('/api/reviews?admin=true').then((res) => res.json()),
          fetch('/api/packages').then((res) => res.json()),
        ]);
        setReviews(reviewRes.data ?? []);
        setPackages((packageRes.packages ?? []).map((pkg: any) => ({ _id: pkg._id, title: pkg.title })));
      } catch {
        setToast({ message: 'Failed to load admin data.', type: 'err' });
      }
    };

    load();
  }, []);

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const term = search.toLowerCase();
      return (
        review.authorName.toLowerCase().includes(term) ||
        review.authorEmail.toLowerCase().includes(term) ||
        review.title.toLowerCase().includes(term) ||
        review.content.toLowerCase().includes(term)
      );
    });
  }, [search, reviews]);

  const showToast = (message: string, type: 'ok' | 'err') => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 3000);
  };

  const handleCreate = async (data: ReviewFormData) => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Create failed');
      setReviews((current) => [json.data, ...current]);
      setShowCreate(false);
      showToast('Review created successfully.', 'ok');
    } catch (error: any) {
      showToast(error.message || 'Could not create review.', 'err');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/reviews/${deleteId}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Delete failed');
      setReviews((current) => current.filter((review) => review._id !== deleteId));
      setDeleteId(null);
      showToast('Review deleted.', 'ok');
    } catch (error: any) {
      showToast(error.message || 'Could not delete review.', 'err');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="min-h-screen pb-20 text-slate-100">
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-sky-400/80">Admin reviews</p>
          <h1 className="text-3xl font-semibold text-white mt-3">Manage customer reviews</h1>
          <p className="max-w-2xl text-slate-400 mt-2">Create, edit, approve, or delete reviews from the admin portal.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            onClick={() => setShowCreate((open) => !open)}
            className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
          >
            <Plus className="h-4 w-4" />
            {showCreate ? 'Hide form' : 'Add review'}
          </button>
          <Link href="/review" className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-[#07111f] px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white">
            View public reviews
          </Link>
        </div>
      </div>

      <div className="grid gap-8">
        {showCreate && (
          <div className="rounded-3xl border border-[#19315d]/70 bg-[#07111f]/90 p-6 shadow-xl shadow-black/20">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">Create review</h2>
                <p className="text-slate-400 text-sm">Post a new review to the system with status and package assignment.</p>
              </div>
            </div>
            <ReviewForm packages={packages} submitLabel="Create review" isSaving={isSaving} onSubmit={handleCreate} />
          </div>
        )}

        <div className="rounded-3xl border border-[#19315d]/70 bg-[#07111f]/90 p-6 shadow-xl shadow-black/20">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">All reviews</h2>
              <p className="text-slate-400 text-sm">Search, filter, and manage published or pending reviews.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search reviews..."
                  className="w-full rounded-2xl border border-[#19315d] bg-[#07111f] py-3 pl-12 pr-4 text-sm text-slate-100 outline-none transition focus:border-sky-500 sm:w-80"
                />
              </div>
              <button
                type="button"
                onClick={() => setSearch('')}
                className="inline-flex items-center justify-center rounded-2xl border border-[#19315d] bg-[#0f1e3a] px-4 py-3 text-sm font-medium text-slate-300 hover:bg-[#13254b] transition"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[#19315d]/50">
            <div className="grid min-w-full gap-px bg-[#12213d] text-left text-xs uppercase tracking-[0.2em] text-slate-500">
              <div className="grid grid-cols-[220px_120px_1fr_120px_120px] gap-px px-4 py-3 bg-[#0b1730]">Reviewer</div>
              <div className="grid grid-cols-[220px_120px_1fr_120px_120px] gap-px px-4 py-3 bg-[#0b1730]">Package</div>
              <div className="grid grid-cols-[220px_120px_1fr_120px_120px] gap-px px-4 py-3 bg-[#0b1730]">Review text</div>
              <div className="grid grid-cols-[220px_120px_1fr_120px_120px] gap-px px-4 py-3 bg-[#0b1730]">Rating</div>
              <div className="grid grid-cols-[220px_120px_1fr_120px_120px] gap-px px-4 py-3 bg-[#0b1730]">Actions</div>
            </div>
            <div className="divide-y divide-[#19315d]/60 bg-[#07111f]">
              {filteredReviews.length === 0 ? (
                <div className="px-4 py-12 text-center text-sm text-slate-500">No reviews found.</div>
              ) : (
                filteredReviews.map((review) => (
                  <div key={review._id} className="grid min-w-full grid-cols-[220px_120px_1fr_120px_120px] gap-4 px-4 py-4 items-center text-sm text-slate-200">
                    <div className="space-y-1">
                      <p className="font-medium text-white">{review.authorName}</p>
                      <p className="text-slate-400 text-xs">{review.authorEmail}</p>
                      <StatusBadge status={review.status} />
                    </div>
                    <div className="text-slate-300">{packages.find((pkg) => pkg._id === review.packageId)?.title ?? 'Unknown'}</div>
                    <div className="text-slate-400 line-clamp-2">{review.content}</div>
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-[#0f1e3a] px-3 py-2 text-xs text-slate-300">
                        <span>{review.rating}</span>
                        <span className="text-slate-500">stars</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/reviews/${review._id}/edit`}
                        className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-[#0f1e3a] px-3 py-2 text-xs font-medium text-slate-200 hover:border-slate-500 transition"
                      >
                        <Pencil className="h-4 w-4" /> Edit
                      </Link>
                      <button
                        onClick={() => setDeleteId(review._id)}
                        className="inline-flex items-center gap-2 rounded-2xl bg-red-600/10 px-3 py-2 text-xs font-medium text-red-200 hover:bg-red-600/15 transition"
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <DeleteModal open={Boolean(deleteId)} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} isDeleting={isDeleting} />

      {toast ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed bottom-6 right-6 rounded-3xl px-5 py-4 text-sm font-medium ${toast.type === 'ok' ? 'bg-emerald-500/95 text-white' : 'bg-red-500/95 text-white'}`}
        >
          {toast.message}
        </motion.div>
      ) : null}
    </section>
  );
}
