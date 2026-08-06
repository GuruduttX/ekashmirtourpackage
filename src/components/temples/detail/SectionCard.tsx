import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Shared white card used by every section on the temple detail page.
 * Left-column cards carry a gradient accent bar; right-column cards don't.
 */
export default function SectionCard({
  icon: Icon,
  title,
  accent = false,
  children,
  className = "",
}: {
  icon: LucideIcon;
  title: string;
  /** Renders the gradient bar down the left edge (used by the main column). */
  accent?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      {accent && (
        <span
          aria-hidden
          className="absolute inset-y-5 left-0 w-1.5 rounded-r-full bg-linear-to-b from-sky-500 to-cyan-400"
        />
      )}

      <h2 className="mb-4 flex items-center gap-2.5 font-heading text-lg font-bold text-slate-900 sm:text-xl">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-500">
          <Icon className="h-4.5 w-4.5" />
        </span>
        {title}
      </h2>

      {children}
    </section>
  );
}
