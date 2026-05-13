'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <Topbar toggleSidebar={() => setIsOpen(true)} />

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <main className="pt-20 px-4 md:px-8">
        {children}
      </main>
    </div>
  );
}
