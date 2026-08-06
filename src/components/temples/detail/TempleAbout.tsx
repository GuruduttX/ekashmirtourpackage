"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Landmark } from "lucide-react";
import SectionCard from "./SectionCard";
import type { ITempleTag } from "@/types/templeTypes";

const COLLAPSED_CHARS = 320;

export default function TempleAbout({
  about,
  tags = [],
}: {
  about: string;
  tags?: ITempleTag[];
}) {
  const [expanded, setExpanded] = useState(false);

  const visibleTags = tags.filter((t) => t.label?.trim());
  const needsToggle = about.length > COLLAPSED_CHARS;
  const preview = needsToggle ? `${about.slice(0, COLLAPSED_CHARS).trimEnd()}…` : about;

  return (
    <SectionCard icon={Landmark} title="About the Temple" accent>
      <p className="text-sm leading-relaxed text-slate-600">
        {expanded ? about : preview}
      </p>

      {needsToggle && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-3 flex items-center gap-1 text-sm font-semibold text-sky-500 transition-colors hover:text-sky-600"
        >
          {expanded ? "Read Less" : "Read More"}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      )}

      <AnimatePresence initial={false}>
        {visibleTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {visibleTags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full bg-sky-50 px-3.5 py-1.5 text-xs font-medium text-sky-600"
              >
                {tag.label}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </SectionCard>
  );
}
