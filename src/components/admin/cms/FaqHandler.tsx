'use client';

import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const inp = `
  mt-1.5 w-full px-4 py-2.5 rounded-xl
  bg-[#07111f] text-white
  placeholder-slate-600
  border border-[#19315d]/60
  focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50
  transition text-sm
`;

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqHandlerProps {
  faqs: FaqItem[];
  setFaqs: (faqs: FaqItem[]) => void;
}

export default function FaqHandler({ faqs, setFaqs }: FaqHandlerProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const add = () => {
    const id = crypto.randomUUID();
    setFaqs([...faqs, { id, question: '', answer: '' }]);
    setExpanded(id);
  };

  const remove = (id: string) => {
    setFaqs(faqs.filter((f) => f.id !== id));
    if (expanded === id) setExpanded(null);
  };

  const update = (id: string, field: 'question' | 'answer', value: string) => {
    setFaqs(faqs.map((f) => (f.id === id ? { ...f, [field]: value } : f)));
  };

  return (
    <div className="space-y-3">
      {faqs.length === 0 && (
        <p className="text-sm text-slate-600 text-center py-6 rounded-xl border border-dashed border-[#19315d]/40">
          No FAQs yet — add your first one below
        </p>
      )}

      {faqs.map((faq, index) => (
        <div
          key={faq.id}
          className="rounded-xl border border-[#19315d]/50 bg-[#07111f] overflow-hidden"
        >
          <button
            type="button"
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#0b1730]/60 transition"
            onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
          >
            <span className="text-sm text-slate-300 font-medium flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#13254b] border border-[#244278] text-blue-300 text-xs flex items-center justify-center shrink-0">
                {index + 1}
              </span>
              {faq.question || <span className="text-slate-600 italic">Untitled FAQ</span>}
            </span>
            <div className="flex items-center gap-2">
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => { e.stopPropagation(); remove(faq.id); }}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); remove(faq.id); } }}
                className="p-1 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-400/10 transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </span>
              {expanded === faq.id ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </div>
          </button>

          {expanded === faq.id && (
            <div className="px-4 pb-4 space-y-3 border-t border-[#19315d]/30">
              <div>
                <label className="text-xs text-slate-500 mt-3 block">Question</label>
                <input
                  value={faq.question}
                  placeholder="What is...?"
                  className={inp}
                  onChange={(e) => update(faq.id, 'question', e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">Answer</label>
                <textarea
                  value={faq.answer}
                  rows={3}
                  placeholder="The answer to the question..."
                  className={`${inp} resize-none`}
                  onChange={(e) => update(faq.id, 'answer', e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
          border border-dashed border-[#19315d]/60 text-slate-500 text-sm
          hover:border-blue-500/40 hover:text-blue-400 hover:bg-blue-500/5
          transition-all"
      >
        <Plus className="w-4 h-4" />
        Add FAQ
      </button>
    </div>
  );
}
