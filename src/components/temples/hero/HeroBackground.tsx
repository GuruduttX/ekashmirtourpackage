import Image from "next/image";

const BACKGROUND_IMAGE = "/temple-hub/temple-hub-background-image.png";

/** Static, full-bleed background photo — no animation. */
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={BACKGROUND_IMAGE}
        alt="Misty forested mountains of the Kashmir valley"
        fill
        unoptimized
        priority
        className="object-cover"
      />
      {/* Legibility gradient — darker on the left where the text sits */}
      <div className="absolute inset-0 bg-linear-to-r from-slate-950/70 via-slate-950/35 to-slate-950/10" />
      <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 via-transparent to-slate-950/10" />
    </div>
  );
}
