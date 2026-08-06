import { 
  Building2, Star, ArrowRight, Clock, Luggage, Languages, CalendarDays, Bus
} from "lucide-react";

// ============================================================================
// COMPONENT: HERO SECTION
// ============================================================================

export function HeroSection() {
  return (
    <section className="group relative w-full min-h-[600px] flex items-center pt-28 pb-10 lg:pt-24 lg:pb-16 lg:py-24 overflow-hidden bg-white">
      {/* Background Image with Responsive Gradients & Hover Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1627894485200-b92fb4353967?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3"
          alt="Beautiful Kashmir Landscape"
          className="w-full h-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/90 to-white lg:bg-gradient-to-r lg:from-white lg:from-35% lg:via-white/80 lg:to-transparent"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Column: Text & Stats */}
        <div className="lg:col-span-6 space-y-4 lg:space-y-6 text-center lg:text-left">
          <div className="inline-block bg-[#e0f2fe] text-[#22b3f0] px-4 py-2 rounded-lg text-sm font-semibold tracking-wide shadow-sm">
            Meet your local expert
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
            Explore Kashmir with <br />
            <span className="text-[#22b3f0] block mt-1">Sartaj Ahmed</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-700">
            More than a guide, your personal storyteller
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 py-2 lg:py-4">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-[#22b3f0] fill-[#22b3f0]" />
              <div className="text-left">
                <div className="font-bold text-slate-900 leading-none mb-1">4.9</div>
                <div className="text-xs text-slate-500">(320 Reviews)</div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-slate-200"></div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#22b3f0]" />
              <div className="text-left">
                <div className="font-bold text-slate-900 leading-none mb-1">10+</div>
                <div className="text-xs text-slate-500">Experience</div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-slate-200"></div>

            <div className="flex items-center gap-3">
              <Luggage className="w-5 h-5 text-[#22b3f0]" />
              <div className="text-left">
                <div className="font-bold text-slate-900 leading-none mb-1">1200+</div>
                <div className="text-xs text-slate-500">Travellers</div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center lg:justify-start">
            <button className="bg-[#22b3f0] hover:bg-[#1fa1d8] text-white px-6 py-3 rounded-full font-semibold flex items-center gap-3 transition-colors w-fit mt-1 lg:mt-2 shadow-md hover:shadow-lg">
              Explore with Sartaj
              <span className="bg-white text-[#22b3f0] rounded-full p-1 flex items-center justify-center">
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>

        {/* Center Column: Portrait Image */}
        <div className="lg:col-span-3 flex justify-center lg:justify-end relative mt-3 lg:mt-0">
          <div className="relative bg-white/70 p-2 rounded-[1.5rem] backdrop-blur-sm shadow-xl border border-white/50 w-full max-w-[240px] lg:max-w-[280px] overflow-hidden group/portrait cursor-pointer">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHh_AjE1g4ckPt9zZCsGJc6c8dRRreQmsrC69yC1eCuA&s=1"
              alt="Sartaj Ahmed"
              className="w-full h-[300px] lg:h-[360px] object-cover rounded-2xl transition-all duration-700 ease-out group-hover/portrait:scale-110 group-hover/portrait:-rotate-1"
            />
          </div>
        </div>

        {/* Right Column: Floating Badges */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col gap-3 lg:gap-4 overflow-x-auto lg:overflow-visible no-scrollbar items-center lg:items-end w-[calc(100%+2rem)] -mx-4 px-4 sm:w-full sm:mx-0 sm:px-0 pb-4 lg:pb-0 snap-x snap-mandatory">
          
          <div className="group flex-shrink-0 snap-center bg-white hover:bg-[#2cb4ff] active:bg-[#2cb4ff] px-5 py-3 rounded-2xl shadow-lg flex items-center gap-3 w-[220px] lg:w-64 transform transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <Building2 className="w-5 h-5 text-[#22b3f0] mb-3 text-[#22b3f0] group-hover:text-white group-active:text-white transition-colors duration-300 shrink-0 transition-colors duration-300"/>
            <span className="font-medium text-slate-800  text-sm whitespace-nowrap transition-colors duration-300">Government Certified</span>
          </div>
          
          <div className="group flex-shrink-0 snap-center bg-white hover:bg-[#2cb4ff] active:bg-[#2cb4ff] px-5 py-3 rounded-2xl shadow-lg flex items-center gap-3 w-[220px] lg:w-64 transform transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <Languages className="w-5 h-5 text-[#22b3f0] mb-3 text-[#22b3f0] group-hover:text-white group-active:text-white transition-colors duration-300 shrink-0 transition-colors duration-300"/>
            <span className="font-medium text-slate-800  text-sm whitespace-nowrap transition-colors duration-300">English | Hindi | Urdu</span>
          </div>
          
          <div className="group flex-shrink-0 snap-center bg-white hover:bg-[#2cb4ff] active:bg-[#2cb4ff] px-5 py-3 rounded-2xl shadow-lg flex items-center gap-3 w-[220px] lg:w-64 transform transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <CalendarDays className="w-5 h-5 text-[#22b3f0] mb-3 text-[#22b3f0] group-hover:text-white group-active:text-white transition-colors duration-300 shrink-0 transition-colors duration-300"/>
            <span className="font-medium text-slate-800  text-sm whitespace-nowrap transition-colors duration-300">Available Today</span>
          </div>
          
          <div className="group flex-shrink-0 snap-center bg-white hover:bg-[#2cb4ff] active:bg-[#2cb4ff] px-5 py-3 rounded-2xl shadow-lg flex items-center gap-3 w-[220px] lg:w-64 transform transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <Bus className="w-5 h-5 text-[#22b3f0] mb-3 text-[#22b3f0] group-hover:text-white group-active:text-white transition-colors duration-300 shrink-0 transition-colors duration-300"/>
            <span className="font-medium text-slate-800  text-sm whitespace-nowrap transition-colors duration-300">Private Tours</span>
          </div>

          <div className="flex-shrink-0 w-2 lg:hidden" aria-hidden="true"></div>
        </div>

      </div>
    </section>
  );
}