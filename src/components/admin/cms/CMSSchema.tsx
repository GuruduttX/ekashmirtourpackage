'use client';

const inp = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-[#07111f] text-white
  placeholder-slate-600
  border border-[#19315d]/60
  focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50
  transition text-sm
`;

interface CMSSchemaProps {
  schemaTitle: string;
  schemaDescription: string;
  onChange: (field: string, value: string) => void;
  editorType?: string;
}

export default function CMSSchema({
  schemaTitle,
  schemaDescription,
  onChange,
}: CMSSchemaProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <label className="text-sm text-slate-400">Schema Title</label>
        <input
          value={schemaTitle}
          placeholder="Schema.org article title"
          className={inp}
          onChange={(e) => onChange('schemaTitle', e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm text-slate-400">Schema Description</label>
        <input
          value={schemaDescription}
          placeholder="Schema.org article description"
          className={inp}
          onChange={(e) => onChange('schemaDescription', e.target.value)}
        />
      </div>
    </div>
  );
}
