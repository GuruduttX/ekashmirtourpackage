"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Landmark } from "lucide-react";
import SectionCard from "./SectionCard";

interface Tab {
  key: string;
  label: string;
  body: string;
}

export default function TempleHistorySignificance({
  history,
  mythology,
  significance,
}: {
  history?: string;
  mythology?: string;
  significance?: string;
}) {
  const tabs: Tab[] = [
    { key: "history", label: "History", body: history ?? "" },
    { key: "mythology", label: "Mythology", body: mythology ?? "" },
    { key: "significance", label: "Significance", body: significance ?? "" },
  ].filter((t) => t.body.trim());

  const [activeKey, setActiveKey] = useState(tabs[0]?.key);

  if (tabs.length === 0) return null;

  const active = tabs.find((t) => t.key === activeKey) ?? tabs[0];

  return (
    <SectionCard icon={Landmark} title="History & Significance" accent>
      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveKey(tab.key)}
            aria-pressed={tab.key === active.key}
            className="relative overflow-hidden rounded-full bg-sky-50 px-4 py-1.5 text-sm font-medium"
          >
            {tab.key === active.key && (
              <motion.span
                layoutId="temple-history-tab"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 rounded-full bg-linear-to-r from-sky-500 to-cyan-400"
              />
            )}
            <span
              className={`relative z-10 ${
                tab.key === active.key ? "text-white" : "text-sky-600"
              }`}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={active.key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="text-sm leading-relaxed text-slate-600"
        >
          {active.body}
        </motion.p>
      </AnimatePresence>
    </SectionCard>
  );
}
