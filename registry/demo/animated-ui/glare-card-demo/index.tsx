'use client';

import { GlareCard } from '@/registry/animated-ui/glare-card';

export default function GlareCardDemo() {
  return (
    <div className="grid grid-cols-1 place-items-center">
      <GlareCard className="flex flex-col items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center gap-10 group">
          {/* Left Eye */}
          <div className="w-16 h-4 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.6)] transition-all duration-300 group-hover:h-12 group-hover:rounded-[50%] group-hover:scale-110" />

          {/* Right Eye */}
          <div className="w-16 h-4 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.6)] transition-all duration-300 group-hover:h-12 group-hover:rounded-[50%] group-hover:scale-110" />
        </div>
      </GlareCard>
    </div>
  );
}
