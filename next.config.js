/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const nextConfig = {
  // reactStrictMode: true,
  // styledComponents: {
  //   ssr: true, // Enable server-side rendering
  //   displayName: process.env.NODE_ENV !== "development", // Display component names in development
  //   preprocess: false, // Disable styled-components' built-in CSS minification
  //   // Add any other options you want here
  // },
  // Add PWA configuration here
  pwa: {
    dest: "public", // Destination for generated service worker
    register: true,  // Enable service worker registration
    skipWaiting: true, // Skip waiting for previous service worker version
    // Optional configurations:
    // disable: process.env.NODE_ENV === 'development', // Disable PWA in development
    // fetch: undefined,
    // runtimeCaching: [],
    // swSrc: undefined,
  },
};

module.exports = withPWA(nextConfig);
