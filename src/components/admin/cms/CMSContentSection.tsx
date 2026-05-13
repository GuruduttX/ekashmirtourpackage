'use client';

import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(
  () => import('@/components/admin/shared/RichTextEditor'),
  { ssr: false, loading: () => <div className="mt-2 h-80 rounded-xl bg-[#07111f] border border-[#19315d]/60 animate-pulse" /> }
);

const inp = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-[#07111f] text-white
  placeholder-slate-600
  border border-[#19315d]/60
  focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50
  transition text-sm resize-none
`;

interface CMSContentSectionProps {
  subContent: string;
  content: string;
  onChange: (field: string, value: string) => void;
}

export default function CMSContentSection({
  subContent,
  content,
  onChange,
}: CMSContentSectionProps) {
  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm text-slate-400">Sub Content / Excerpt</label>
        <textarea
          value={subContent}
          rows={3}
          placeholder="A short summary shown in blog cards and at the top of the article..."
          className={inp}
          onChange={(e) => onChange('subContent', e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm text-slate-400 flex items-center justify-between">
          <span>
            Main Content <span className="text-red-400">*</span>
          </span>
          <span className="text-slate-600 text-xs">Rich Text</span>
        </label>
        <RichTextEditor
          value={content}
          onChange={(html) => onChange('content', html)}
          minHeight="360px"
          maxHeight="620px"
        />
      </div>
    </div>
  );
}
