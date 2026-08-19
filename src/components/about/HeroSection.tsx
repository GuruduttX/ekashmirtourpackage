"use client"
import React from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';

export const HeroSection = () => {
  const { ref, isVisible } = useScrollReveal();

  const heroImages = [
    "https://plus.unsplash.com/premium_photo-1697729439457-85d4b9d3a2cb?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,
    "https://plus.unsplash.com/premium_photo-1697730426664-f04d9916f700?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGthc2htaXJ8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1627894485200-b92fb4353967?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGthc2htaXJ8ZW58MHx8MHx8fDA%3D"

  
  
  ];

  return (
    // Removed max-w-[1600px] and mx-auto from the parent section to allow full-bleed
   <section className="w-full pt-24 sm:pt-16 lg:pt-24 pb-0 text-center relative overflow-hidden bg-#F6F6F6">
      <style>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 45s linear infinite;
          width: max-content;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Text Content - Added max-w-[1600px] and mx-auto here to keep text contained */}
      <div 
        ref={ref}
        className={`max-w-[1600px] mx-auto transition-all duration-1000 transform px-4 sm:px-6 z-10 relative ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] font-extrabold tracking-tight text-gray-900 mb-4 sm:mb-6">
          Every Corner of <span className="text-[#00B4D8]">Kashmir</span>
          <br className="hidden sm:block" />
          <span className="text-[#00B4D8]"> Awaits</span>
        </h1>
        <p className="mt-4 sm:mt-6 max-w-xl sm:max-w-2xl lg:max-w-4xl text-sm sm:text-base lg:text-lg text-gray-600 mx-auto mb-8 sm:mb-12 px-4 leading-relaxed font-medium">
          From the silent mornings on Dal Lake to the electric air of Gulmarg's slopes — we've mapped Kashmir's soul into journeys that stay with you long after you return.
        </p>
      </div>
      
      {/* Infinite Scrolling Images with Cloud Overlay */}
      {/* Replaced w-screen left-1/2 -translate-x-1/2 with w-full to naturally span the screen */}
      <div className="relative w-full h-[200px] sm:h-[300px] lg:h-[450px] overflow-hidden bg-white">
         
         {/* Top Cloud Mask */}
         <div className="absolute top-[-1px] left-0 w-full h-16 sm:h-24 lg:h-32 z-20 pointer-events-none">
            <img 
              src="/about/cloudTop.webp" 
              alt="top clouds" 
              className="w-full h-full scale-180 object-top opacity-100"
            />
         </div>
         
         {/* Marquee Track */}
         <div className="flex animate-infinite-scroll z-10 h-full">
            {[...heroImages, ...heroImages].map((src, idx) => (
              <div 
                key={idx} 
                className="w-[260px] sm:w-[380px] lg:w-[500px] h-full shrink-0 border-r-4 sm:border-r-8 border-white"
              >
                <img 
                  src={src} 
                  alt={`Kashmir Explore ${idx}`} 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                />
              </div>
            ))}
         </div>

         {/* Bottom Cloud Mask */}
         <div className="absolute bottom-[15px] left-0 w-full h-20 sm:h-24 lg:h-32 z-20 pointer-events-none">
            <img 
              src="/about/cloudBottom.webp" 
              alt="bottom clouds" 
              className="w-full h-full scale-180 object-bottom opacity-100 "
            />
         </div>
      </div>
    </section>
  );
};

export default HeroSection;