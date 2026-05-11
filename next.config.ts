import type { NextConfig } from "next";

// ─── Security Headers ─────────────────────────────────────────────────────────
// Applied to every response. Hardened per OWASP recommendations.
const securityHeaders = [
  // Prevent clickjacking — only allow framing from same origin
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Prevent MIME-type sniffing attacks
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Limit referrer info leaked to third parties
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable unused browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  // Enable DNS prefetch for performance without sacrificing control
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // XSS protection for legacy browsers
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Force HTTPS for 2 years (preload-ready); Vercel handles TLS termination
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Content Security Policy — restrictive defaults for a static Next.js app
  // 'unsafe-inline' for styles is required by Tailwind CSS class injection;
  // 'unsafe-eval' is NOT included (Next.js 16 dev mode no longer needs it in prod)
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: self + Next.js inline chunks (hashes preferred, nonces need server render)
      "script-src 'self' 'unsafe-inline'",
      // Styles: self + inline styles used by Tailwind
      "style-src 'self' 'unsafe-inline'",
      // Images: self + data URIs (Next.js Image optimization uses them)
      "img-src 'self' data: blob:",
      // Fonts: self only (no Google Fonts — fonts are local)
      "font-src 'self'",
      // Connects: self (no external APIs called from frontend)
      "connect-src 'self'",
      // Frames: allow same-origin (for the showrooms interactive map iframe)
      "frame-src 'self'",
      // Media, objects, manifests
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      // Block all mixed content
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Oculta el header "X-Powered-By: Next.js" para evitar fingerprinting
  poweredByHeader: false,

  // ─── Security Headers ──────────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // ─── Image Optimization ────────────────────────────────────────────────────
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
