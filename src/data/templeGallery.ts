export interface TempleGalleryImage {
  id: string;
  src: string;
  caption: string;
  alt: string;
}

/**
 * Static gallery data for the /temples hub gallery section.
 *
 * The first six entries are the ones laid out in the grid on the page; the
 * full list is what the lightbox cycles through. Placeholder imagery for now —
 * swap `src` for the real photographs (or Cloudinary URLs) when they land.
 */
export const TEMPLE_GALLERY: TempleGalleryImage[] = [
  {
    id: "kheer-bhawani",
    src: "https://picsum.photos/seed/kheer-bhawani-temple/900/1200",
    caption: "Kheer Bhawani",
    alt: "Kheer Bhawani temple with its sacred spring at Tulmulla, Ganderbal",
  },
  {
    id: "amarnath-cave",
    src: "https://picsum.photos/seed/amarnath-cave-shrine/1200/900",
    caption: "Amarnath Cave",
    alt: "Pilgrims outside the Amarnath cave shrine in the Himalayas",
  },
  {
    id: "shankaracharya",
    src: "https://picsum.photos/seed/shankaracharya-temple/900/1200",
    caption: "Shankaracharya Temple",
    alt: "Shankaracharya temple on its hilltop above Srinagar",
  },
  {
    id: "hazratbal",
    src: "https://picsum.photos/seed/hazratbal-shrine/1200/900",
    caption: "Hazratbal Shrine",
    alt: "The white marble dome of Hazratbal shrine beside Dal Lake",
  },
  {
    id: "khanqah-e-moula",
    src: "https://picsum.photos/seed/khanqah-e-moula/1200/900",
    caption: "Khanqah-e-Moula",
    alt: "The carved wooden facade of Khanqah-e-Moula in old Srinagar",
  },
  {
    id: "raghunath",
    src: "https://picsum.photos/seed/raghunath-temple/900/1200",
    caption: "Raghunath Temple",
    alt: "The ornate entrance of Raghunath temple in Jammu",
  },
  {
    id: "charar-e-sharief",
    src: "https://picsum.photos/seed/charar-e-sharief/1200/900",
    caption: "Charar-e-Sharief",
    alt: "The timber shrine of Charar-e-Sharief in Budgam",
  },
  {
    id: "jamia-masjid",
    src: "https://picsum.photos/seed/jamia-masjid-srinagar/1200/900",
    caption: "Jamia Masjid",
    alt: "The courtyard and wooden pillars of Jamia Masjid, Srinagar",
  },
  {
    id: "martand-sun-temple",
    src: "https://picsum.photos/seed/martand-sun-temple/1200/900",
    caption: "Martand Sun Temple",
    alt: "The stone ruins of the Martand sun temple near Anantnag",
  },
  {
    id: "vaishno-devi",
    src: "https://picsum.photos/seed/vaishno-devi-shrine/900/1200",
    caption: "Vaishno Devi",
    alt: "The pilgrimage route leading up to the Vaishno Devi shrine",
  },
];

/** The six photographs featured in the grid on the temples hub page. */
export const TEMPLE_GALLERY_FEATURED = TEMPLE_GALLERY.slice(0, 6);