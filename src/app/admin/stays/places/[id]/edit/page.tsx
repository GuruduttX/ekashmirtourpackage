'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import StayPlaceEditor, {
  EMPTY_STAY_PLACE,
  type StayPlaceFormValues,
} from '@/components/admin/stays/StayPlaceEditor';

export default function EditStayPlacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [initial, setInitial] = useState<StayPlaceFormValues | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/stays/places/${id}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Stay place not found');
        const { place } = await res.json();
        // Merge over the empty shape so a record saved before a field existed
        // still loads with that field defined.
        setInitial({
          ...EMPTY_STAY_PLACE,
          ...place,
          heroImage: { ...EMPTY_STAY_PLACE.heroImage, ...(place.heroImage ?? {}) },
          sartajTips: place.sartajTips ?? [],
          faqs: place.faqs ?? [],
          internalLinks: place.internalLinks ?? [],
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load');
      }
    })();
  }, [id]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-28 text-slate-500">
        <AlertTriangle className="h-9 w-9 text-red-400" />
        <p className="text-sm font-medium">{error}</p>
        <Link href="/admin/stays/places" className="text-sm text-blue-400 hover:underline">
          Back to stay places →
        </Link>
      </div>
    );
  }

  if (!initial) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-28">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#19315d] border-t-blue-500" />
        <p className="text-sm text-slate-600">Loading stay place...</p>
      </div>
    );
  }

  return <StayPlaceEditor mode="edit" placeId={id} initial={initial} />;
}
