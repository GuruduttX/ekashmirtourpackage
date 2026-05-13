'use client';

const inp = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-[#07111f] text-white
  placeholder-slate-600
  border border-[#19315d]/60
  focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50
  transition text-sm
`;

interface CMSSeoSectionProps {
  metaTitle: string;
  metaDescription: string;
  onChange: (field: string, value: string) => void;
  editorType?: string;
}

export default function CMSSeoSection({
  metaTitle,
  metaDescription,
  onChange,
}: CMSSeoSectionProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="text-sm text-slate-400">
            Meta Title <span className="text-slate-600">({metaTitle.length}/60)</span>
          </label>
          <input
            value={metaTitle}
            required
            placeholder="SEO-optimised page title"
            className={inp}
            onChange={(e) => onChange('metaTitle', e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-slate-400">
            Meta Description <span className="text-slate-600">({metaDescription.length}/160)</span>
          </label>
          <input
            value={metaDescription}
            required
            placeholder="Brief SEO description for search results"
            className={inp}
            onChange={(e) => onChange('metaDescription', e.target.value)}
          />
        </div>
      </div>

      {/* SEO Preview */}
      {(metaTitle || metaDescription) && (
        <div className="rounded-xl border border-[#19315d]/40 bg-[#07111f] p-4">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-2">Google Preview</p>
          <p className="text-blue-400 text-sm font-medium truncate">{metaTitle || 'Page title'}</p>
          <p className="text-emerald-600 text-xs mt-0.5">ekashmirtours.com › blog</p>
          <p className="text-slate-500 text-xs mt-1 line-clamp-2">{metaDescription || 'Meta description...'}</p>
        </div>
      )}
    </div>
  );
}
