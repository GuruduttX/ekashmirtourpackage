'use client';

import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(
  () => import('@/components/admin/shared/RichTextEditor'),
  { ssr: false, loading: () => <div className="mt-2 h-72 rounded-xl bg-[#07111f] border border-[#19315d]/60 animate-pulse" /> }
);

interface Props {
  overview: string;
  onChange: (field: string, value: string) => void;
}

export default function PackageOverview({ overview, onChange }: Props) {
  return (
    <div>
      <label className="text-sm text-slate-400">
        Package Overview <span className="text-red-400">*</span>
      </label>
      <RichTextEditor
        value={overview}
        onChange={(html) => onChange('overview', html)}
        minHeight="320px"
        maxHeight="560px"
      />
    </div>
  );
}
