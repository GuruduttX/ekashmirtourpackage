export const NAV_LINKS = [
  { label: "Home",        href: "/",            dropdown: null },
  { label: "Packages",    href: "#packages",    dropdown: "packages" },
  { label: "Services",    href: "#services",    dropdown: "services" },
  { label: "About",       href: "#about",       dropdown: null },
  { label: "Why Kashmir", href: "#why-kashmir", dropdown: null },
  { label: "Contact",     href: "#contact",     dropdown: null },
] as const;

export const NAV_PACKAGES = [
  { icon: "⛷️", title: "Gulmarg Snow Retreat",    duration: "5N / 6D", price: "₹32,999", tag: "Popular",   color: "#38BDF8" },
  { icon: "🛶", title: "Dal Lake Houseboat",       duration: "4N / 5D", price: "₹24,999", tag: "Romantic",  color: "#F472B6" },
  { icon: "🥾", title: "Pahalgam Valley Trek",     duration: "6N / 7D", price: "₹38,499", tag: "Adventure", color: "#34D399" },
  { icon: "✨", title: "Kashmir Grand Circuit",    duration: "8N / 9D", price: "₹54,999", tag: "Premium",   color: "#FBBF24" },
] as const;

export const NAV_SERVICES = [
  { icon: "🚗", title: "Luxury Transport",    desc: "Chauffeur-driven comfort & airport transfers" },
  { icon: "🧭", title: "Guided Tours",        desc: "Expert local knowledge & curated itineraries" },
  { icon: "🛶", title: "Shikara Rides",       desc: "Serene Dal Lake experience at dawn & dusk" },
  { icon: "📸", title: "Photography Tours",   desc: "Capture Kashmir's soul with a pro photographer" },
  { icon: "⛷️", title: "Ski & Snow Sports",  desc: "Gulmarg's world-class slopes & gondola" },
  { icon: "🍽️", title: "Kashmiri Cuisine",   desc: "Authentic Wazwan & local dining experiences" },
] as const;

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
