/**
 * The primary navigation.
 *
 * Ten items: four mega-dropdowns fed live from their own collection, then the
 * five standalone pages, then whatever is left under "More".
 *
 * THE BAR IS FULL. Ten labels plus the logo and the CTA need roughly 1,150px,
 * which is why the desktop nav only appears from the `xl` breakpoint and
 * everything below 1280px gets the drawer instead. An eleventh item does not
 * fit — it would have to displace one of these or go into "More".
 *
 * `href: null` means the item is a dropdown trigger only and navigates
 * nowhere — "More" is a menu, not a page. The navbar renders those as a
 * <button> rather than a <Link>, so it never ships an anchor to nothing.
 *
 * The blog is deliberately absent. It is reachable from article and guide
 * links in the page body, and putting it here would spend a slot on the
 * section least likely to start a booking.
 */
export interface NavLink {
  label: string;
  /** null for a dropdown-only trigger. */
  href: string | null;
  /** Key of the panel this opens, or null for a plain link. */
  dropdown: string | null;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home",         href: "/",                       dropdown: null },
  { label: "Packages",     href: "/kashmir-tour-packages/", dropdown: "packages" },
  { label: "Destinations", href: "/destinations",           dropdown: "destinations" },
  { label: "Experiences",  href: "/experiences",            dropdown: "experiences" },
  { label: "Temples",      href: "/temples",                dropdown: "temples" },
  { label: "Stays",        href: "/stays",                  dropdown: null },
  { label: "Cabs",         href: "/cab-service",            dropdown: null },
  { label: "About",        href: "/about",                  dropdown: null },
  { label: "Reviews",      href: "/review",                 dropdown: null },
  { label: "Contact",      href: "/contact",                dropdown: null },
  { label: "More",         href: null,                      dropdown: "more" },
];

/**
 * What is left under "More" — the two pages that belong in the navigation but
 * not in the bar itself.
 *
 * Stays, Cabs, About, Reviews and Contact were promoted out of here to
 * top-level links, which is why this list is short. The panel sizes itself
 * from the count, so it does not open a 620px sheet for two rows.
 *
 * Static by design: unlike the other four panels there is no collection behind
 * this one, so it needs no fetch and renders instantly.
 */
export interface NavMoreLink {
  label: string;
  href: string;
  /** One line on what is actually there — the panel is a menu, not a sitemap. */
  desc: string;
  icon: string;
}

export const NAV_MORE_LINKS: NavMoreLink[] = [
  { label: "Festivals",   href: "/festivals",     desc: "Tulips, Amarnath, saffron — and when each falls", icon: "🌷" },
  { label: "Why Kashmir", href: "/whyKashmir",    desc: "What makes the valley worth the trip", icon: "❄" },
  { label: "Meet Sartaj", href: "/author/sartaj", desc: "The guide behind the on-ground tips",  icon: "☕" },
];


import {
  Waves,
  Car,
  Users,
  Utensils,
  Snowflake,
  Map,
  Camera,
  Tent,
  LucideIcon,
} from "lucide-react";

export interface ServiceData {
  id: string;
  title: string;
  icon: LucideIcon;
  image: string;
  features: string[];
}

export const servicesData: ServiceData[] = [
  {
    id: "s1",
    title: "Premium Shikara Rides",
    icon: Waves,
    image:
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&q=80&w=150&h=150",
    features: ["Luxury Houseboats", "Sunset Lake Views", "Floating Markets"],
  },
  {
    id: "s2",
    title: "Luxury Transport",
    icon: Car,
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=150&h=150",
    features: ["Chauffeur-driven comfort", "Local Tours", "Airport Transfers"],
  },
  {
    id: "s3",
    title: "Certified Local Guides",
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&q=80&w=150&h=150",
    features: [
      "Expert history knowledge",
      "Trekking routes",
      "Multilingual guides",
    ],
  },
  {
    id: "s4",
    title: "Kashmir cuisine",
    icon: Utensils,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/be/Kashmiri_cuisine_waazwan.jpg",
    features: ["Traditional Wazwan", "Local Art & Craft", "Cultural Heritage"],
  },
  {
    id: "s5",
    title: "Gulmarg Skiing",
    icon: Snowflake,
    image:
      "https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&q=80&w=150&h=150",
    features: [
      "Professional Instructors",
      "Premium Gear Rentals",
      "Gondola Tickets",
    ],
  },
  {
    id: "s6",
    title: "Pahalgam Valley Tour",
    icon: Map,
    image:
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=150&h=150",
    features: ["Betaab & Aru Valley", "Scenic Pony Rides", "River Rafting"],
  },
  {
    id: "s7",
    title: "Photography Services",
    icon: Camera,
    image:
      "https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&q=80&w=150&h=150",
    features: [
      "Professional Shoots",
      "Traditional Attire",
      "Drone Cinematography",
    ],
  },
  {
    id: "s8",
    title: "Adventure & Camping",
    icon: Tent,
    image:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=150&h=150",
    features: ["Alpine Lake Treks", "Luxury Glamping", "Bonfire Nights"],
  },
];

export const PACKAGES = [
  {
    id: 1,
    title: "Gulmarg Snow Retreat",
    duration: "5 Nights · 6 Days",
    price: "₹32,999",
    priceNote: "per person",
    tag: "Most Popular",
    tagColor: "bg-[#3B82F6]",
    description:
      "Gondola rides above the clouds, open-slope skiing, and snowscapes so still they feel unreal.",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Dal Lake Houseboat Escape",
    duration: "4 Nights · 5 Days",
    price: "₹24,999",
    priceNote: "per person",
    tag: "Romantic",
    tagColor: "bg-rose-500",
    description:
      "Cedar-wood houseboats, shikara rides at dawn, floating gardens, and the silence of still water.",
    image:
      "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Pahalgam Valley Trek",
    duration: "6 Nights · 7 Days",
    price: "₹38,499",
    priceNote: "per person",
    tag: "Adventure",
    tagColor: "bg-emerald-600",
    description:
      "Alpine meadows, Betaab Valley's green rush, and the cold clarity of Lidder River on your skin.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Kashmir Grand Circuit",
    duration: "8 Nights · 9 Days",
    price: "₹54,999",
    priceNote: "per person",
    tag: "Premium",
    tagColor: "bg-amber-500",
    description:
      "Every layer of Kashmir — from Srinagar's Mughal gardens to Sonamarg's glacial silence.",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
  },
] as const;

export type Package = (typeof PACKAGES)[number];

export const WHY_FEATURES = [
  {
    icon: "❄️",
    title: "Winter Solitude",
    description:
      "Kashmir under snow is like no other place — an infinite silence broken only by the sound of fresh powder beneath your feet.",
  },
  {
    icon: "🏔",
    title: "Himalayan Grandeur",
    description:
      "Framed by the Pir Panjal and Great Himalayan ranges, the scenery shifts hour by hour — and it is always breathtaking.",
  },
  {
    icon: "🛶",
    title: "Shikara at Dawn",
    description:
      "There is no gentler way to greet a morning than drifting through mist on a hand-carved wooden boat as the lake wakes up.",
  },
  {
    icon: "🏡",
    title: "Heritage & Craft",
    description:
      "Sleep on century-old cedar-wood houseboats adorned with walnut carvings and hand-knotted Kashmiri rugs.",
  },
] as const;

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    text: "Waking up on the houseboat with snow-capped mountains reflected in Dal Lake — I felt like I was inside a living painting. Not a single moment felt like tourism.",
    rating: 5,
    initials: "PS",
  },
  {
    id: 2,
    name: "Arjun Mehta",
    location: "New Delhi",
    text: "The Gulmarg gondola at sunrise — the moment the clouds parted and revealed the whole range — I genuinely had no words. eKashmir made it feel completely effortless.",
    rating: 5,
    initials: "AM",
  },
  {
    id: 3,
    name: "Kavya Nair",
    location: "Bangalore",
    text: "I've travelled to thirty countries. Kashmir in winter is something else entirely. The cold air, the silence, the snow — it doesn't just move you, it resets you.",
    rating: 5,
    initials: "KN",
  },
] as const;
