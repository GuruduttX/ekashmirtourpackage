'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface CMSSectionProps {
  title: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
  badge?: string | number;
}

export default function CMSSection({
  title,
  icon,
  defaultOpen = true,
  children,
  badge,
}: CMSSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-[#19315d]/50 bg-[#0b1730]/50 backdrop-blur-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#0f1e3a]/40 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-blue-400">{icon}</span>}
          <span className="font-semibold text-white text-sm">{title}</span>
          {badge !== undefined && (
            <span className="text-[11px] bg-blue-600/15 text-blue-400 border border-blue-600/25 px-2 py-0.5 rounded-full font-medium">
              {badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-1 border-t border-[#19315d]/30">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
