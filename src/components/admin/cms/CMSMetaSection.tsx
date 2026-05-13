'use client';

export const BLOG_CATEGORIES = [
  'Gulmarg Guide',
  'Dal Lake Guide',
  'Pahalgam Guide',
  'Sonamarg Guide',
  'Srinagar Guide',
  'Kashmir Travel Tips',
  'Things to Do in Kashmir',
  'Kashmir Adventure',
  'Kashmir Culture & Heritage',
  'Food in Kashmir',
  'Hotels in Kashmir',
  'Tour Packages Guide',
  'Kashmir Photography',
  'Winter in Kashmir',
  'Kashmir Wildlife',
  'Budget Travel Kashmir',
  'Luxury Kashmir',
  'Festivals & Events',
  'Travel Guides',
  'Latest Updates',
];

const inp = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-[#07111f] text-white
  placeholder-slate-600
  border border-[#19315d]/60
  focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50
  transition text-sm
`;

interface CMSMetaSectionProps {
  title: string;
  category: string;
  slug: string;
  onChange: (field: string, value: string) => void;
  editorType: string;
  /** Pass a list to render a <select>; omit for a free-text <input> */
  categories?: string[];
}

export default function CMSMetaSection({
  title,
  category,
  slug,
  onChange,
  editorType,
  categories,
}: CMSMetaSectionProps) {
  const cats = categories ?? BLOG_CATEGORIES;

  return (
    <div className="space-y-5">
      {/* Title */}
      <div>
        <label className="text-sm text-slate-400">{editorType} Title <span className="text-red-400">*</span></label>
        <input
          value={title}
          required
          placeholder={`Enter a compelling ${editorType.toLowerCase()} title...`}
          className={inp}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>

      {/* Category + Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="text-sm text-slate-400">Category <span className="text-red-400">*</span></label>
          {cats.length > 0 ? (
            <select
              required
              value={category}
              onChange={(e) => onChange('category', e.target.value)}
              className={`${inp} cursor-pointer`}
            >
              <option value="" className="bg-[#0b1730]">Select Category</option>
              {cats.map((cat) => (
                <option key={cat} value={cat} className="bg-[#0b1730]">
                  {cat}
                </option>
              ))}
            </select>
          ) : (
            <input
              value={category}
              placeholder="e.g. Adventure, Luxury"
              className={inp}
              onChange={(e) => onChange('category', e.target.value)}
            />
          )}
        </div>

        <div>
          <label className="text-sm text-slate-400">
            Slug <span className="text-red-400">*</span>
          </label>
          <input
            value={slug}
            required
            placeholder="your-url-slug-here"
            className={inp}
            onChange={(e) => onChange('slug', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
