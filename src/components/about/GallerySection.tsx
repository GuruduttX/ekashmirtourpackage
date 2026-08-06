"use client"
import React, { useState, useEffect } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';
import { X } from 'lucide-react'; 

// ==========================================
// 📄 File: components/about/GallerySection.jsx (or .tsx)
// ==========================================

const images = [
  {
    src: "https://plus.unsplash.com/premium_photo-1697730277839-440df1a4415f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D",
    alt: "Gallery 1",
    // Mobile: 1 column. Desktop: Top left
    layoutClasses: "col-span-1 md:col-start-1 md:row-start-1" 
  },
  {
    src: "https://images.unsplash.com/photo-1715457573748-8e8a70b2c1be?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D",
    alt: "Gallery 2",
    // Mobile: 1 column. Desktop: Bottom left
    layoutClasses: "col-span-1 md:col-start-1 md:row-start-2"
  },
  {
    src: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D",
    alt: "Gallery Main",
    // Mobile: Spans 2 columns. Desktop: Center, spans 2 cols & 2 rows
    layoutClasses: "col-span-2 md:col-start-2 md:col-span-2 md:row-start-1 md:row-span-2 h-[250px] md:h-full",
    isMain: true
  },
  {
    src: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D",
    alt: "Gallery 3",
    // Mobile: 1 column. Desktop: Top right
    layoutClasses: "col-span-1 md:col-start-4 md:row-start-1"
  },
  {
    src: "https://images.unsplash.com/photo-1566837497312-7be7830ae9b1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D",
    alt: "Gallery 4",
    // Mobile: 1 column. Desktop: Bottom right
    layoutClasses: "col-span-1 md:col-start-4 md:row-start-2",
    imgClasses: "object-bottom"
  }
];

export const GallerySection = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedIndex]);

  return (
    <>
      <section className="w-full py-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
        <div 
          ref={ref}
          className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <h2 className="text-gray-900 font-bold md:text-[2.75rem] mb-8 text-center text-3xl md:text-left">Image Gallery</h2>
          
          {/* Main Grid: 2 columns on mobile, 4 columns on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-6">
            {images.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`w-full cursor-pointer rounded-[1.5rem] overflow-hidden shadow-sm bg-gray-100 group ${img.layoutClasses} ${!img.isMain ? 'h-[160px] md:h-[280px]' : ''}`}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${img.imgClasses || ''}`} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          
          {/* Close Button */}
          <button 
            onClick={() => setSelectedIndex(0)}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={24} />
          </button>

          {/* Main Image Display */}
          <div className="flex-1 flex items-center justify-center min-h-0 relative w-full max-w-6xl mx-auto mt-12 md:mt-0 p-4 md:p-8">
            <img 
              src={images[selectedIndex].src} 
              alt={images[selectedIndex].alt} 
              className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Bottom Thumbnail Strip */}
          <div className="h-24 md:h-32 w-full max-w-3xl mx-auto mt-auto flex items-center justify-center gap-3 overflow-x-auto pb-6 px-4 [&::-webkit-scrollbar]:hidden">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`flex-none w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  selectedIndex === idx 
                    ? 'border-white scale-110 opacity-100 shadow-lg' 
                    : 'border-transparent opacity-40 hover:opacity-100'
                }`}
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          
        </div>
      )}
    </>
  );
};

export default GallerySection;