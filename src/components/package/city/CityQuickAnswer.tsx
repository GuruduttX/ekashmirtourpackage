import { Sparkles } from "lucide-react";

interface CityQuickAnswerProps {
  question: string;
  answer: string;
}

/**
 * Compact "quick answer" block (AEO) — a direct, snippet-friendly response
 * shown near the top of a city hub page. Renders nothing when empty.
 */
export default function CityQuickAnswer({ question, answer }: CityQuickAnswerProps) {
  if (!answer?.trim()) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-sky-600">
              Quick Answer
            </p>
            {question?.trim() && (
              <h2 className="mt-1.5 text-lg font-bold text-slate-900 sm:text-xl">
                {question}
              </h2>
            )}
            <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-600">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
