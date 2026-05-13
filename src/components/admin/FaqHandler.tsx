'use client';

import { Plus, Trash2, MessageSquare } from 'lucide-react';

interface Faq {
  id: string;
  question: string;
  answer: string;
}

interface FaqHandlerProps {
  faqs: Faq[];
  onChange: (faqs: Faq[]) => void;
}

const inputCls =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';

export default function FaqHandler({ faqs, onChange }: FaqHandlerProps) {
  const add = () =>
    onChange([
      ...faqs,
      { id: crypto.randomUUID(), question: '', answer: '' },
    ]);

  const remove = (id: string) => onChange(faqs.filter((f) => f.id !== id));

  const update = (id: string, field: 'question' | 'answer', value: string) =>
    onChange(faqs.map((f) => (f.id === id ? { ...f, [field]: value } : f)));

  return (
    <div className="space-y-3">
      {faqs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 rounded-xl border border-dashed border-[#19315d]/40 text-slate-600">
          <MessageSquare className="w-6 h-6 mb-2" />
          <p className="text-sm">No FAQs yet</p>
        </div>
      )}

      {faqs.map((faq, idx) => (
        <div
          key={faq.id}
          className="rounded-xl border border-[#19315d]/50 bg-[#07111f]/60 p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              FAQ #{idx + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(faq.id)}
              className="text-slate-600 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-red-500/10"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <input
            className={inputCls}
            placeholder="Question"
            value={faq.question}
            onChange={(e) => update(faq.id, 'question', e.target.value)}
          />
          <textarea
            className={`${inputCls} min-h-[80px] resize-none`}
            placeholder="Answer"
            value={faq.answer}
            onChange={(e) => update(faq.id, 'answer', e.target.value)}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center"
      >
        <Plus className="w-4 h-4" />
        Add FAQ
      </button>
    </div>
  );
}
