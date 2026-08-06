"use client"

import React from 'react';
// import { Mail, Phone, Plus, Minus, Search, Bus } from 'lucide-react'; // Uncomment if used elsewhere
import useScrollReveal from '@/hooks/useScrollReveal';

export const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    /* CHANGED: py-16 to py-8 for tighter mobile spacing */
    <section className="w-full py-4 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-white overflow-hidden">
      <div 
        ref={ref}
        /* CHANGED: gap-8 to gap-6 for tighter internal mobile spacing */
        className={`flex flex-col gap-4 md:gap-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        {/* Top Row: Headings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-start">
          <div className="md:col-span-1">
            <h3 className="text-xl md:text-2xl font-medium text-gray-900 mt-2 text-center md:text-left">
              About us
            </h3>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-3xl md:text-[2.75rem] font-bold text-gray-900 leading-[1.2] text-center md:text-left">
              Explore the <span className="text-[#33b5e5]">kashmir</span> with perfect<br className="hidden md:block"/> guidance
            </h2>
          </div>
        </div>

        {/* Bottom Row: Images & Text */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 items-center">
          
          {/* Image 1 */}
          <div className="w-full aspect-[4/3] sm:aspect-[1.1/1] rounded-2xl overflow-hidden group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80" 
              alt="Kashmir Stream" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          
          {/* Image 2 */}
          <div className="w-full aspect-[4/3] sm:aspect-[1.1/1] rounded-2xl overflow-hidden group cursor-pointer">
            <img 
              src="https://plus.unsplash.com/premium_photo-1697730277839-440df1a4415f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Kashmir Shikara" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          
          {/* Text & Button */}
          {/* CHANGED: Reduced mt-4 to mt-2 for slightly tighter text spacing on mobile */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start space-y-6 lg:pl-4 mt-2 md:mt-0">
            <p className="text-gray-600 text-sm md:text-base leading-relaxed text-center md:text-left">
              Touriex hires great people from a Real Transport founded of backgrounds, which simply makes stronger and we couldn't be prouder elevating your optimizing Inc was
            </p>
            <button className="bg-gradient-to-r from-[#40c4ff] to-[#00b4d8] hover:from-[#33b5e5] hover:to-[#009ec3] text-white px-8 py-3.5 rounded-full text-base font-medium transition-all duration-300 shadow-[0_8px_20px_rgba(51,181,229,0.3)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(51,181,229,0.4)] w-full sm:w-auto">
              Explore Packages
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;