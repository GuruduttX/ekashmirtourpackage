import type { GalleryImage } from "@/data/experienceGallery";

/**
 * Static gallery for the /festivals/ "Festival gallery" strip.
 *
 * Reuses the GalleryImage shape from experienceGallery so the same
 * <GalleryDialog /> can open either set — this is the hub's own showcase reel,
 * not a per-festival gallery, so it does not belong on any festival record.
 *
 * PLACEHOLDER PHOTOGRAPHY: the URLs are stock stand-ins, exactly as in
 * experienceGallery. Both `caption` and `alt` therefore describe the KIND of
 * photo each slot holds, not a picture anyone has verified. Rewrite both
 * against the real image when it lands — captioning a stock crowd as a named
 * festival is the specific mistake the festivals data file warns about.
 *
 * PORTRAIT CROPS: the strip renders these tall, so `h=1600` rather than the
 * landscape `w=1600` the experiences file asks for.
 */

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&h=1600&q=80`;

export const FESTIVAL_GALLERY: GalleryImage[] = [
  {
    id: "fest-gal-1",
    url: img("1609766857041-ed402ea8069a"),
    caption: "A bonfire gathering in a mountain village at midwinter",
    alt: "Villagers in embroidered woollens circling a fire between timber houses under snow peaks",
  },
  {
    id: "fest-gal-2",
    url: img("1595815771614-ade9d652a65d"),
    caption: "Shikaras dressed for the water procession on Dal Lake",
    alt: "Canopied wooden boat crossing still lake water with snow mountains behind",
  },
  {
    id: "fest-gal-3",
    url: img("1516483638261-f4dbaf036963"),
    caption: "Silver headdresses and pom-poms at a valley procession",
    alt: "Row of dancers in heavy silver jewellery and bright woollen caps facing the crowd",
  },
  {
    id: "fest-gal-4",
    url: img("1524492412937-b28074a5d7da"),
    caption: "Tulip beds at full colour under the Zabarwan ridge",
    alt: "Long rows of red and yellow tulips running towards a wooded hillside",
  },
  {
    id: "fest-gal-5",
    url: img("1566837945700-30057527ade0"),
    caption: "First light on the lake before a festival morning",
    alt: "Still lake water at dawn with moored wooden boats and mist on the far bank",
  },
  {
    id: "fest-gal-6",
    url: img("1519681393784-d120267933ba"),
    caption: "A clear night over the high camps on the yatra route",
    alt: "Snow-covered peaks under a dark sky full of stars",
  },
  {
    id: "fest-gal-7",
    url: img("1551632811-561732d1e306"),
    caption: "Ponies on the pilgrim trail above the treeline",
    alt: "Group with ponies crossing a wooden bridge over a fast river below forested slopes",
  },
  {
    id: "fest-gal-8",
    url: img("1504280390367-361c6d9f38f4"),
    caption: "Camp pitched beside the river for the night of the mela",
    alt: "Dome tents on grass beside a river with pine slopes rising behind",
  },
];

export function getFestivalGallery(): GalleryImage[] {
  return FESTIVAL_GALLERY;
}
