import type { ITempleSeasonTimings } from "@/types/templeTypes";

export function formatEntryFee(entryFeeINR?: number | null): string {
  if (entryFeeINR === undefined || entryFeeINR === null || Number.isNaN(entryFeeINR)) return "";
  return entryFeeINR === 0 ? "Free" : `₹${entryFeeINR.toLocaleString("en-IN")}`;
}

export function formatDistance(distanceKm?: number | null, from?: string): string {
  if (distanceKm === undefined || distanceKm === null || Number.isNaN(distanceKm)) return "";
  return `${distanceKm} km${from ? ` from ${from}` : ""}`;
}

export function formatTimeRange(startTime?: string, endTime?: string): string {
  if (!startTime) return "";
  return endTime ? `${startTime} – ${endTime}` : startTime;
}

/** A short single-line summary (e.g. for compact cards) of the first entry
 * in the first period of the first season. */
export function getTimingsSummary(seasonalTimings?: ITempleSeasonTimings[]): string {
  const entry = seasonalTimings?.[0]?.periods?.[0]?.entries?.[0];
  if (!entry) return "";
  return formatTimeRange(entry.startTime, entry.endTime);
}
