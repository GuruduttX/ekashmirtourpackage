'use client';

import { motion } from 'framer-motion';
import { Save, Loader2, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

interface CMSActionsProps {
  status: 'draft' | 'published';
  onStatusChange: (status: 'draft' | 'published') => void;
  onSave: () => void;
  isSaving: boolean;
  backHref: string;
  saveLabel?: string;
}

export default function CMSActions({
  status,
  onStatusChange,
  onSave,
  isSaving,
  backHref,
  saveLabel = 'Save',
}: CMSActionsProps) {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.35, ease: 'easeOut' }}
      className="fixed bottom-0 left-0 right-0 z-30 bg-[#060e1a]/95 backdrop-blur-2xl border-t border-[#19315d]/50 px-4 md:px-8 py-4"
    >
      <div className="flex items-center justify-between gap-4">
        <Link
          href={backHref}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back</span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Status Toggle */}
          <div className="flex items-center gap-1 bg-[#0f1e3a] border border-[#19315d]/60 rounded-xl p-1">
            <button
              type="button"
              onClick={() => onStatusChange('draft')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                status === 'draft'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/25'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <EyeOff className="w-3 h-3" />
              Draft
            </button>
            <button
              type="button"
              onClick={() => onStatusChange('published')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                status === 'published'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Eye className="w-3 h-3" />
              Published
            </button>
          </div>

          {/* Save Button */}
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? 'Saving...' : saveLabel}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
