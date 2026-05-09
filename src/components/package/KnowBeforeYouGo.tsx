"use client";

import { Info, CheckCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

const defaultPackageData = {
  documents: [
    {
      description:
        "Carry a valid government-issued photo ID (Aadhaar, Passport, or Voter ID) at all times — it is required at checkpoints in J&K.",
    },
    {
      description:
        "Tourists must register at the local police station or tourist office upon arrival in Srinagar if staying beyond 7 days.",
    },
    {
      description:
        "Weather in Kashmir can change quickly — pack layered clothing even in summer, and carry a light rain jacket.",
    },
    {
      description:
        "Mobile connectivity may be limited in areas like Sonamarg and parts of Pahalgam. Download offline maps before you travel.",
    },
    {
      description:
        "Respect local customs and dress modestly when visiting religious sites such as Hazratbal Shrine and Jama Masjid.",
    },
    {
      description:
        "Cash is recommended as ATMs can be scarce in remote areas. Carry sufficient INR before heading to Gulmarg or Sonamarg.",
    },
    {
      description:
        "Book the Gulmarg Gondola tickets in advance during peak season (April–June, December–January) to avoid long queues.",
    },
  ],
};

export default function KnowBeforeYouGo({ PackageData = defaultPackageData }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full py-0 sm:py-6 px-4 my-10">
      <div className="max-w-7xl mx-auto">
        {/* Dropdown Card */}
        <div className="relative rounded-2xl border border-sky-200 bg-white/70 backdrop-blur-md shadow-xl overflow-hidden">
          {/* Accent Bar */}
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-sky-400 via-cyan-500 to-sky-500" />

          {/* Header (Clickable) */}
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between gap-4 p-6 cursor-pointer select-none"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-lg">
                <Info className="w-6 h-6" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Know Before You Go
              </h2>
            </div>

            <ChevronDown
              className={`w-6 h-6 text-sky-500 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              open ? "max-h-full opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <ul className="px-6 pb-6 md:px-8 space-y-4">
              {PackageData?.documents?.map((item, index) => (
                <li
                  key={index}
                  className="group flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-sky-50"
                >
                  <div>
                    <CheckCircle className="w-5 h-5 mt-1 text-sky-500 group-hover:scale-110 transition-transform cursor-pointer" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
