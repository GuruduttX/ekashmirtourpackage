import Image from "next/image";
import Link from "next/link";
import {
  Car,
  CigaretteOff,
  ShieldCheck,
  Smile,
  Sparkles,
  Tag,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: Tag,
    title: "Fixed Price",
    description: "No surprise charges — the fare you see is the fare you pay.",
  },
  {
    icon: Car,
    title: "Luxury Cars",
    description: "Travel in comfort with a well-maintained, premium fleet.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Drivers",
    description: "Every driver is background-checked and experienced.",
  },
  {
    icon: Smile,
    title: "Full Satisfaction",
    description: "Thousands of happy travellers across Kashmir.",
  },
  {
    icon: CigaretteOff,
    title: "No Smoking",
    description: "A clean, smoke-free ride for every passenger.",
  },
  {
    icon: Sparkles,
    title: "Neat & Clean",
    description: "Cabs sanitized and cleaned before every trip.",
  },
];

function FeatureRow({ feature, reverse }: { feature: Feature; reverse?: boolean }) {
  const Icon = feature.icon;
  return (
    <div className={`flex items-start gap-3 ${reverse ? "flex-row-reverse text-right" : ""}`}>
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-sky-400 to-sky-500 shadow-md shadow-sky-200">
        <Icon className="h-5 w-5 text-white" />
        <span
          aria-hidden="true"
          className={`absolute top-1/2 h-px w-8 -translate-y-1/2 border-t-2 border-dashed border-sky-200 ${
            reverse ? "left-full" : "right-full"
          }`}
        />
      </div>
      <div>
        <h3 className="font-heading text-base font-bold text-slate-900">{feature.title}</h3>
        <p className="mt-1 max-w-[220px] text-sm leading-relaxed text-slate-500">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

export default function CabWhyChooseUs() {
  const left = FEATURES.slice(0, 3);
  const right = FEATURES.slice(3);

  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-heading text-3xl font-extrabold sm:text-4xl">
          <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
            Why Choose Us
          </span>
        </h2>

        {/* Mobile / tablet — image under heading, then horizontal-scroll feature cards */}
        <div className="lg:hidden">
          <div className="relative mx-auto mt-6 w-full max-w-[280px]">
            <Image
              src="/why-choose-us-cab.webp"
              alt="Kashmir cab"
              width={646}
              height={430}
              className="h-auto w-full"
            />
          </div>

          <div className="no-scrollbar mt-8 flex snap-x snap-mandatory overflow-x-auto">
            {[FEATURES.slice(0, 3), FEATURES.slice(3, 6)].map((slide, slideIndex) => (
              <div key={slideIndex} className="flex w-full shrink-0 snap-start flex-col gap-5 px-4">
                {slide.map((feature) => (
                  <div key={feature.title} className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-sky-400 to-sky-500 shadow-md shadow-sky-200">
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{feature.title}</h3>
                      <p className="mt-0.5 text-xs leading-snug text-slate-500">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop — features fanned out on either side of the image */}
        <div className="mt-14 hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8">
          <div className="flex flex-col items-end gap-16">
            {left.map((feature) => (
              <FeatureRow key={feature.title} feature={feature} reverse />
            ))}
          </div>

          <div className="relative w-72 xl:w-80">
            <Image
              src="/why-choose-us-cab.webp"
              alt="Kashmir cab"
              width={646}
              height={430}
              className="h-auto w-full"
            />
          </div>

          <div className="flex flex-col gap-16">
            {right.map((feature) => (
              <FeatureRow key={feature.title} feature={feature} />
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center lg:mt-12">
          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-8 py-3.5 font-semibold text-white shadow-lg shadow-sky-200 transition-transform hover:-translate-y-0.5"
          >
            <Car className="h-4 w-4" /> Book Now
          </Link>
        </div>
      </div>
    </section>
  );
}
