import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "eKashmir Tour Packages | Premium Kashmir Holiday Packages",
    template: "%s | eKashmir Tour Packages",
  },
  description:
    "Book premium Kashmir tour packages with eKashmir. Explore Gulmarg snow retreats, Dal Lake houseboats, Pahalgam valley treks & Sonamarg glaciers. Customized Kashmir holidays from ₹8,999.",
  keywords:
    "Kashmir tour packages, Kashmir holiday packages, Gulmarg tour, Dal Lake houseboat, Pahalgam tour, Sonamarg glacier, Kashmir honeymoon packages, Kashmir family tour, eKashmir",
  authors: [{ name: "eKashmir Tour Packages" }],
  creator: "eKashmir",
  publisher: "eKashmir",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "eKashmir Tour Packages",
    title: "eKashmir Tour Packages | Premium Kashmir Holiday Packages",
    description:
      "Book premium Kashmir tour packages. Gulmarg snow retreats, Dal Lake houseboats, Pahalgam valley treks & Sonamarg glaciers. Expert-crafted Kashmir holidays.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "eKashmir Tour Packages — Premium Kashmir Holidays",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "eKashmir Tour Packages | Premium Kashmir Holiday Packages",
    description:
      "Book premium Kashmir tour packages. Gulmarg, Dal Lake, Pahalgam & Sonamarg. Expert-crafted Kashmir holidays.",
    images: ["/og-image.jpg"],
  },
  // NO `alternates.canonical` here on purpose. Next inherits metadata fields
  // into child segments, so a canonical set at the root becomes the canonical
  // of every page that does not override it — which told Google that /about,
  // /author/sartaj and /review were all duplicates of the homepage. Each page
  // declares its own self-referencing canonical instead.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.className} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col antialiased bg-white text-[#0F172A]">
        {children}
      </body>
    </html>
  );
}
