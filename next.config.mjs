/** @type {import("next").NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig = {
  reactStrictMode: true,
  styledComponents: {
    ssr: true, // Enable server-side rendering
    displayName: process.env.NODE_ENV !== "development", // Display component names in development
    preprocess: false, // Disable styled-components' built-in CSS minification
    // Add any other options you want here
  },
};

export default withPWA(nextConfig);
