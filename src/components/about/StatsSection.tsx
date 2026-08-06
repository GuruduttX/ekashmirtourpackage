"use client"
import React, { useState , useEffect, useRef } from 'react';
import { Mail, Phone, Plus, Minus, Search, Bus } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';


// ==========================================
// 📄 File: components/about/StatsSection.jsx (or .tsx)
// ==========================================
export const StatsSection = () => {
  const { ref: revealRef, isVisible } = useScrollReveal({ threshold: 0.3 });
  
  // TS Tip: If using .tsx, uncomment these types:
  // const sectionRef = useRef<HTMLDivElement>(null);
  // const pathRef = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  
  const [busCoords, setBusCoords] = useState({ x: 50, y: 100 });

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !pathRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress (0 to 1) based on section visibility
      const totalDistance = windowHeight + rect.height;
      const scrolledDistance = windowHeight - rect.top;
      
      let progress = scrolledDistance / totalDistance;
      progress = Math.max(0, Math.min(1, progress)); 
      
      // Map progress strictly to the path length
      try {
        const totalLength = pathRef.current.getTotalLength();
        const point = pathRef.current.getPointAtLength(progress * totalLength);
        setBusCoords({ x: point.x, y: point.y });
      } catch (e) {
        // Fallback if SVG API isn't ready
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    setTimeout(handleScroll, 100); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white relative">
      <div 
        ref={revealRef}
        className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      ><div className="flex flex-col md:flex-row md:items-start mb-12 px-4 md:px-8 w-full">
  
  {/* Left Column: Eyebrow Heading */}
  <div className="w-full md:w-1/3 mb-4 md:mb-0 text-center md:text-left">
    <span className="text-gray-900 text-xl font-medium tracking-wide">
      Travel Experience
    </span>
  </div>

  {/* Right Column: Main Heading */}
  <div className="w-full md:w-2/3 text-center md:text-left">
    <h2 className="text-2xl md:text-[2.5rem] font-bold text-gray-900 leading-tight">
      Trusted Kashmir Tour
      <br />
      <span className="text-[#00B4D8]">Experience</span>
    </h2>
  </div>
  
</div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 mb-8 relative z-10 text-center">
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-extrabold text-[#00B4D8] mb-1">25k</span>
            <span className="text-gray-900 text-sm font-semibold">Happy travellers</span>
          </div>
          <div className="flex flex-col items-center md:border-l border-gray-200">
            <span className="text-4xl md:text-5xl font-extrabold text-[#00B4D8] mb-1">8+</span>
            <span className="text-gray-900 text-sm font-semibold">years of experience</span>
          </div>
          <div className="flex flex-col items-center md:border-l border-gray-200">
            <span className="text-4xl md:text-5xl font-extrabold text-[#00B4D8] mb-1">4.9/5</span>
            <span className="text-gray-900 text-sm font-semibold">Guest Satisfaction</span>
          </div>
          <div className="flex flex-col items-center md:border-l border-gray-200">
            <span className="text-4xl md:text-5xl font-extrabold text-[#00B4D8] mb-1">100%</span>
            <span className="text-gray-900 text-sm font-semibold">Kashmir focused tours</span>
          </div>
        </div>
        
        {/* Animated Bus and Path */}
        <div className="w-full relative h-[120px] md:h-[180px] overflow-visible mt-4">
          <svg viewBox="0 0 1200 150" preserveAspectRatio="none" className="w-full h-full absolute inset-0">
            <path 
              ref={pathRef}
              d="M0,100 C200,100 300,30 500,30 C700,30 800,130 1000,130 C1100,130 1150,80 1200,80" 
              fill="none" 
              stroke="#00B4D8" 
              strokeWidth="2.5" 
              strokeDasharray="8, 10" 
              className="opacity-60"
            />
          </svg>
          <div 
            className="absolute z-20 text-[#00B4D8] transition-opacity duration-300 pointer-events-none"
            style={{ 
              left: `${(busCoords.x / 1200) * 100}%`, 
              top: `${(busCoords.y / 150) * 100}%`,
              transform: 'translate(-50%, -100%)', 
            }}
          >
            <Bus size={32} fill="#00B4D8" stroke="white" strokeWidth={1} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default StatsSection;
