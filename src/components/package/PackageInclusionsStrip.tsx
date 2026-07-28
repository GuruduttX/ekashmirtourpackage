import { Bus, Hotel, Coffee, MapPin } from "lucide-react";

interface Props {
  packageData: {
    isTransferIncluded?: boolean;
    isStayIncluded?: boolean;
    isBreakfastIncluded?: boolean;
    isSightseeingIncluded?: boolean;
  };
}

export default function PackageInclusionsStrip({ packageData }: Props) {
  const inclusions = [
    {
      label: "Transfer Included",
      icon: <Bus className="w-5 h-5" />,
      checked: packageData.isTransferIncluded ?? false,
    },
    {
      label: "Stay Included",
      icon: <Hotel className="w-5 h-5" />,
      checked: packageData.isStayIncluded ?? false,
    },
    {
      label: "Breakfast Included",
      icon: <Coffee className="w-5 h-5" />,
      checked: packageData.isBreakfastIncluded ?? false,
    },
    {
      label: "Sightseeing Included",
      icon: <MapPin className="w-5 h-5" />,
      checked: packageData.isSightseeingIncluded ?? false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="border-t border-gray-200 pt-4 sm:pt-6">
        <div className="grid sm:grid-cols-4 grid-cols-2 gap-x-10 gap-y-4 items-center">
          {inclusions.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 text-sm ${
                item.checked ? "text-sky-600" : "text-gray-300"
              }`}
            >
              <span className={item.checked ? "text-sky-500" : undefined}>
                {item.icon}
              </span>
              <span className="font-semibold">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="border-b border-gray-200 mt-4 sm:mt-6" />
    </div>
  );
}
