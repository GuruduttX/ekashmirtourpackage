import type { Stay as StaticStay } from "@/data/stays";
import type { StayAmenityGroup, StayCategory } from "@/types/stayTypes";
import type { StayPlaceLinkType } from "@/types/stayPlaceTypes";

/**
 * One normalised shape for an individual stay page (/stays/[property-slug]),
 * so the view does not care whether the content came from the CMS or the
 * static placeholder data.
 *
 * The dispatcher prefers a published Stay record and falls back to the static
 * list, which keeps the pages alive while the CMS is being filled.
 */

export type StayDetailImage = { id: string; image: string; alt: string };

export type StayDetailPage = {
  slug: string;
  title: string;
  titleAccent?: string;
  category: StayCategory;
  town: string;
  area: string;
  address: string;
  host: string;
  placeTags: string[];

  eyebrow: string;
  quickAnswer: string;
  heroImage: { image: string; alt: string };
  gallery: StayDetailImage[];

  priceFrom: number;
  bestFor: string;
  sleeps: number;
  bedrooms: number;
  checkIn: string;
  checkOut: string;
  minNights: number;
  highlights: string[];

  quickInclusions: { freeWifi: boolean; breakfast: boolean; parking: boolean };
  amenities: Array<{ id: string; label: string; group: StayAmenityGroup }>;

  /** HTML from the rich text editor — sanitise before rendering. */
  overview: string;

  inclusions: string[];
  exclusions: string[];

  cancellationPolicy: string;
  paymentTerms: string;
  houseRules: string[];

  tipsHeading?: string;
  tipsIntro?: string;
  sartajTips: Array<{ id: string; title: string; tip: string }>;

  faqsHeading?: string;
  faqsIntro?: string;
  faqs: Array<{ id: string; question: string; answer: string }>;

  linksHeading?: string;
  linksIntro?: string;
  internalLinks: Array<{
    id: string;
    type: StayPlaceLinkType;
    label: string;
    slug: string;
    description?: string;
  }>;

  metaTitle: string;
  metaDescription: string;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
/** Lean Stay document → page shape. */
export function recordToStayDetail(record: any): StayDetailPage {
  const gallery: StayDetailImage[] = record.gallery ?? [];

  return {
    slug: record.slug,
    title: record.title,
    titleAccent: record.titleAccent || undefined,
    category: record.category,
    town: record.town ?? "",
    area: record.area ?? "",
    address: record.address ?? "",
    host: record.host ?? "",
    placeTags: record.placeTags ?? [],

    eyebrow: record.eyebrow || record.category,
    quickAnswer: record.quickAnswer ?? "",
    heroImage: {
      image: record.heroImage?.image || gallery[0]?.image || "",
      alt: record.heroImage?.alt || gallery[0]?.alt || record.title,
    },
    gallery,

    priceFrom: record.priceFrom ?? 0,
    bestFor: record.bestFor ?? "",
    sleeps: record.sleeps ?? 0,
    bedrooms: record.bedrooms ?? 0,
    checkIn: record.checkIn ?? "",
    checkOut: record.checkOut ?? "",
    minNights: record.minNights ?? 1,
    highlights: (record.highlights ?? []).map((h: any) => h.label).filter(Boolean),

    quickInclusions: {
      freeWifi: record.quickInclusions?.freeWifi ?? false,
      breakfast: record.quickInclusions?.breakfast ?? false,
      parking: record.quickInclusions?.parking ?? false,
    },
    amenities: record.amenities ?? [],

    overview: record.overview ?? "",

    inclusions: (record.inclusions ?? []).map((i: any) => i.description).filter(Boolean),
    exclusions: (record.exclusions ?? []).map((e: any) => e.description).filter(Boolean),

    cancellationPolicy: record.cancellationPolicy ?? "",
    paymentTerms: record.paymentTerms ?? "",
    houseRules: (record.houseRules ?? []).map((r: any) => r.rule).filter(Boolean),

    tipsHeading: record.tipsHeading || undefined,
    tipsIntro: record.tipsIntro || undefined,
    sartajTips: record.sartajTips ?? [],

    faqsHeading: record.faqsHeading || undefined,
    faqsIntro: record.faqsIntro || undefined,
    faqs: record.faqs ?? [],

    linksHeading: record.linksHeading || undefined,
    linksIntro: record.linksIntro || undefined,
    internalLinks: record.internalLinks ?? [],

    metaTitle: record.metaTitle || record.title,
    metaDescription: record.metaDescription || record.quickAnswer || "",
  };
}

/** Last path segment — "/destinations/gulmarg/" → "gulmarg". */
function slugFromPath(path: string): string {
  return path.replace(/^\/+|\/+$/g, "").split("/").pop() ?? "";
}

/** Static placeholder stay → page shape. Fallback only. */
export function staticStayToDetail(stay: StaticStay): StayDetailPage {
  const amenityLabels = Array.from(
    new Set(stay.options.flatMap((option) => option.amenities)),
  );

  return {
    slug: stay.slug,
    title: stay.title,
    category: stay.category,
    town: stay.town,
    area: stay.area,
    address: stay.area,
    host: "",
    placeTags: stay.placeTags,

    eyebrow: stay.category,
    quickAnswer: stay.answerBlock,
    heroImage: {
      image: stay.gallery[0]?.image ?? stay.image,
      alt: stay.gallery[0]?.alt ?? stay.alt,
    },
    gallery: stay.gallery,

    priceFrom: stay.priceFrom,
    bestFor: stay.options[0]?.bestFor ?? "",
    sleeps: stay.sleeps,
    bedrooms: 0,
    checkIn: "",
    checkOut: "",
    minNights: 1,
    highlights: stay.highlights,

    quickInclusions: {
      freeWifi: amenityLabels.some((a) => /wi-?fi/i.test(a)),
      breakfast: amenityLabels.some((a) => /breakfast|all meals/i.test(a)),
      parking: amenityLabels.some((a) => /parking/i.test(a)),
    },
    amenities: amenityLabels.map((label, i) => ({
      id: `a${i + 1}`,
      label,
      group: "Essentials" as StayAmenityGroup,
    })),

    overview: `<p>${stay.answerBlock}</p>`,

    inclusions: stay.options[0]?.amenities ?? [],
    exclusions: [],

    cancellationPolicy: "",
    paymentTerms: "",
    houseRules: [],

    sartajTips: stay.sartajTips.map((tip, i) => ({
      id: `t${i + 1}`,
      title: `Tip ${i + 1}`,
      tip,
    })),

    faqs: stay.faqs,

    internalLinks: [
      {
        id: "l1",
        type: "destination" as const,
        label: `Things to do in ${stay.town}`,
        slug: slugFromPath(stay.links.destination),
      },
      {
        id: "l2",
        type: "package" as const,
        label: `${stay.town} tour packages`,
        slug: slugFromPath(stay.links.package),
      },
    ].filter((link) => link.slug.length > 0),

    metaTitle: stay.metaTitle ?? stay.title,
    metaDescription: stay.metaDescription ?? stay.answerBlock,
  };
}
