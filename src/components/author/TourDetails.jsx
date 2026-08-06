import { 
 Camera, Plane, Coffee, Sailboat, Home, Utensils, ShoppingBag
} from "lucide-react";
// ============================================================================
// COMPONENT: AVAILABILITY & EXPERIENCE
// ============================================================================
export function TourDetails() {
  const weeklyAvailability = [
    { day: "Monday", status: "Available" },
    { day: "Tuesday", status: "Available" },
    { day: "Wednesday", status: "Booked" },
    { day: "Thursday", status: "Available" },
    { day: "Friday", status: "Available" },
    { day: "Saturday", status: "Available" },
    { day: "Sunday", status: "Available" },
  ];

  const experiences = [
    { title: "Arrival & Welcome", icon: <Plane className="w-7 h-7 text-white" /> },
    { title: "Kahwa", icon: <Coffee className="w-7 h-7 text-white" /> },
    { title: "Shikara Ride", icon: <Sailboat className="w-7 h-7 text-white" /> },
    { title: "Local Village", icon: <Home className="w-7 h-7 text-white" /> },
    { title: "Lunch", icon: <Utensils className="w-7 h-7 text-white" /> },
    { title: "Photography", icon: <Camera className="w-7 h-7 text-white" /> },
    { title: "Shopping", icon: <ShoppingBag className="w-7 h-7 text-white" /> },
  ];

  const wonders = [
    { name: "Dal Lake", image: "https://images.unsplash.com/photo-1695667937079-b59c63660cfc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGFsJTIwbGFrZXxlbnwwfHwwfHx8MA%3D%3D" },
    { name: "Mughal Garden", image: "https://images.unsplash.com/photo-1648123774798-f205dbdc4377?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVnaGFsJTIwZ2FyZGVuJTIwa2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D" },
    { name: "Houseboats", image: "https://images.unsplash.com/photo-1627894485200-b92fb4353967?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Gulmarg", image: "https://images.unsplash.com/photo-1631693558359-f7afa9e8e883?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3VsbWFyZ3xlbnwwfHwwfHx8MA%3D%3D" },
    { name: "Pahalgam", image: "https://images.unsplash.com/photo-1646204892016-711ed35535ec?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFoYWxnYW18ZW58MHx8MHx8fDA%3D" },
  ];

  return (
    <section className="bg-white py-4 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-16">
          
          {/* Left Column: Weekly Availability */}
          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-[2rem] p-6 sm:p-8 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.1)] transition-shadow duration-300">
            <h3 className="text-[#2cb4ff] font-serif font-bold text-xl sm:text-2xl mb-6 tracking-tight">
              Weekly Availability
            </h3>
            <div className="space-y-3">
              {weeklyAvailability.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0 group cursor-pointer">
                  <span className="text-slate-700 font-medium group-hover:text-[#2cb4ff] transition-colors">{item.day}</span>
                  <span className={`px-4 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-transform group-hover:scale-105 ${
                    item.status === 'Available' 
                      ? 'bg-green-100/70 text-emerald-600' 
                      : 'bg-red-100/70 text-red-500'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Experience Timeline (Fixed for Mobile & Added Hovers) */}
          <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[2rem] p-6 sm:p-8 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.1)] transition-shadow duration-300 flex flex-col">
            <h3 className="text-[#2cb4ff] font-serif font-bold text-xl sm:text-2xl mb-2 lg:mb-8 tracking-tight">
              What will you experience
            </h3>
            
            {/* Horizontal Scrolling Area optimized for Mobile Snap */}
            <div className="w-full flex overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 pt-6">
              {experiences.map((exp, idx) => {
                const isEven = idx % 2 === 0;
                const isLast = idx === experiences.length - 1;
                
                // Using a fixed width item ensures the SVG '100% width' mathematically perfectly
                // connects the center of current circle to the center of the next circle.
                return (
                  <div key={idx} className="relative flex-none w-[120px] sm:w-[140px] flex flex-col items-center text-center snap-center group cursor-pointer">
                    
                    {/* Perfect Dashed SVG Connecting Line */}
                    {!isLast && (
                      <svg
                        className="absolute top-0 left-[50%] w-full h-[88px] z-0 pointer-events-none"
                        style={{ overflow: 'visible' }}
                      >
                        <line
                          x1="0"
                          // The container is 88px tall. Circles are 72px (w-18).
                          // Top aligned circle center: 36px.
                          // Bottom aligned circle center: 88 - 36 = 52px.
                          y1={isEven ? "52" : "36"} 
                          x2="100%"
                          y2={isEven ? "36" : "52"}
                          stroke="#a0dfff"
                          strokeWidth="2"
                          strokeDasharray="6 6"
                        />
                      </svg>
                    )}

                    {/* Icon Container with Hover animations matching reference style */}
                    <div className="relative z-10 h-[88px] w-full flex justify-center mb-3">
                      <div 
                        className={`w-18 h-18 rounded-full bg-[#2cb4ff] shadow-md flex items-center justify-center transition-all duration-300 ease-out 
                        group-hover:scale-110 group-hover:shadow-[0_10px_25px_-5px_rgba(44,180,255,0.6)] group-hover:-translate-y-1 
                        ${isEven ? 'mt-auto' : 'mb-auto'} p-5`}
                      >
                        {exp.icon}
                      </div>
                    </div>
                    
                    <span className="text-sm font-semibold text-slate-800 leading-tight group-hover:text-[#2cb4ff] transition-colors mt-2">
                      {exp.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>

        {/* Bottom Section: Wonders of Kashmir (Images already have hover scale, added glow and snap fixes) */}
        <div>
          <div className="relative inline-block mb-8">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl font-serif tracking-tight">
              Wonders of <span className="text-[#2cb4ff]">Kashmir</span>
            </h2>
            <div className="absolute -bottom-2 left-0 h-[3px] w-[90px] bg-[#2cb4ff]"></div>
          </div>

          <div className="flex overflow-x-auto lg:grid lg:grid-cols-5 gap-4 pb-6 snap-x snap-mandatory no-scrollbar">
            {wonders.map((wonder, idx) => (
              <div 
                key={idx} 
                className="shrink-0 snap-center w-[240px] lg:w-auto flex flex-col rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-[#2cb4ff]/20 transition-all duration-300 group cursor-pointer"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img 
                    src={wonder.image} 
                    alt={wonder.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="bg-[#2cb4ff] py-3.5 text-center transition-colors group-hover:bg-[#1da4eb]">
                  <span className="text-white font-bold text-sm tracking-wide">{wonder.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
