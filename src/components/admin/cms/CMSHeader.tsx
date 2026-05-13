'use client';

import { PenLine } from 'lucide-react';

interface CMSHeaderProps {
  editorType: string;
}

export default function CMSHeader({ editorType }: CMSHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-600/15 border border-blue-600/25 flex items-center justify-center shrink-0">
          <PenLine className="w-4 h-4 text-blue-400" />
        </div>
        {editorType} Editor
      </h2>
      <div className="mt-3 ml-12 h-[2px] w-28 bg-linear-to-r from-blue-500 to-blue-400/0 rounded-full" />
    </div>
  );
}
