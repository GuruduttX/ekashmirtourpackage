"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Landmark, ChevronDown } from "lucide-react";
import TempleCard, { type TempleItem } from "@/components/temples/TempleCard";
import TempleFilters from "@/components/temples/TempleFilters";

const PAGE_SIZE = 6;

const CATEGORIES = ["All", "Temples", "Shrines"] as const;
type Category = (typeof CATEGORIES)[number];

function CategoryPills({
  category,
  setCategory,
}: {
  category: Category;
  setCategory: (c: Category) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-sky-100/70 p-1.5">
      {CATEGORIES.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => setCategory(c)}
          className="relative rounded-full px-6 py-2 text-sm font-semibold"
        >
          {category === c && (
            <motion.span
              layoutId="temple-category-pill-highlight"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 rounded-full bg-white shadow-md shadow-black/10"
            />
          )}
          <span className={`relative z-10 ${category === c ? "text-sky-600" : "text-sky-700/70"}`}>
            {c}
          </span>
        </button>
      ))}
    </div>
  );
}

export default function TempleHubView({ temples }: { temples: TempleItem[] }) {
  const [search, setSearch] = useState("");
  const [templeType, setTempleType] = useState("All");
  const [location, setLocation] = useState("All");
  const [category, setCategory] = useState<Category>("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const templeTypes = useMemo(
    () => ["All", ...Array.from(new Set(temples.map((t) => t.templeType).filter(Boolean) as string[]))],
    [temples]
  );
  const locations = useMemo(
    () => ["All", ...Array.from(new Set(temples.map((t) => t.location).filter(Boolean) as string[]))],
    [temples]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return temples.filter((t) => {
      const matchSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        (t.location ?? "").toLowerCase().includes(q);
      const matchType = templeType === "All" || t.templeType === templeType;
      const matchLocation = location === "All" || t.location === location;
      const matchCategory =
        category === "All" ||
        (category === "Temples" ? t.templeType === "Temple" : t.templeType !== "Temple");
      return matchSearch && matchType && matchLocation && matchCategory;
    });
  }, [temples, search, templeType, location, category]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const filterProps = {
    search,
    setSearch,
    templeTypes,
    templeType,
    setTempleType,
    locations,
    location,
    setLocation,
  };

  return (
    <section id="all-temples" className="w-full bg-linear-to-b from-sky-50/60 to-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <h2 className="text-center font-heading text-3xl font-extrabold sm:text-4xl">
          <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
            Temples & Shrine
          </span>{" "}
          <span className="text-slate-900">to Visit</span>
        </h2>

        {/* Desktop category pill toggle */}
        <div className="mt-6 hidden justify-center lg:flex">
          <CategoryPills category={category} setCategory={setCategory} />
        </div>

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
                  <TempleFilters {...filterProps} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 lg:mt-10">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-200 py-20 text-slate-500">
              <Landmark className="h-8 w-8" />
              <p>No temples match your filters.</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6">
                {visible.map((temple) => (
                  <div key={temple._id}>
                    <TempleCard temple={temple} />
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
    </section>
  );
}
