/**
 * Static gallery for the /experiences/ "Travellers Gallery" strip.
 *
 * Static by design — these are the hub's own showcase photos, not a per-activity
 * gallery, so they do not belong on any activity record. When real traveller
 * photos land, replace the URLs here and nothing else changes.
 *
 * PLACEHOLDER PHOTOGRAPHY: the URLs are stock stand-ins. Both `caption` and
 * `alt` therefore describe the *kind* of photo each slot holds rather than a
 * picture anyone has verified — rewrite both against the real image when it
 * arrives. Captioning a photo as somewhere it is not is exactly the failure the
 * destinations data file already warns about.
 */

export type GalleryImage = {
  id: string;
  /** Image URL. Local paths under /public are fine too. */
  url: string;
  /** Human-facing caption — shown on hover in the strip and under the dialog image. */
  caption: string;
  /**
   * Alt text. Kept separate from `caption` on purpose: a caption adds context a
   * sighted reader can see ("Gulmarg, February"), while alt has to convey the
   * picture itself. Falls back to the caption when omitted.
   */
  alt?: string;
};

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

export const EXPERIENCE_GALLERY: GalleryImage[] = [
  {
    id: "gal-1",
    url: img("1551632811-561732d1e306"),
    caption: "Crossing the Lidder on the pony trail above Pahalgam",
    alt: "Group with ponies crossing a wooden bridge over a fast river below forested slopes",
  },
  {
    id: "gal-2",
    url: img("1464822759023-fed622ff2c3b"),
    caption: "The Sonamarg meadows opening up in late June",
    alt: "Green alpine valley running towards snow-streaked peaks under a cloudy sky",
  },
  {
    id: "gal-3",
    url: img("1516738901171-8eb4fc13bd20"),
    caption: "Gondola cabin climbing towards Apharwat",
    alt: "Red cable-car cabin on its line above pine forest and bare mountain",
  },
  {
    id: "gal-4",
    url: img("1454496522488-7a8e488e8606"),
    caption: "Chairlift over the Gulmarg bowl",
    alt: "Chairlift cables running across open meadow towards distant ridges",
  },
  {
    id: "gal-5",
    url: img("1566837945700-30057527ade0"),
    caption: "First light on Dal Lake, before the shikaras go out",
    alt: "Still lake water at dawn with moored wooden boats and mist on the far bank",
  },
  {
    id: "gal-6",
    url: img("1551524559-8af4e6624178"),
    caption: "February powder on the Kongdoori slopes",
    alt: "Skier turning through deep snow with snow-laden conifers behind",
  },
  {
    id: "gal-7",
    url: img("1519681393784-d120267933ba"),
    caption: "Clear night over the high camps",
    alt: "Snow-covered peaks under a dark sky full of stars",
  },
  {
    id: "gal-8",
    url: img("1504280390367-361c6d9f38f4"),
    caption: "Riverside camp at Aru, pitched for the night",
    alt: "Dome tents on grass beside a river with pine slopes rising behind",
  },
];

export function getGalleryImages(): GalleryImage[] {
  return EXPERIENCE_GALLERY;
}

/** Alt text for a slide, falling back to the caption when none is set. */
export function galleryAlt(image: GalleryImage): string {
  return image.alt ?? image.caption;
}
