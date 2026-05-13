'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

const INDIAN_CITIES = [
  'Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Kolkata', 'Hyderabad',
  'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Amritsar',
  'Surat', 'Nagpur', 'Indore', 'Bhopal', 'Patna', 'Kochi',
  'Coimbatore', 'Vadodara', 'Ludhiana', 'Agra', 'Varanasi', 'Dehradun',
  'Jammu', 'Shimla', 'Manali', 'Guwahati', 'Ranchi', 'Visakhapatnam',
];

interface Props {
  availableSrc: string[];
  setAvailableSrc: (cities: string[]) => void;
}

export default function SourceCitySelector({ availableSrc, setAvailableSrc }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = (city: string) => {
    const lower = city.toLowerCase();
    if (availableSrc.includes(lower)) {
      setAvailableSrc(availableSrc.filter((c) => c !== lower));
    } else {
      setAvailableSrc([...availableSrc, lower]);
    }
  };

  const filtered = INDIAN_CITIES.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-3" ref={ref}>
      <label className="text-sm text-slate-400">
        Source Cities <span className="text-red-400">*</span>
      </label>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3 rounded-xl
          bg-[#07111f] border border-[#19315d]/60 text-sm transition
          hover:border-[#244278] focus:outline-none focus:ring-2 focus:ring-blue-500/40"
      >
        <span className={availableSrc.length > 0 ? 'text-white' : 'text-slate-600'}>
          {availableSrc.length > 0 ? `${availableSrc.length} city selected` : 'Select source cities'}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="rounded-xl border border-[#19315d]/60 bg-[#0b1730] shadow-xl shadow-black/40 overflow-hidden z-20 relative">
          {/* Search inside dropdown */}
          <div className="p-2 border-b border-[#19315d]/40">
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cities..."
              className="w-full px-3 py-2 rounded-lg text-sm bg-[#07111f] text-white placeholder-slate-600
                border border-[#19315d]/50 focus:outline-none focus:ring-1 focus:ring-blue-500/40"
            />
          </div>
          <div className="max-h-52 overflow-y-auto">
            {filtered.map((city) => {
              const lower = city.toLowerCase();
              const checked = availableSrc.includes(lower);
              return (
                <div
                  key={city}
                  onClick={() => toggle(city)}
                  className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition text-sm ${
                    checked
                      ? 'bg-blue-600/10 text-blue-300'
                      : 'text-slate-300 hover:bg-[#0f1e3a]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    readOnly
                    className="accent-blue-500 cursor-pointer w-3.5 h-3.5"
                  />
                  <span className="capitalize">{city}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected chips */}
      {availableSrc.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {availableSrc.map((city) => (
            <span
              key={city}
              className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-full
                bg-blue-600/15 text-blue-300 border border-blue-500/25 capitalize"
            >
              {city}
              <button
                type="button"
                onClick={() => setAvailableSrc(availableSrc.filter((c) => c !== city))}
                className="hover:text-red-400 transition"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
