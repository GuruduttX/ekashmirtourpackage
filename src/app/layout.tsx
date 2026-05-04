import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "eKashmir Tour Packages | Experience the Cold Beauty of Kashmir",
  description:
    "Premium Kashmir tour packages — Gulmarg snow retreats, Dal Lake houseboats, Pahalgam valley treks. Luxury travel crafted for the discerning traveler.",
  keywords:
    "Kashmir tour packages, Gulmarg, Dal Lake, Pahalgam, Sonamarg, snow Kashmir, luxury Kashmir travel",
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
