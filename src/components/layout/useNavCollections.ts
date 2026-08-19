"use client";

import { useCallback, useRef, useState } from "react";

/**
 * The collections behind the navbar's mega-dropdowns.
 *
 * Every one is fetched LAZILY — `load()` runs the first time its panel opens,
 * so a visitor who never touches the nav pays for none of them, and opening
 * Destinations never fetches Temples. The in-flight promise is cached, so
 * hovering in and out repeatedly cannot fire duplicate requests.
 *
 * A failure clears the cached promise rather than caching the failure, so the
 * next open retries instead of showing the error for the rest of the session.
 * Same contract as useNavPackages, which predates this file and keeps its own
 * copy because its shape is materially different.
 *
 * Each panel asks for `?status=published` — a draft must never be advertised in
 * the navigation of a live site.
 */

/* -------------------------------------------------------------------------- */
/* The generic lazy collection                                                 */
/* -------------------------------------------------------------------------- */

function useLazyCollection<Raw, Item>(
  url: string,
  key: string,
  map: (raw: Raw) => Item,
) {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const requestRef = useRef<Promise<void> | null>(null);

  const load = useCallback(() => {
    if (requestRef.current) return requestRef.current;

    setLoading(true);
    const request = fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${key}`);
        return res.json();
      })
      .then((data: Record<string, Raw[]>) => {
        setItems((data[key] ?? []).map(map));
        setError(false);
      })
      .catch(() => {
        setError(true);
        requestRef.current = null;
      })
      .finally(() => setLoading(false));

    requestRef.current = request;
    return request;
  }, [url, key, map]);

  return { items, isLoading, hasError, load };
}

/* -------------------------------------------------------------------------- */
/* Destinations                                                                */
/* -------------------------------------------------------------------------- */

export interface NavDestination {
  id: string;
  name: string;
  slug: string;
  image: string;
  imageAlt: string;
  summary: string;
  /** Drive from Srinagar. Empty for Srinagar itself, which the card labels. */
  fromSrinagar: string;
  bestTime: string;
  idealDays: string;
}

interface RawDestination {
  _id: string;
  name?: string;
  slug?: string;
  image?: string;
  imageAlt?: string;
  summary?: string;
  fromSrinagar?: string;
  bestTime?: string;
  idealDays?: string;
}

const mapDestination = (d: RawDestination): NavDestination => ({
  id: d._id,
  name: d.name ?? "Untitled",
  slug: d.slug ?? "",
  image: d.image ?? "",
  imageAlt: d.imageAlt ?? d.name ?? "",
  summary: d.summary ?? "",
  fromSrinagar: d.fromSrinagar ?? "",
  bestTime: d.bestTime ?? "",
  idealDays: d.idealDays ?? "",
});

export const useNavDestinations = () =>
  useLazyCollection<RawDestination, NavDestination>(
    "/api/destinations?status=published",
    "destinations",
    mapDestination,
  );

/* -------------------------------------------------------------------------- */
/* Experiences                                                                 */
/* -------------------------------------------------------------------------- */

export interface NavExperience {
  id: string;
  title: string;
  slug: string;
  image: string;
  imageAlt: string;
  location: string;
  duration: string;
  price: number;
  difficulty: string;
  season: string;
  featured: boolean;
}

interface RawExperience {
  _id: string;
  title?: string;
  slug?: string;
  gallery?: { image?: string; alt?: string }[];
  location?: string;
  duration?: string;
  pricePerPerson?: number;
  difficulty?: string;
  season?: string;
  featured?: boolean;
}

const mapExperience = (a: RawExperience): NavExperience => ({
  id: a._id,
  title: a.title ?? "Untitled",
  slug: a.slug ?? "",
  // The first gallery slide is the cover, the same one the card and the share
  // image use — there is no separate cover field to disagree with it.
  image: a.gallery?.[0]?.image ?? "",
  imageAlt: a.gallery?.[0]?.alt ?? a.title ?? "",
  location: a.location ?? "",
  duration: a.duration ?? "",
  price: a.pricePerPerson ?? 0,
  difficulty: a.difficulty ?? "",
  season: a.season ?? "",
  featured: a.featured ?? false,
});

export const useNavExperiences = () =>
  useLazyCollection<RawExperience, NavExperience>(
    "/api/experiences?status=published",
    "activities",
    mapExperience,
  );

/* -------------------------------------------------------------------------- */
/* Temples                                                                     */
/* -------------------------------------------------------------------------- */

export interface NavTemple {
  id: string;
  title: string;
  slug: string;
  image: string;
  imageAlt: string;
  deity: string;
  location: string;
  distance: string;
  /** Display string — "Free" is a real answer here and 0 would read as unknown. */
  entryFee: string;
}

interface RawTemple {
  _id: string;
  title?: string;
  slug?: string;
  image?: string;
  alt?: string;
  deity?: string;
  location?: string;
  distanceFromSrinagar?: string;
  entryFee?: string;
}

const mapTemple = (t: RawTemple): NavTemple => ({
  id: t._id,
  title: t.title ?? "Untitled",
  slug: t.slug ?? "",
  image: t.image ?? "",
  imageAlt: t.alt ?? t.title ?? "",
  deity: t.deity ?? "",
  location: t.location ?? "",
  distance: t.distanceFromSrinagar ?? "",
  entryFee: t.entryFee ?? "",
});

export const useNavTemples = () =>
  useLazyCollection<RawTemple, NavTemple>(
    "/api/temples?status=published",
    "temples",
    mapTemple,
  );
