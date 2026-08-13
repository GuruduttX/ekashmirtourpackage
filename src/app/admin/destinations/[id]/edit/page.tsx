'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import DestinationEditor, {
  EMPTY_DESTINATION,
  type DestinationFormValues,
} from '@/components/admin/destinations/DestinationEditor';
import { emptyMonths } from '@/components/admin/destinations/DestinationMonthsEditor';

/**
 * Loads one destination into the shared editor.
 *
 * The record is flattened on the way in — `howToReach`, `bestTimeTable` and
 * `map` are nested in Mongo but flat in the form, and the numeric map fields
 * become strings so an empty input stays empty instead of showing 0.
 */
export default function EditDestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [initial, setInitial] = useState<DestinationFormValues | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`/api/destinations/${id}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Destination not found');
        const { destination } = await res.json();
        if (cancelled) return;

        const months = destination.bestTimeTable?.months ?? [];

        // Merged over the empty shape so records saved before a field existed
        // still load rather than arriving as undefined.
        setInitial({
          ...EMPTY_DESTINATION,
          ...destination,
          heroImages: destination.heroImages ?? [],
          extraFacts: destination.extraFacts ?? [],
          thingsToDo: destination.thingsToDo ?? [],
          howToReachOverview: destination.howToReach?.overview ?? '',
          transportModes: destination.howToReach?.transportModes ?? [],
          cabFares: destination.cabFares ?? [],
          staySlugs: destination.staySlugs ?? [],
          bestTimeOverview: destination.bestTimeTable?.overview ?? '',
          months: months.length === 12 ? months : emptyMonths(),
          galleryImages: destination.galleryImages ?? [],
          sartajTips: destination.sartajTips ?? [],
          lat: String(destination.map?.lat ?? ''),
          lng: String(destination.map?.lng ?? ''),
          zoom: String(destination.map?.zoom ?? '12'),
          embedUrl: destination.map?.embedUrl ?? '',
          mapBlurb: destination.map?.blurb ?? '',
          landmarks: destination.map?.landmarks ?? [],
          faqs: destination.faqs ?? [],
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
          href="/admin/destinations"
          className="text-sm text-blue-400 hover:underline"
        >
          Back to destinations →
        </Link>
      </div>
    );
  }

  if (!initial) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-28">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#19315d] border-t-blue-500" />
        <p className="text-sm text-slate-600">Loading destination...</p>
      </div>
    );
  }

  return <DestinationEditor mode="edit" destinationId={id} initial={initial} />;
}
