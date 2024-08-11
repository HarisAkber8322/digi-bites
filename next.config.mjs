/** @type {import("next").NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "production",
  workboxOptions: {
    disableDevLogs: true,
  },
  register: true, // Register the service worker
  skipWaiting: true, // Skip waiting for the old service worker to be replaced
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/.*\.(jpg|jpeg|png|gif|svg)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "images-cache",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        },
      },
    },
    // You can add more caching rules here
  ],
});

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.snapshot = {
      managedPaths: [/node_modules\/@next\/swc-/, /node_modules\/fsevents/],
    };
    return config;
  },
};

export default withPWA(nextConfig);
