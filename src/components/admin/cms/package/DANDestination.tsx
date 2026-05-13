'use client';

export const KASHMIR_DESTINATIONS = [
  'Gulmarg',
  'Dal Lake',
  'Pahalgam',
  'Sonamarg',
  'Srinagar',
  'Yusmarg',
  'Doodhpathri',
  'Betaab Valley',
  'Chandanwari',
  'Baisaran',
  'Aru Valley',
  'Bangus Valley',
  'Gurez Valley',
  'Naranag',
  'Lolab Valley',
  'Tulail Valley',
  'Sinthan Top',
  'Wular Lake',
  'Manasbal Lake',
  'Verinag',
];

const inp = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-[#07111f] text-white
  placeholder-slate-600
  border border-[#19315d]/60
  focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50
  transition text-sm cursor-pointer
`;

interface Props {
  destination: string;
  onChange: (field: string, value: string) => void;
}

export default function DANDestination({ destination, onChange }: Props) {
  return (
    <div>
      <label className="text-sm text-slate-400">
        Destination <span className="text-red-400">*</span>
      </label>
      <select
        required
        value={destination}
        onChange={(e) => onChange('destination', e.target.value)}
        className={inp}
      >
        <option value="" className="bg-[#0b1730]">Select Destination</option>
        {KASHMIR_DESTINATIONS.map((d) => (
          <option key={d} value={d} className="bg-[#0b1730]">{d}</option>
        ))}
      </select>
    </div>
  );
}
