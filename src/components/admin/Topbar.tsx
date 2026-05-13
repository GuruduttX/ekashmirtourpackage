'use client';

import { Menu, Compass } from 'lucide-react';

interface TopbarProps {
  toggleSidebar: () => void;
}

export default function Topbar({ toggleSidebar }: TopbarProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#060e1a]/90 backdrop-blur-2xl border-b border-[#19315d]/40 px-4 md:px-8 py-0 h-20 flex items-center justify-between">
      {/* Left: hamburger + brand */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-400 hover:text-white hover:bg-[#0f1e3a] border border-transparent hover:border-[#19315d]/50 transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md shadow-blue-900/30">
            <Compass className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <span className="text-white font-semibold text-sm">eKashmir</span>
            <span className="text-slate-500 text-xs ml-1.5">CMS</span>
          </div>
        </div>
      </div>

      {/* Right: status + avatar */}
      <div className="flex items-center gap-3">
        {/* Live status pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0b1730] border border-[#19315d]/50 text-xs text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.5)]" />
          <span>System Online</span>
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-900/30 cursor-pointer hover:scale-105 transition-transform">
          A
        </div>
      </div>
    </header>
  );
}
