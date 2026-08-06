"use client";

import { Search } from "lucide-react";

interface CabFiltersProps {
  search: string;
  setSearch: (v: string) => void;
  cabTypes: string[];
  cabType: string;
  setCabType: (v: string) => void;
  fuelTypes: string[];
  fuelType: string;
  setFuelType: (v: string) => void;
}

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-linear-to-r from-sky-500 to-cyan-400 text-white shadow-sm shadow-sky-200"
          : "border border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-600"
      }`}
    >
      {children}
    </button>
  );
}

export default function CabFilters({
  search,
  setSearch,
  cabTypes,
  cabType,
  setCabType,
  fuelTypes,
  fuelType,
  setFuelType,
}: CabFiltersProps) {
  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search"
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-700 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
        />
      </div>

      {/* Cab Type */}
      <div>
        <p className="mb-2.5 text-sm font-bold text-sky-600">Cab Type</p>
        <div className="flex flex-wrap gap-2">
          {cabTypes.map((t) => (
            <Chip key={t} active={cabType === t} onClick={() => setCabType(t)}>
              {t}
            </Chip>
          ))}
        </div>
      </div>

      {/* Fuel Type */}
      <div>
        <p className="mb-2.5 text-sm font-bold text-sky-600">Fuel Type</p>
        <div className="flex flex-wrap gap-2">
          {fuelTypes.map((t) => (
            <Chip key={t} active={fuelType === t} onClick={() => setFuelType(t)}>
              {t}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}
