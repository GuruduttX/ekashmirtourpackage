'use client';

import { Loader2, Send, FileText } from 'lucide-react';

interface CMSActionsProps {
  status: 'draft' | 'published';
  isSaving: boolean;
  isSubmitting: boolean;
  onDraft: () => void;
  onStatusChange: (status: 'draft' | 'published') => void;
}

export default function CMSActions({
  status,
  isSaving,
  isSubmitting,
  onDraft,
  onStatusChange,
}: CMSActionsProps) {
  return (
    <div className="mt-8 pt-6 border-t border-[#19315d]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Status toggle */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-[#07111f] border border-[#19315d]/60">
        <button
          type="button"
          onClick={() => onStatusChange('draft')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            status === 'draft'
              ? 'bg-[#13254b] text-white border border-[#244278]'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Draft
        </button>
        <button
          type="button"
          onClick={() => onStatusChange('published')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            status === 'published'
              ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Published
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDraft}
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
            bg-[#0b1730] text-slate-300 border border-[#19315d]/60
            hover:bg-[#13254b] hover:text-white hover:border-[#244278]
            disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <FileText className="w-4 h-4" />
          )}
          Save Draft
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold
            bg-blue-600 text-white
            hover:bg-blue-500
            disabled:opacity-40 disabled:cursor-not-allowed transition-all
            shadow-lg shadow-blue-900/30"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {status === 'published' ? 'Publish' : 'Save & Set Draft'}
        </button>
      </div>
    </div>
  );
}
