import { Sparkles } from "lucide-react";

const defaultPackageData = {
  highlights: [
    {
      description:
        "Sunrise shikara ride on the glassy waters of Dal Lake with views of the surrounding mountains.",
    },
    {
      description:
        "Gondola ride at Gulmarg — one of Asia's highest cable cars with sweeping Himalayan panoramas.",
    },
    {
      description:
        "Stroll through the royal Mughal Gardens — Nishat Bagh, Shalimar Bagh, and Chashme Shahi.",
    },
    {
      description:
        "Explore the lush meadows of Pahalgam and the scenic Betab Valley on a guided walk.",
    },
    {
      description:
        "Enjoy an authentic Wazwan dinner — a traditional Kashmiri multi-course feast.",
    },
    {
      description:
        "Stay aboard a heritage houseboat on Dal Lake for a truly one-of-a-kind overnight experience.",
    },
  ],
};

export default function PackageHighlights({
  PackageData = defaultPackageData,
}) {
  return (
    <section className="py-0 sm:py-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* TOP DIVIDER */}
        <div className="border-t border-gray-200 mb-4 sm:mb-6" />

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Trip Highlights
        </h2>

        <div className="space-y-4">
          {PackageData.highlights.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 items-start rounded-xl bg-sky-50 px-5 py-4"
            >
              {/* ICON */}
              <div className="mt-1">
                <Sparkles className="w-5 h-5 text-sky-500" />
              </div>

              {/* TEXT */}
              <p className="text-gray-800 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* BOTTOM DIVIDER */}
        <div className="border-b border-gray-200 mt-6 sm:mt-8" />
      </div>
    </section>
  );
}
