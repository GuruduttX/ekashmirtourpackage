import { ReactNode } from "react";

interface BlogLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function BlogLayout({ children, sidebar }: BlogLayoutProps) {
  return (
    <section className="relative py-8 sm:py-20 lg:py-10">
      {/* Ambient Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8rem] top-[10%] h-[22rem] w-[22rem] rounded-full bg-sky-400/10 blur-[140px]" />
        <div className="absolute right-[-6rem] top-[30%] h-[18rem] w-[18rem] rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="absolute bottom-[-8rem] left-1/3 h-[24rem] w-[24rem] rounded-full bg-sky-300/10 blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[92rem] px-5 sm:px-8 lg:px-10">
        {/*
          Simple 2-col grid:
          - lg:grid-cols-[1fr_380px] gives main all remaining space, sidebar a fixed 380px
          - items-start is CRITICAL — prevents grid from stretching both columns to equal height
            which would make sticky have no room to scroll within
        */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-14 xl:gap-16">
          {/* LEFT: Blog Content — takes all remaining space */}
          <main className="min-w-0">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-sky-100/80 bg-white/70 backdrop-blur-2xl shadow-[0_25px_100px_rgba(14,165,233,0.08)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_28%)]" />
              <div className="relative p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14">
                {children}
              </div>
            </div>
          </main>

          {/*
            RIGHT: Sticky Sidebar
            - NO self-start here — items-start on the grid handles alignment
            - sticky + top-10 on the inner div does the actual sticking
            - NO overflow-hidden on this aside or any of its wrappers — that breaks sticky
          */}
          <aside className="sticky top-10">
            <div>
              <div className="relative rounded-[2rem] border border-white/60 bg-white/75 backdrop-blur-2xl shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
                {/* These glow orbs are inside a non-overflow-hidden parent, so sticky is safe */}
                <div className="absolute -right-16 top-0 h-40 w-40 rounded-full bg-sky-400/10 blur-[90px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-cyan-400/10 blur-[80px] pointer-events-none" />
                <div className="relative p-6">{sidebar}</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
