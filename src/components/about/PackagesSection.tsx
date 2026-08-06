"use client"

import React from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';

export const PackagesSection = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  const packages = [
    { id: 1, title: "Shikara Ride", desc: "Asia's highest cable car with sweeping views", img: "https://images.unsplash.com/photo-1706353222367-d0b0fb602f07?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2hpa2FyYSUyMHJpZGUlMjBrYXNobWlyfGVufDB8fDB8fHww" },
    { id: 2, title: "Gulmarg Gondola", desc: "Experience the winter wonderland from above", img: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=400&q=80" },
    { id: 3, title: "Dal Lake Stays", desc: "Luxury houseboats with premium amenities", img: "https://media.istockphoto.com/id/2082598546/photo/stunning-beauty-of-kashmir.webp?a=1&b=1&s=612x612&w=0&k=20&c=rwklQNo315HVmU9g9WBmQmGXz5ErVt3ykbb_EZaO6o0=" },
    { id: 4, title: "Pahalgam Valley", desc: "Pristine rivers and lush green meadows", img: "https://images.unsplash.com/photo-1666545378454-b605635dd55d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFoYWxnYW0lMjB2YWxsZXklMjBrYXNobWlyfGVufDB8fDB8fHww" },
  ];

  return (
    <section className="w-full py-5 px-0 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white overflow-hidden">
  <div 
    ref={ref}
    // Added '0' to 'translate-y-' to fix the animation
    className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
  >
    {/* Added mb-8 (or mb-10/mb-12 depending on how much space you want) */}
    <p className="mb-8 text-3xl md:text-[2.75rem] font-bold text-gray-900 leading-[1.2] text-center md:text-left">
      Popular Kashmir Packages
    </p>
    
    <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0 overflow-x-auto snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Cards go here */}
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              // Fixed height (h-[340px]) and strict width constraints ensure the box never shifts
              className="min-w-[85vw] sm:min-w-0 sm:w-full flex-shrink-0 snap-center relative rounded-[1.5rem] overflow-hidden h-[340px] group cursor-pointer shadow-sm bg-gray-100 block"
            >
              {/* absolute inset-0 forces the image to decouple from the box's dimensions */}
              <img 
                src={pkg.img} 
                alt={pkg.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl border border-white/50 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(255,255,255,0.15)] transform transition-all duration-300 group-hover:-translate-y-2 group-hover:border-white/70 group-hover:shadow-[0_8px_32px_rgba(255,255,255,0.25)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none rounded-2xl"></div>
                
                <div className="relative z-10">
                  <h3 className="text-white font-bold text-[17px] mb-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wide">
                    {pkg.title}
                  </h3>
                  <p className="text-white/90 text-xs leading-snug drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] font-medium">
                    {pkg.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;