import { 
  Users, Heart,
  Mountain, Camera
} from "lucide-react";

// ============================================================================
// COMPONENT: ABOUT SARTAJ
// ============================================================================
export function AboutSartaj() {
  return (
    <section className="bg-white py-2 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 lg:items-center">
          
          {/* Left Column: Image with Hover */}
          <div className="relative w-full group overflow-hidden rounded-2xl shadow-sm border border-slate-100 cursor-pointer">
            <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYsJXfVseiFg6eIyJBRnfLTZY4PH7YaOOGhagTjuyHnQ&s=10" 
                alt="Sartaj standing by Dal Lake"
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-1"
              />
            </div>
          </div>
          
          {/* Right Column: Text & Badges (Added min-w-0 here to prevent grid blowout) */}
          <div className="text-left min-w-0">
            <div className="relative inline-block mb-6">
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl font-serif tracking-tight">
                About Sartaj
              </h2>
              <div className="absolute -bottom-2 left-0 h-[2px] w-[110%] bg-gradient-to-r from-sky-400 via-sky-200 to-transparent"></div>
            </div>
            
            <div className="space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed mt-8">
              <p>
                Hello I'm Sartaj born raised in Srinagar. I've spend more than 10 years helping travellers discover Kashmir from peaceful lakes and alpine meadows to authentic local villages
              </p>
              <p>
                Hello I'm Sartaj born raised in Srinagar. I've spend more than 10 years helping travellers discover Kashmir from peaceful lakes and alpine meadows to authentic local villages
              </p>
            </div>
            
            {/* Features/Badges Row (Added w-full here) */}
            <div className="mt-8 flex w-full items-center gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="bg-[#2cb4ff] text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium shadow-sm hover:bg-[#1fa1d8] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer shrink-0">
                <Users className="w-4 h-4" />
                <span>Family Tours</span>
              </div>
              <div className="bg-[#2cb4ff] text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium shadow-sm hover:bg-[#1fa1d8] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer shrink-0">
                <Heart className="w-4 h-4 fill-white" />
                <span>Honeymoon Trips</span>
              </div>
              <div className="bg-[#2cb4ff] text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium shadow-sm hover:bg-[#1fa1d8] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer shrink-0">
                <Camera className="w-4 h-4" />
                <span>Photography Tours</span>
              </div>
              <div className="bg-[#2cb4ff] text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium shadow-sm hover:bg-[#1fa1d8] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer shrink-0">
                <Mountain className="w-4 h-4" />
                <span>Trekking Adventures</span>
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}