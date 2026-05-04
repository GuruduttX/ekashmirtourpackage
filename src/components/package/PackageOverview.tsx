import { Package2, CircleDot } from "lucide-react";

const description1 = `The 7 Days Kashmir Tour Package is structured as a continuous highland circuit, not a rushed checklist. The journey begins in Srinagar — Dal Lake, Mughal Gardens, and old city bazaars — where the rhythm is unhurried and grounded in the valley's living culture. From there, the route moves gradually toward Gulmarg, Pahalgam, and Sonamarg, following logical highway flow and realistic travel hours. Weather patterns, gondola timings, and crowd density at popular viewpoints are all factored into the pacing so that every stop remains meaningful rather than hurried.`;

const description2 = `Across seven days, physical effort is balanced carefully. Gondola rides at Gulmarg and pony treks at Pahalgam are spaced between lighter sightseeing days. Long-distance drives are not stacked back-to-back without rest. Sonamarg's glacier access, Srinagar's vehicle restrictions, and shikara schedules on Dal Lake are handled with practical awareness. This itinerary does not overpromise unrealistic darshan windows or full-day treks without buffer. It follows authentic sequencing, respects regional conditions, and allows for a genuine Kashmir experience from the valley floor to the high meadows.`;

export default function PackageOverview() {
  return (
    <div className="relative">
      {/* Header with left border accent — matching reference */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-1 self-stretch bg-sky-500 rounded-full flex-shrink-0" />
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Package2 className="w-3.5 h-3.5 text-sky-500" />
            <span className="text-sky-500 text-[0.65rem] font-bold tracking-[0.25em] uppercase">
              What's Included
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Package Overview
          </h2>
        </div>
      </div>

      {/* Gradient divider line */}
      <div className="h-px w-full bg-gradient-to-r from-sky-500 via-cyan-400 to-transparent mb-10" />

      {/* Description paragraphs */}
      <div className="space-y-6">
        <p className="text-slate-600 leading-[1.9] text-[1.02rem] font-light">
          {description1}
        </p>
        <p className="text-slate-600 leading-[1.9] text-[1.02rem] font-light">
          {description2}
        </p>
      </div>

      {/* Footer note */}
      <div className="flex items-center gap-2 mt-10">
        <CircleDot className="w-3 h-3 text-sky-400 flex-shrink-0" />
        <p className="text-sky-500/80 text-sm font-light">
          Details are subject to availability &amp; seasonal adjustments
        </p>
      </div>
    </div>
  );
}
