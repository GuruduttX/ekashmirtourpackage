'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Plus } from 'lucide-react';
import { THEMES as PRESET_THEMES } from '@/lib/themes';

interface Props {
  themes: string[];
  setThemes: (themes: string[]) => void;
}

export default function ThemeSelector({ themes, setThemes }: Props) {
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

  const toggle = (theme: string) => {
    if (themes.includes(theme)) {
      setThemes(themes.filter((t) => t !== theme));
    } else {
      setThemes([...themes, theme]);
    }
  };

  const addCustom = () => {
    const value = search.trim();
    if (value && !themes.includes(value)) {
      setThemes([...themes, value]);
    }
    setSearch('');
  };

  const filtered = PRESET_THEMES.filter((t) =>
    t.toLowerCase().includes(search.toLowerCase())
  );
  const exactExists = PRESET_THEMES.some((t) => t.toLowerCase() === search.trim().toLowerCase()) ||
    themes.some((t) => t.toLowerCase() === search.trim().toLowerCase());

  return (
    <div className="space-y-3" ref={ref}>
      <label className="text-sm text-slate-400">Themes</label>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3 rounded-xl
          bg-[#07111f] border border-[#19315d]/60 text-sm transition
          hover:border-[#244278] focus:outline-none focus:ring-2 focus:ring-blue-500/40"
      >
        <span className={themes.length > 0 ? 'text-white' : 'text-slate-600'}>
          {themes.length > 0 ? `${themes.length} theme${themes.length > 1 ? 's' : ''} selected` : 'Select themes'}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="rounded-xl border border-[#19315d]/60 bg-[#0b1730] shadow-xl shadow-black/40 overflow-hidden z-20 relative">
          {/* Search / custom-add inside dropdown */}
          <div className="p-2 border-b border-[#19315d]/40">
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') { e.preventDefault(); addCustom(); }
              }}
              placeholder="Search or type a custom theme..."
              className="w-full px-3 py-2 rounded-lg text-sm bg-[#07111f] text-white placeholder-slate-600
                border border-[#19315d]/50 focus:outline-none focus:ring-1 focus:ring-blue-500/40"
            />
          </div>
          <div className="max-h-52 overflow-y-auto">
            {filtered.map((theme) => {
              const checked = themes.includes(theme);
              return (
                <div
                  key={theme}
                  onClick={() => toggle(theme)}
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
                  <span>{theme}</span>
                </div>
              );
            })}
            {/* Add custom theme option */}
            {search.trim() && !exactExists && (
              <div
                onClick={addCustom}
                className="flex items-center gap-2 px-4 py-2.5 cursor-pointer transition text-sm text-emerald-300 hover:bg-[#0f1e3a]"
              >
                <Plus className="w-3.5 h-3.5" />
                Add &quot;{search.trim()}&quot;
              </div>
            )}
          </div>
        </div>
      )}

      {/* Selected chips */}
      {themes.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {themes.map((theme) => (
            <span
              key={theme}
              className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-full
                bg-blue-600/15 text-blue-300 border border-blue-500/25"
            >
              {theme}
              <button
                type="button"
                onClick={() => setThemes(themes.filter((t) => t !== theme))}
                className="hover:text-red-400 transition"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <p className="text-xs text-slate-500">
        A package can belong to multiple themes and will appear on every matching theme hub page.
      </p>
    </div>
  );
}
