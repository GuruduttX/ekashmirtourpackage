'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import ExperienceActivityEditor, {
  EMPTY_ACTIVITY,
  EMPTY_TIMING,
  toRows,
  type ExperienceActivityFormValues,
} from '@/components/admin/experiences/ExperienceActivityEditor';

/**
 * Loads one activity into the shared editor.
 *
 * The record is reshaped on the way in, mirroring buildPayload on the way out:
 * `seo` is nested in Mongo but flat in the form, the numeric fields become
 * strings so an empty input stays empty instead of showing 0, and the plain
 * string lists become keyed rows so deleting one does not steal the focus of
 * the row below it.
 */
export default function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [initial, setInitial] = useState<ExperienceActivityFormValues | null>(
    null,
  );
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`/api/experiences/${id}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Activity not found');
        const { activity } = await res.json();
        if (cancelled) return;

        // Merged over the empty shape so records saved before a field existed
        // still load rather than arriving as undefined.
        setInitial({
          ...EMPTY_ACTIVITY,
          ...activity,
          gallery: activity.gallery ?? [],
          videos: activity.videos ?? [],
          mapUrl: activity.mapUrl ?? '',
          rating: activity.rating != null ? String(activity.rating) : '',
          ratingCount:
            activity.ratingCount != null ? String(activity.ratingCount) : '',
          pricePerPerson:
            activity.pricePerPerson != null
              ? String(activity.pricePerPerson)
              : '',
          difficulty: activity.difficulty ?? '',
          extraFacts: activity.extraFacts ?? [],
          bestMonths: activity.bestMonths ?? [],
          whatToExpect: activity.whatToExpect ?? [],
          inclusions: toRows(activity.inclusions),
          exclusions: toRows(activity.exclusions),
          timing: { ...EMPTY_TIMING, ...(activity.timing ?? {}) },
          bookingTips: toRows(activity.bookingTips),
          sartajTips: toRows(activity.sartajTips),
          faqs: activity.faqs ?? [],
          metaTitle: activity.seo?.title ?? '',
          metaDescription: activity.seo?.description ?? '',
        });
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : 'Failed to load');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-28 text-slate-500">
        <AlertTriangle className="h-9 w-9 text-red-400" />
        <p className="text-sm font-medium">{error}</p>
        <Link
          href="/admin/experiences"
          className="text-sm text-blue-400 hover:underline"
        >
          Back to experiences →
        </Link>
      </div>
    );
  }

  if (!initial) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-28">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#19315d] border-t-blue-500" />
        <p className="text-sm text-slate-600">Loading activity...</p>
      </div>
    );
  }

  return <ExperienceActivityEditor mode="edit" activityId={id} initial={initial} />;
}
