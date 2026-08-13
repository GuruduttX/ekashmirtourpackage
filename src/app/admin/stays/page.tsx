'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BedDouble,
  Layers,
  MapPin,
  Plus,
  type LucideIcon,
} from 'lucide-react';

/**
 * /admin/stays — landing for everything under the stays silo.
 *
 * Places are live. Properties and Types are listed so the structure is visible,
 * but marked as not yet wired rather than linking to routes that do not exist.
 */

interface Area {
  name: string;
  description: string;
  href: string | null;
  createHref?: string;
  icon: LucideIcon;
  countKey?: 'places' | 'properties';
  note?: string;
}

const AREAS: Area[] = [
  {
    name: 'Place Pages',
    description:
      'Landing pages for each town and area — /stays/[place]-stays. Hero copy, Sartaj’s tips, FAQs and internal links.',
    href: '/admin/stays/places',
    createHref: '/admin/stays/places/create',
    icon: MapPin,
    countKey: 'places',
  },
  {
    name: 'Properties',
    description:
      'Individual houseboats, hotels, resorts and homestays. These populate every place and type listing.',
    href: '/admin/stays/properties',
    createHref: '/admin/stays/properties/create',
    icon: BedDouble,
    countKey: 'properties',
  },
  {
    name: 'Stay Types',
    description:
      'The four fixed category pages — houseboats, hotels, resorts, homestays. Static hero, listing driven by category.',
    href: null,
    icon: Layers,
    note: 'Hard-coded by design — four types only',
  },
];

export default function AdminStaysPage() {
  const [counts, setCounts] = useState<{
    places: number | null;
    properties: number | null;
  }>({ places: null, properties: null });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const [placesRes, propsRes] = await Promise.all([
          fetch('/api/stays/places', { cache: 'no-store' }),
          fetch('/api/stays/properties', { cache: 'no-store' }),
        ]);
        const places = await placesRes.json();
        const props = await propsRes.json();
        if (!cancelled) {
          setCounts({
            places: (places.places ?? []).length,
            properties: (props.stays ?? []).length,
          });
        }
      } catch {
        if (!cancelled) setCounts({ places: 0, properties: 0 });
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="min-h-screen pb-16">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-blue-50">Stays</h1>
        <p className="mt-0.5 text-sm text-blue-300/50">
          Everything under /stays — place pages, properties and type pages
        </p>
      </div>

      <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        {AREAS.map((area, idx) => {
          const Icon = area.icon;
          const count = area.countKey ? counts[area.countKey] : null;
          const isLive = Boolean(area.href);

          const card = (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06, duration: 0.3, ease: 'easeOut' }}
              className={`group relative h-full overflow-hidden rounded-2xl border bg-[#0b1730] p-6 transition-all duration-300 ${
                isLive
                  ? 'border-[#19315d]/40 hover:-translate-y-1 hover:border-[#244278]/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]'
                  : 'border-[#19315d]/25 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-600/25 bg-blue-600/15">
                  <Icon className="h-5 w-5 text-blue-400" />
                </div>

                {count !== null && (
                  <span className="rounded-full border border-[#19315d]/50 bg-[#07111f] px-2.5 py-1 text-xs font-semibold text-slate-400">
                    {count} page{count === 1 ? '' : 's'}
                  </span>
                )}
              </div>

              <h2 className="mt-4 text-base font-semibold text-white">{area.name}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{area.description}</p>

              {area.note && (
                <p className="mt-3 inline-block rounded-full border border-amber-600/20 bg-amber-600/5 px-2.5 py-1 text-[11px] text-amber-400/80">
                  {area.note}
                </p>
              )}

              {isLive && (
                <div className="mt-5 flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-sm font-medium text-blue-400">
                    Manage
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              )}
            </motion.div>
          );

          return (
            <div key={area.name} className="relative">
              {isLive ? <Link href={area.href!}>{card}</Link> : card}

              {area.createHref && (
                <Link
                  href={area.createHref}
                  className="absolute bottom-6 right-6 flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-blue-500"
                >
                  <Plus className="h-3.5 w-3.5" /> New
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
