"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Car, ChevronDown } from "lucide-react";
import CabCard, { type CabItem } from "@/components/cab-service/CabCard";
import CabFilters from "@/components/cab-service/CabFilters";

const PAGE_SIZE = 6;

export default function CabServiceHubView({ cabs }: { cabs: CabItem[] }) {
  const [search, setSearch] = useState("");
  const [cabType, setCabType] = useState("All");
  const [fuelType, setFuelType] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Derive filter options from the data actually present.
  const cabTypes = useMemo(
    () => ["All", ...Array.from(new Set(cabs.map((c) => c.cabType).filter(Boolean) as string[]))],
    [cabs]
  );
  const fuelTypes = useMemo(
    () => ["All", ...Array.from(new Set(cabs.map((c) => c.fuelType).filter(Boolean) as string[]))],
    [cabs]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return cabs.filter((c) => {
      const matchSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        (c.cabType ?? "").toLowerCase().includes(q);
      const matchCab = cabType === "All" || c.cabType === cabType;
      const matchFuel = fuelType === "All" || c.fuelType === fuelType;
      return matchSearch && matchCab && matchFuel;
    });
  }, [cabs, search, cabType, fuelType]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const filterProps = {
    search,
    setSearch,
    cabTypes,
    cabType,
    setCabType,
    fuelTypes,
    fuelType,
    setFuelType,
  };

  return (
    <section className="w-full bg-linear-to-b from-sky-50/60 to-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <h2 className="text-center font-heading text-3xl font-extrabold sm:text-4xl">
          <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
            Premium Taxi Services
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base font-medium leading-relaxed text-slate-500 sm:text-lg">
          Choose from our fleet of verified cabs — filter by type and fuel to
          find the ride that fits your Kashmir trip.
        </p>

        {/* Mobile filter toggle bar */}
        <div className="mt-6 lg:hidden">
          <button
            type="button"
            onClick={() => setFiltersOpen((o) => !o)}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-md shadow-black/5"
          >
            <span className="flex items-center gap-2.5 text-lg font-bold text-slate-900">
              <span className="h-5 w-1 rounded-full bg-linear-to-b from-sky-500 to-cyan-400" />
              Filters
            </span>
            <ChevronDown
              className={`h-5 w-5 text-slate-500 transition-transform ${filtersOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence initial={false}>
            {filtersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-md shadow-black/5">
                  <CabFilters {...filterProps} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[260px_1fr] lg:gap-8">
          {/* Desktop filter sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-slate-100 bg-white p-6 shadow-md shadow-black/5">
              <p className="mb-5 flex items-center gap-2.5 text-lg font-bold text-slate-900">
                <span className="h-5 w-1 rounded-full bg-linear-to-b from-sky-500 to-cyan-400" />
                Filters
              </p>
              <CabFilters {...filterProps} />
            </div>
          </aside>

          {/* Cards */}
          <div className="min-w-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-200 py-20 text-slate-500">
                <Car className="h-8 w-8" />
                <p>No cabs match your filters.</p>
              </div>
            ) : (
              <>
                {/* Mobile: vertical list · Desktop: grid */}
                <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 lg:gap-6 xl:grid-cols-3">
                  {visible.map((cab) => (
                    <div key={cab._id}>
                      <CabCard cab={cab} />
                    </div>
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                      className="rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-10 py-3 font-semibold text-white shadow-lg shadow-sky-200 transition-transform hover:-translate-y-0.5"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
