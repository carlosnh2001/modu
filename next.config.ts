import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Highest quality WebP conversion — prevents blurry product shots
    qualities: [75, 90, 95, 100],
    // Support retina / 2x displays for all breakpoints
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 1080],
    // No remote patterns needed — all images are local
    remotePatterns: [],
  },
};

export default nextConfig;
