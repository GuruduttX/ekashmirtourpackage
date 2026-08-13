import type { StayPlaceDef } from "@/data/stayTaxonomy";
import type { StayPlaceLinkType } from "@/types/stayPlaceTypes";

/**
 * One normalised shape for a /stays/[place]-stays page, so the view does not
 * care whether the content came from the CMS or the static seed data.
 *
 * The dispatcher prefers a published StayPlace record and falls back to the
 * static taxonomy, which keeps the pages alive while the CMS is being filled.
 */

export type StayPlacePageLink = {
  id: string;
  type: StayPlaceLinkType;
  label: string;
  /** Slug within its section, no prefix — see hrefForLink(). */
  slug: string;
  description?: string;
};

export type StayPlacePage = {
  slug: string;
  placeKey: string;
  name: string;
  parentTown?: string;

  eyebrow: string;
  title: string;
  titleAccent?: string;
  quickAnswer: string;
  heroImage: { image: string; alt: string };

  archiveHeading?: string;
  archiveIntro?: string;

  tipsHeading?: string;
  tipsIntro?: string;
  sartajTips: Array<{ id: string; title: string; tip: string }>;

  faqsHeading?: string;
  faqsIntro?: string;
  faqs: Array<{ id: string; question: string; answer: string }>;

  linksHeading?: string;
  linksIntro?: string;
  internalLinks: StayPlacePageLink[];

  metaTitle: string;
  metaDescription: string;
};

/** URL prefix per link type. Change a section's URL pattern here, once. */
const LINK_PREFIX: Record<StayPlaceLinkType, string> = {
  cab: "/cab-service/",
  package: "/kashmir-tour-packages/",
  destination: "/destinations/",
  temple: "/temples/",
  experience: "/experiences/",
  activity: "/experiences/",
  blog: "/blog/",
  stayType: "/stays/",
};

export function hrefForLink(link: {
  type: StayPlaceLinkType;
  slug: string;
}): string {
  const slug = link.slug.replace(/^\/+|\/+$/g, "");
  return `${LINK_PREFIX[link.type] ?? "/"}${slug}${slug ? "/" : ""}`;
}

/** Last path segment of a full path — "/destinations/gulmarg/" → "gulmarg". */
function slugFromPath(path: string): string {
  return path.replace(/^\/+|\/+$/g, "").split("/").pop() ?? "";
}

/** Static taxonomy → page shape. Used as the fallback and as seed input. */
export function staticPlaceToPage(def: StayPlaceDef): StayPlacePage {
  return {
    slug: `${def.slug}-stays`,
    placeKey: def.slug,
    name: def.name,
    eyebrow: def.name,
    title: def.title,
    quickAnswer: def.answerBlock,
    heroImage: { image: def.image, alt: def.alt },
    sartajTips: def.sartajTips,
    faqs: def.faqs,
    internalLinks: [
      {
        id: "seed-destination",
        type: "destination" as const,
        label: `Things to do in ${def.name}`,
        slug: slugFromPath(def.links.destination),
        description: "",
      },
      {
        id: "seed-cab",
        type: "cab" as const,
        label: `Cab fares to ${def.name}`,
        slug: slugFromPath(def.links.cabRoute),
        description: "",
      },
    ].filter((link) => link.slug.length > 0),
    metaTitle: def.metaTitle,
    metaDescription: def.metaDescription,
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/** Lean StayPlace document → page shape. */
export function recordToPage(record: any): StayPlacePage {
  return {
    slug: record.slug,
    placeKey: record.placeKey,
    name: record.name,
    parentTown: record.parentTown || undefined,

    eyebrow: record.eyebrow || record.name,
    title: record.title,
    titleAccent: record.titleAccent || undefined,
    quickAnswer: record.quickAnswer || "",
    heroImage: {
      image: record.heroImage?.image ?? "",
      alt: record.heroImage?.alt ?? record.name,
    },

    archiveHeading: record.archiveHeading || undefined,
    archiveIntro: record.archiveIntro || undefined,

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
