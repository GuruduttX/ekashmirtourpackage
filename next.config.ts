import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.15", "192.168.1.5", "192.168.1.6"],
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
        source: "/services",
        destination: "/cab-service/srinagar-to-gulmarg",
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
