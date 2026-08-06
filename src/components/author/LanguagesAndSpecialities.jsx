import { 
  Mountain, Waves, Flower2, Tent, Footprints
} from "lucide-react";
// ============================================================================
// COMPONENT: LANGUAGES & SPECIALITIES
// ============================================================================
export function LanguagesAndSpecialities() {
  const languages = [
    { name: "Hindi", flag: "https://flagcdn.com/w160/in.png" },
    { name: "English", flag: "https://flagcdn.com/w160/gb-eng.png" },
    { name: "Urdu", flag: "https://flagcdn.com/w160/pk.png" },
    { name: "French", flag: "https://flagcdn.com/w160/fr.png" },
  ];

  const specialities = [
    { name: "Mountain Tour", icon: <Mountain className="w-6 h-6" /> },
    { name: "Dal Lake", icon: <Waves className="w-6 h-6" /> },
    { name: "Tulip Garden", icon: <Flower2 className="w-6 h-6" /> },
    { name: "Camping", icon: <Tent className="w-6 h-6" /> },
    { name: "Trekking", icon: <Footprints className="w-6 h-6" /> },
  ];

  return (
    <section className="bg-white py-6 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start">
          
          {/* Left Block: Languages */}
          <div className="w-full lg:w-[45%]">
            <div className="relative inline-block mb-8">
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl font-serif tracking-tight">
                Different <span className="text-[#22b3f0]">Languages</span>
              </h2>
              <div className="absolute -bottom-2 left-0 h-[2px] w-[80px] bg-gradient-to-r from-[#22b3f0] to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {languages.map((lang, idx) => (
                <div 
                  key={idx} 
                  className="group bg-white border border-slate-100 rounded-2xl flex flex-col items-center justify-center p-4 sm:p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] hover:shadow-lg hover:bg-[#2cb4ff] active:bg-[#2cb4ff] transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden mb-3 border border-slate-100 shadow-sm group-hover:border-white/50 group-active:border-white/50 transition-colors duration-300">
                    <img 
                      src={lang.flag} 
                      alt={`${lang.name} flag`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-800 group-hover:text-white group-active:text-white transition-colors duration-300">{lang.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block w-px h-40 bg-gradient-to-b from-transparent via-[#22b3f0]/30 to-transparent mt-8 mx-4 shrink-0"></div>

          {/* Right Block: Specialities */}
          <div className="w-full lg:w-[55%]">
            <div className="relative inline-block mb-8">
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl font-serif tracking-tight">
                Specialities
              </h2>
              <div className="absolute -bottom-2 left-0 h-[2px] w-[60px] bg-gradient-to-r from-[#22b3f0] to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {specialities.map((spec, idx) => (
                <div 
                  key={idx} 
                  className="group bg-white border border-slate-100 rounded-2xl flex flex-col items-center justify-center p-4 sm:p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] hover:shadow-lg hover:bg-[#2cb4ff] active:bg-[#2cb4ff] transition-all duration-300 text-center cursor-pointer"
                >
                  <div className="mb-3 text-[#22b3f0] group-hover:text-white group-active:text-white transition-colors duration-300">
                    {spec.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-800 group-hover:text-white group-active:text-white transition-colors duration-300 leading-tight">
                    {spec.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
