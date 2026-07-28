import { MapPin } from "lucide-react";

interface Props {
  mapEmbedUrl?: string;
  destination?: string;
}

/**
 * Accepts either a bare embed URL or a full pasted <iframe> snippet
 * (e.g. copied from Google Maps > Share > Embed a map) and extracts
 * the src so content editors don't need to hand-edit HTML.
 */
function extractEmbedSrc(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
  if (srcMatch) return srcMatch[1];

  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  return null;
}

export default function PackageLocationMap({ mapEmbedUrl, destination }: Props) {
  const src = mapEmbedUrl ? extractEmbedSrc(mapEmbedUrl) : null;
  if (!src) return null;

  return (
    <div className="w-full min-w-0 px-2 sm:px-0">
      <div className="overflow-hidden rounded-3xl border border-sky-100/60 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-3.5">
          <MapPin className="h-4 w-4 shrink-0 text-sky-500" />
          <p className="text-sm font-semibold text-slate-800">
            {destination ? `Location — ${destination}` : "Location"}
          </p>
        </div>
        <iframe
          src={src}
          title={destination ? `Map showing ${destination}` : "Location map"}
          className="h-64 w-full border-0 sm:h-72"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
