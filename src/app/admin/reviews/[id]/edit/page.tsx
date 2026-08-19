 'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
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
	images?: Array<{ url: string; alt: string }>;
	createdAt?: string;
}

interface PackageOption {
	_id: string;
	title: string;
}

export default function EditReviewPage({ params }: { params: Promise<{ id: string }> }) {
	const resolvedParams = React.use(params);
	const id = resolvedParams.id;
	const [review, setReview] = useState<ReviewItem | null>(null);
	const [packages, setPackages] = useState<PackageOption[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState('');
	const router = useRouter();

	useEffect(() => {
		const load = async () => {
			try {
				const [reviewRes, packageRes] = await Promise.all([
					fetch(`/api/reviews/${id}`).then((res) => res.json()),
					fetch('/api/packages').then((res) => res.json()),
				]);
				if (!reviewRes.success) {
					throw new Error(reviewRes.message || 'Failed to load review');
				}
				setReview(reviewRes.data);
				setPackages((packageRes.packages ?? []).map((pkg: any) => ({ _id: pkg._id, title: pkg.title })));
			} catch (err) {
				setError('Unable to load review details.');
			} finally {
				setIsLoading(false);
			}
		};
		load();
	}, [id]);

	const handleSave = async (data: ReviewFormData) => {
		setIsSaving(true);
		try {
			const res = await fetch(`/api/reviews/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});
			const json = await res.json();
			if (!res.ok) throw new Error(json.message || 'Failed to save');
			router.push('/admin/reviews');
		} catch (err: any) {
			setError(err.message || 'Unable to save review');
		} finally {
			setIsSaving(false);
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-slate-300" />
			</div>
		);
	}

	if (!review) {
		return (
			<div className="min-h-screen flex items-center justify-center text-slate-300">
				{error || 'Review not found.'}
			</div>
		);
	}

	return (
		<section className="min-h-screen pb-20 text-slate-100">
			<div className="mb-8">
				<p className="text-sm uppercase tracking-[0.35em] text-sky-400/80">Edit review</p>
				<h1 className="text-3xl font-semibold text-white mt-3">Review for {review.authorName}</h1>
				<p className="text-slate-400 mt-2">Update review details, status, and associated package.</p>
			</div>

			<div className="rounded-3xl border border-[#19315d]/70 bg-[#07111f]/90 p-6 shadow-xl shadow-black/20">
				{error ? <div className="mb-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div> : null}
				<ReviewForm packages={packages} initialData={review} submitLabel="Save review" isSaving={isSaving} onSubmit={handleSave} />
			</div>
		</section>
	);
}

