'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  MapPin,
  Navigation,
  Tag,
  Clock,
  Car,
  BedDouble,
  Landmark,
  X,
  Compass,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

const menu = [
  { name: 'Dashboard', slug: '/admin', icon: LayoutDashboard, desc: 'Overview & stats' },
  { name: 'Blogs', slug: '/admin/blogs', icon: BookOpen, desc: 'Manage articles' },
  { name: 'Packages', slug: '/admin/packages', icon: MapPin, desc: 'Tour packages' },
  { name: 'Reviews', slug: '/admin/reviews', icon: BookOpen, desc: 'Manage customer reviews' },
  { name: 'Cabs', slug: '/admin/cabs', icon: Car, desc: 'Cab & taxi fleet' },
  { name: 'Temples', slug: '/admin/temples', icon: Landmark, desc: 'Temples & shrines' },
  { name: 'Stays', slug: '/admin/stays', icon: BedDouble, desc: 'Places, properties & types' },
  { name: 'Destinations', slug: '/admin/destinations', icon: Compass, desc: 'Destination pages' },
  { name: 'City Hubs', slug: '/admin/city-hubs', icon: Navigation, desc: 'Origin-city pages' },
  { name: 'Theme Hubs', slug: '/admin/theme-hubs', icon: Tag, desc: 'Theme-based pages' },
  { name: 'Duration Hubs', slug: '/admin/duration-hubs', icon: Clock, desc: 'Duration-based pages' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full w-72 z-50
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Glass background */}
      <div className="absolute inset-0 bg-[#060e1a]/95 backdrop-blur-2xl border-r border-[#19315d]/50" />

      {/* Ambient glow */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-600/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-500/5 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative flex flex-col h-full">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-[#19315d]/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-900/50">
                  <Compass className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#060e1a] shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight tracking-tight">eKashmir</p>
                <p className="text-slate-500 text-xs">Content Studio</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-white p-1.5 rounded-lg hover:bg-[#0f1e3a] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.15em] px-3 mb-3">
            Navigation
          </p>

          {menu.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.slug === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.slug);

            return (
              <Link
                key={item.slug}
                href={item.slug}
                onClick={onClose}
                className={`
                  group flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? 'bg-blue-600/15 border border-blue-600/25 shadow-sm shadow-blue-900/20'
                      : 'hover:bg-[#0f1e3a] border border-transparent'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-blue-600/20'
                        : 'bg-[#0f1e3a] group-hover:bg-[#13254b]'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`}
                    />
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium leading-tight ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}
                    >
                      {item.name}
                    </p>
                    <p className="text-[11px] text-slate-600 leading-tight">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-all ${
                    isActive ? 'text-blue-400' : 'text-slate-700 group-hover:text-slate-500 group-hover:translate-x-0.5'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-[#19315d]/40 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-slate-500 hover:text-white hover:bg-[#0f1e3a] transition-all text-xs font-medium"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Live Site
          </Link>
          <p className="text-[10px] text-slate-700 px-3">
            eKashmir CMS · v1.0.0
          </p>
        </div>
      </div>
    </aside>
  );
}
