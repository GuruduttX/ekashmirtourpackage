"use client";

import { useCallback, useRef, useState } from "react";

export interface NavPackage {
  id: string;
  title: string;
  slug: string;
  /** e.g. "3D/2N" */
  duration: string;
  days: number;
  destination: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  themes: string[];
}

interface RawPackage {
  _id: string;
  title?: string;
  slug?: string;
  duration?: string;
  days?: number;
  destination?: string;
  price?: number;
  rating?: number;
  reviews?: number;
  heroImage?: { image?: string; alt?: string };
  themes?: string[];
}

/**
 * Published packages for the navbar dropdown.
 *
 * Fetched lazily — `load()` is called the first time the dropdown opens, so a
 * visitor who never touches it never pays for the request. The in-flight promise
 * is cached so hovering repeatedly can't fire duplicate calls.
 */
export function useNavPackages() {
  const [packages, setPackages] = useState<NavPackage[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const requestRef = useRef<Promise<void> | null>(null);

  const load = useCallback(() => {
    if (requestRef.current) return requestRef.current;

    setLoading(true);
    const request = fetch("/api/packages?status=published")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load packages");
        return res.json();
      })
      .then(({ packages: raw }: { packages: RawPackage[] }) => {
        setPackages(
          (raw ?? []).map((p) => ({
            id: p._id,
            title: p.title ?? "Untitled package",
            slug: p.slug ?? "",
            duration: p.duration ?? "",
            days: p.days ?? 0,
            destination: p.destination ?? "",
            price: p.price ?? 0,
            rating: p.rating ?? 0,
            reviews: p.reviews ?? 0,
            image: p.heroImage?.image ?? "",
            themes: p.themes ?? [],
          }))
        );
        setError(false);
      })
      .catch(() => {
        setError(true);
        // Allow a retry on the next open rather than caching the failure.
        requestRef.current = null;
      })
      .finally(() => setLoading(false));

    requestRef.current = request;
    return request;
  }, []);

  return { packages, isLoading, hasError, load };
}

export const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;
