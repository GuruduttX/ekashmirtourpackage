'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import FestivalEditor, {
  EMPTY_FESTIVAL,
  toRows,
  type FestivalFormValues,
} from '@/components/admin/festivals/FestivalEditor';

/**
 * Loads one festival into the shared editor.
 *
 * The record is reshaped on the way in, mirroring buildPayload on the way out:
 * `seo` and `dates` are nested in Mongo but flat in the form, and the plain
 * string lists become keyed rows so deleting one does not steal the focus of
 * the row below it.
 */
export default function EditFestivalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [initial, setInitial] = useState<FestivalFormValues | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`/api/festivals/${id}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Festival not found');
        const { festival } = await res.json();
        if (cancelled) return;

        // Merged over the empty shape so records saved before a field existed
        // still load rather than arriving as undefined.
        setInitial({
          ...EMPTY_FESTIVAL,
          ...festival,
          shortName: festival.shortName ?? '',
          destinationSlug: festival.destinationSlug ?? '',
          image: festival.image ?? '',
          imageAlt: festival.imageAlt ?? '',
          dateWindow: festival.dates?.window ?? '',
          dateShort: festival.dates?.short ?? '',
          dateDuration: festival.dates?.duration ?? '',
          dateStart: festival.dates?.start ?? '',
          dateEnd: festival.dates?.end ?? '',
          datesVerified: Boolean(festival.datesVerified),
          facts: festival.facts ?? [],
          intro: festival.intro ?? '',
          highlights: toRows(festival.highlights),
          attend: festival.attend ?? [],
          history: festival.history ?? [],
          gallery: festival.gallery ?? [],
          sartajTips: toRows(festival.sartajTips),
          faqs: festival.faqs ?? [],
          metaTitle: festival.seo?.title ?? '',
          metaDescription: festival.seo?.description ?? '',
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
          href="/admin/festivals"
          className="text-sm text-blue-400 hover:underline"
        >
          Back to festivals →
        </Link>
      </div>
    );
  }

  if (!initial) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-28">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#19315d] border-t-blue-500" />
        <p className="text-sm text-slate-600">Loading festival...</p>
      </div>
    );
  }

  return <FestivalEditor mode="edit" festivalId={id} initial={initial} />;
}
