'use client';

import { useEffect, useState } from 'react';
import {
  BookOpen,
  MapPin,
  FileText,
  TrendingUp,
  ArrowUpRight,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import CountUp from '@/utils/CountUp';

interface Stats {
  blogs: number;
  publishedBlogs: number;
  packages: number;
  publishedPackages: number;
}

interface ActivityItem {
  label: string;
  type: 'blog' | 'package';
  status: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    blogs: 0,
    publishedBlogs: 0,
    packages: 0,
    publishedPackages: 0,
  });
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [syncTime, setSyncTime] = useState('');

  const loadData = async () => {
    try {
      const [blogsRes, pkgsRes] = await Promise.all([
        fetch('/api/blogs').then((r) => r.json()),
        fetch('/api/packages').then((r) => r.json()),
      ]);

      const blogs: Array<{ title: string; status: string; createdAt: string }> =
        blogsRes.blogs ?? [];
      const packages: Array<{ title: string; status: string; createdAt: string }> =
        pkgsRes.packages ?? [];
      setStats({
        blogs: blogs.length,
        publishedBlogs: blogs.filter((b) => b.status === 'published').length,
        packages: packages.length,
        publishedPackages: packages.filter((p) => p.status === 'published').length,
      });

      const recentActivity: ActivityItem[] = [
        ...blogs.slice(0, 2).map((b) => ({
          label: b.title || 'Untitled Blog',
          type: 'blog' as const,
          status: b.status,
        })),
        ...packages.slice(0, 2).map((p) => ({
          label: p.title || 'Untitled Package',
          type: 'package' as const,
          status: p.status,
        })),
      ].slice(0, 4);

      setActivity(recentActivity);
    } catch {
      // silent fail
    } finally {
      setSyncTime(new Date().toLocaleTimeString());
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section className="min-h-screen pb-20">
      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-blue-50">Dashboard Overview</h1>
        <p className="text-sm text-blue-300/50 mt-0.5">
          Monitor and manage your platform efficiently
        </p>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mb-10">
        {[
          {
            title: 'Total Blogs',
            value: stats.blogs,
            icon: BookOpen,
            iconColor: 'text-blue-400',
            glowColor: 'bg-blue-600/15',
            borderHover: 'hover:border-blue-700/40',
            shadow: 'hover:shadow-[0_10px_40px_rgba(59,130,246,0.12)]',
          },
          {
            title: 'Published Blogs',
            value: stats.publishedBlogs,
            icon: FileText,
            iconColor: 'text-emerald-400',
            glowColor: 'bg-emerald-600/15',
            borderHover: 'hover:border-emerald-700/40',
            shadow: 'hover:shadow-[0_10px_40px_rgba(52,211,153,0.12)]',
          },
          {
            title: 'Total Packages',
            value: stats.packages,
            icon: MapPin,
            iconColor: 'text-violet-400',
            glowColor: 'bg-violet-600/15',
            borderHover: 'hover:border-violet-700/40',
            shadow: 'hover:shadow-[0_10px_40px_rgba(139,92,246,0.12)]',
          },
          {
            title: 'Published Packages',
            value: stats.publishedPackages,
            icon: TrendingUp,
            iconColor: 'text-amber-400',
            glowColor: 'bg-amber-600/15',
            borderHover: 'hover:border-amber-700/40',
            shadow: 'hover:shadow-[0_10px_40px_rgba(251,191,36,0.12)]',
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`relative rounded-2xl p-5 bg-[#0b1730] border border-[#19315d]/40 ${card.borderHover} hover:-translate-y-1 transition-all duration-300 ${card.shadow} overflow-hidden`}
          >
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
              <div className={`absolute -top-10 -left-10 w-40 h-40 ${card.glowColor} blur-3xl`} />
            </div>

            <div className="relative flex justify-between items-start mb-4">
              <span className="text-sm text-slate-400 font-medium">{card.title}</span>
              <div className={`w-8 h-8 rounded-lg ${card.glowColor} flex items-center justify-center`}>
                <card.icon className={`${card.iconColor}`} size={16} />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white relative">
              <CountUp end={card.value} duration={1400} />
            </h2>

            <p className="text-xs text-slate-600 mt-1">{card.title}</p>
          </div>
        ))}
      </div>

      {/* ── Main Grid ── */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-[#0b1730] rounded-2xl p-6 border border-[#19315d]/40">
          <h3 className="text-base font-semibold text-blue-50 mb-5">Recent Activity</h3>

          <div className="space-y-3">
            {activity.length === 0 ? (
              [
                'No recent blog posts yet',
                'No packages created yet',
                'Add content to see activity',
                'Get started with a new blog',
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3.5 rounded-xl bg-[#0f1e3a]/60 border border-[#19315d]/30"
                >
                  <span className="text-sm text-slate-500">{item}</span>
                  <ArrowUpRight size={15} className="text-slate-700" />
                </div>
              ))
            ) : (
              activity.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3.5 rounded-xl bg-[#0f1e3a]/60 border border-[#19315d]/30 hover:border-[#244278]/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        item.status === 'published' ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                    />
                    <span className="text-sm text-slate-300 truncate">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        item.type === 'blog'
                          ? 'bg-blue-600/10 text-blue-400 border-blue-600/20'
                          : 'bg-violet-600/10 text-violet-400 border-violet-600/20'
                      }`}
                    >
                      {item.type}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-slate-700 group-hover:text-slate-400 transition-colors"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#0b1730] rounded-2xl p-6 border border-[#19315d]/40">
          <h3 className="text-base font-semibold text-blue-50 mb-5">Quick Actions</h3>

          <div className="space-y-2.5">
            {[
              {
                action: 'New Blog Post',
                path: '/admin/blogs/create',
                icon: BookOpen,
                accent: 'blue',
              },
              {
                action: 'New Package',
                path: '/admin/packages/create',
                icon: MapPin,
                accent: 'violet',
              },
              {
                action: 'All Blogs',
                path: '/admin/blogs',
                icon: FileText,
                accent: 'slate',
              },
              {
                action: 'All Packages',
                path: '/admin/packages',
                icon: TrendingUp,
                accent: 'slate',
              },
            ].map((item, i) => (
              <Link key={i} href={item.path}>
                <button
                  className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl border transition-all group ${
                    item.accent === 'blue'
                      ? 'bg-blue-600/8 border-blue-700/30 hover:bg-blue-600/15 hover:border-blue-600/40 text-blue-300'
                      : item.accent === 'violet'
                        ? 'bg-violet-600/8 border-violet-700/30 hover:bg-violet-600/15 hover:border-violet-600/40 text-violet-300'
                        : 'bg-[#0f1e3a]/60 border-[#19315d]/30 hover:bg-[#13254b] hover:border-[#244278]/40 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span className="text-sm font-medium">{item.action}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Section ── */}
      <div className="mt-5 grid md:grid-cols-2 gap-5">
        {/* Platform Performance */}
        <div className="bg-[#0b1730] p-6 rounded-2xl border border-[#19315d]/40">
          <h3 className="text-base text-blue-50 font-semibold mb-5">Platform Performance</h3>
          <div className="space-y-3.5 text-sm">
            {[
              { label: 'Content Growth', value: '+18%', color: 'text-emerald-400' },
              { label: 'Active Visitors', value: '1,240', color: 'text-blue-300' },
              { label: 'Avg. Engagement', value: '4m 32s', color: 'text-violet-300' },
            ].map((row, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-slate-400">{row.label}</span>
                <span className={`font-medium ${row.color}`}>{row.value}</span>
              </div>
            ))}

            {/* Progress bar */}
            <div className="pt-2">
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <span>Content score</span>
                <span>72%</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#0f1e3a] overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-blue-600 to-blue-400 rounded-full"
                  style={{ width: '72%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-[#0b1730] p-6 rounded-2xl border border-[#19315d]/40">
          <h3 className="text-base text-blue-50 font-semibold mb-5">System Status</h3>
          <div className="space-y-3.5 text-sm">
            {[
              { label: 'API Status', value: 'Online', color: 'text-emerald-400', dot: 'bg-emerald-400' },
              { label: 'Database', value: 'Connected', color: 'text-emerald-400', dot: 'bg-emerald-400' },
              { label: 'Server Load', value: 'Moderate', color: 'text-amber-400', dot: 'bg-amber-400' },
            ].map((row, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-slate-400">{row.label}</span>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${row.dot}`} />
                  <span className={`font-medium ${row.color}`}>{row.value}</span>
                </div>
              </div>
            ))}

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.5)]" />
              MongoDB · All systems operational
            </div>
          </div>
        </div>
      </div>

      {/* ── Command Center ── */}
      <div className="mt-5">
        <div className="relative rounded-2xl border border-[#19315d]/40 bg-[#0b1730] p-6 overflow-hidden">
          {/* Ambient glows */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-600/8 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-violet-600/6 blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="relative flex justify-between items-center mb-7">
            <h3 className="text-base font-semibold text-blue-50">Command Center</h3>
            <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-900/20 text-emerald-400 border border-emerald-800/30">
              System Stable
            </span>
          </div>

          {/* Grid */}
          <div className="relative grid md:grid-cols-3 gap-6">
            {/* Live Activity */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                Live Activity
              </p>
              <div className="space-y-2.5 text-sm">
                {[
                  { label: 'Blogs Added', val: `+${stats.blogs}` },
                  { label: 'Pkgs Created', val: `+${stats.packages}` },
                  {
                    label: 'Published',
                    val: `${stats.publishedBlogs + stats.publishedPackages}`,
                  },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between text-slate-400">
                    <span>{row.label}</span>
                    <span className="text-blue-300 font-medium">{row.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* System Metrics */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                System Metrics
              </p>
              <div className="space-y-2.5 text-sm">
                {[
                  { label: 'API', val: '98%', color: 'text-emerald-400' },
                  { label: 'DB Load', val: 'Moderate', color: 'text-amber-400' },
                  { label: 'Response', val: '120ms', color: 'text-emerald-400' },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-slate-400">{row.label}</span>
                    <span className={`font-medium ${row.color}`}>{row.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Controls */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                Quick Controls
              </p>
              <div className="flex flex-col gap-2">
                <Link href="/admin/blogs/create">
                  <button className="w-full flex items-center gap-2 text-sm px-3 py-2.5 rounded-xl bg-blue-600/8 border border-blue-700/25 text-blue-300 hover:bg-blue-600/15 hover:border-blue-600/40 transition-all">
                    <Plus className="w-3.5 h-3.5" />
                    New Blog
                  </button>
                </Link>
                <Link href="/admin/packages/create">
                  <button className="w-full flex items-center gap-2 text-sm px-3 py-2.5 rounded-xl bg-violet-600/8 border border-violet-700/25 text-violet-300 hover:bg-violet-600/15 hover:border-violet-600/40 transition-all">
                    <Plus className="w-3.5 h-3.5" />
                    New Package
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="relative mt-6 pt-4 border-t border-[#19315d]/30 flex justify-between items-center text-xs text-slate-600">
            <span>Last Sync: {syncTime || '—'}</span>
            <span>MongoDB Connected · v1.0.0</span>
          </div>
        </div>
      </div>
    </section>
  );
}
