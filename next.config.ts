import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a phone on the same Wi-Fi load the dev server (use your PC's LAN IP).
  allowedDevOrigins: ["192.168.1.77"],
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
