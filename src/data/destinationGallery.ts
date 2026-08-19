/**
 * Static photo set for the /destinations/ gallery.
 *
 * An item supplies EITHER its own `src` (a file under public/) OR a
 * `fromDestination` slug, in which case it reuses that destination's photo from
 * src/data/destinations.ts. That second form exists so the four place photos are
 * not pasted in twice — change a destination's image and the gallery follows.
 *
 * PLACEHOLDERS: the `src` entries point at photos already in this repo, chosen
 * because they exist and are roughly on-subject. Captions describe what is
 * actually visible in them today — if you swap a file, re-read its caption,
 * because a caption that no longer matches its photo is worse than no caption.
 * Real on-ground shots belong in public/destinations/gallery/.
 */

export type GalleryItem = {
  id: string;
  /** Destination slug this photo belongs to — drives the filter chips. */
  place: string;
  caption: string;
  /** Local file under public/. Omit when using `fromDestination`. */
  src?: string;
  /** Reuse this destination's `image`. Omit when using `src`. */
  fromDestination?: string;
};

export const DESTINATION_GALLERY: GalleryItem[] = [
  {
    id: "srinagar-lake",
    place: "srinagar",
    caption: "Houseboats moored on Dal Lake",
    fromDestination: "srinagar",
  },
  {
    id: "valley-snow",
    place: "srinagar",
    caption: "The valley under snow, boats still on the water",
    src: "/Home/kashmir-hero.webp",
  },
  {
    id: "gulmarg-slopes",
    place: "gulmarg",
    caption: "Gondolas climbing above the Gulmarg snowfields",
    fromDestination: "gulmarg",
  },
  {
    id: "gulmarg-peaks",
    place: "gulmarg",
    caption: "Peaks above the treeline at golden hour",
    src: "/destinations/hero/bg-mountains.webp",
  },
  {
    id: "pahalgam-lidder",
    place: "pahalgam",
    caption: "The Lidder valley at Pahalgam",
    fromDestination: "pahalgam",
  },
  {
    id: "srinagar-houseboat",
    place: "srinagar",
    caption: "Carved walnut veranda on a Dal Lake houseboat",
    src: "/stays/houseboat.webp",
  },
  {
    id: "sonamarg-meadows",
    place: "sonamarg",
    caption: "Meadows below the glaciers at Sonamarg",
    fromDestination: "sonamarg",
  },
  {
    id: "kheer-bhawani",
    place: "srinagar",
    caption: "Kheer Bhawani temple, an hour from Srinagar",
    src: "/temple-upload-images/Kheer-Bhawani-temple.webp",
  },
];
