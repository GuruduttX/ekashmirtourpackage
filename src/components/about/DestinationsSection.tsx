"use client"

import React from 'react';
import useScrollReveal from '@/hooks/useScrollReveal'; 

export const DestinationsSection = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  const destinations = [
    { 
      name: "Snow", 
      image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D", 
    },
    { 
      name: "Boathouse", 
      image: "https://images.unsplash.com/photo-1715457573748-8e8a70b2c1be?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2FzaG1pciUyMGJvYXRob3VzZXxlbnwwfHwwfHx8MA%3D%3D", 
    },
    { 
      name: "Valley", 
      image: "https://images.unsplash.com/photo-1643449416258-5c8e7ec598b1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2FzaG1pciUyMHZhbGxleXxlbnwwfHwwfHx8MA%3D%3D", 
    },
    { 
      name: "Dal Lake", 
      image: "https://images.unsplash.com/photo-1569852837227-1d0d3af93456?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGthc2htaXIlMjBkYWwlMjBsYWtlfGVufDB8fDB8fHww", 
    },
    { 
      name: "Kashmir", 
      image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80", 
    },
  ];

  return (
    <section className="w-full py-6 overflow-hidden bg-white max-w-[1600px] mx-auto">
      <div 
        ref={ref}
        className={`w-full transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="px-6 md:px-8 mb-6 md:mb-12">
          <p className="text-3xl md:text-[2.75rem] font-bold text-gray-900 leading-[1.2] text-center md:text-left">Popular Destinations</p>
        </div>
        
        {/* 
          Increased the height on medium (md), large (lg), and extra-large (xl) screens 
          to prevent the cards from looking too horizontally stretched.
        */}
        <div className="w-full flex items-center gap-4 md:gap-6 px-6 md:px-8 py-4 md:py-10 h-[380px] md:h-[500px] lg:h-[550px] xl:h-[600px] overflow-x-auto snap-x snap-mandatory md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {destinations.map((dest, idx) => (
            <div 
              key={idx} 
              className={`
                relative shrink-0 w-[75%] sm:w-[60%] md:w-full md:flex-1 h-full rounded-2xl md:rounded-3xl overflow-hidden 
                cursor-pointer transition-all duration-500 ease-out group snap-center shadow-lg md:shadow-md 
                md:hover:-translate-y-3 md:hover:shadow-xl
              `}
            >
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90"></div>
              
              <h3 className="absolute bottom-6 left-6 md:bottom-8 md:left-6 text-white font-bold text-xl md:text-2xl drop-shadow-md z-10 transition-transform duration-500 group-hover:-translate-y-2">
                {dest.name}
              </h3>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;