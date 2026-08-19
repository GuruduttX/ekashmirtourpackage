import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.15", "192.168.1.5", "192.168.1.6"],
  // The WhatsApp CTAs are mostly client components, and .env's WHATSAPP_NUMBER
  // is unprefixed so it would stay server-only. Mapping it here inlines it into
  // the client bundle without renaming the key operators already set. The
  // number is public — it is the href of a visible button. See src/lib/whatsapp.ts.
  env: {
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER,
  },
  // isomorphic-dompurify pulls in jsdom, which must stay a real Node require
  // rather than being bundled into the server build.
  serverExternalPackages: ["isomorphic-dompurify"],
  async redirects() {
    return [
      {
        source: "/package",
        destination: "/kashmir-tour-packages",
        permanent: true,
      },
      {
        source: "/package/:slug",
        destination: "/kashmir-tour-packages/:slug",
        permanent: true,
      },
      {
        // The hub, not a single route page: /cab-service/srinagar-to-gulmarg
        // does not exist, so this redirect used to land on a 404.
        source: "/services",
        destination: "/cab-service",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
