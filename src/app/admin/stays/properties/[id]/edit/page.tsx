'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import StayEditor, {
  EMPTY_STAY,
  type StayFormValues,
} from '@/components/admin/stays/StayEditor';

export default function EditStayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [initial, setInitial] = useState<StayFormValues | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`/api/stays/properties/${id}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Stay not found');
        const { stay } = await res.json();
        if (cancelled) return;

        // Merge over the empty shape so records saved before a field existed
        // still load, and cast the numeric fields back to strings for inputs.
        setInitial({
          ...EMPTY_STAY,
          ...stay,
          heroImage: { ...EMPTY_STAY.heroImage, ...(stay.heroImage ?? {}) },
          quickInclusions: {
            ...EMPTY_STAY.quickInclusions,
            ...(stay.quickInclusions ?? {}),
          },
          placeTags: stay.placeTags ?? [],
          gallery: stay.gallery ?? [],
          highlights: stay.highlights ?? [],
          amenities: stay.amenities ?? [],
          inclusions: stay.inclusions ?? [],
          exclusions: stay.exclusions ?? [],
          houseRules: stay.houseRules ?? [],
          sartajTips: stay.sartajTips ?? [],
          faqs: stay.faqs ?? [],
          internalLinks: stay.internalLinks ?? [],
          priceFrom: String(stay.priceFrom ?? ''),
          sleeps: String(stay.sleeps ?? ''),
          bedrooms: String(stay.bedrooms ?? ''),
          minNights: String(stay.minNights ?? '1'),
        });
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load');
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
        <Link href="/admin/stays/properties" className="text-sm text-blue-400 hover:underline">
          Back to stays →
        </Link>
      </div>
    );
  }

  if (!initial) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-28">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#19315d] border-t-blue-500" />
        <p className="text-sm text-slate-600">Loading stay...</p>
      </div>
    );
  }

  return <StayEditor mode="edit" stayId={id} initial={initial} />;
}
