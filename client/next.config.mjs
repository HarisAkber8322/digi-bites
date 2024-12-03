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
  register: true, 
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/.*\.(jpg|jpeg|png|gif|svg)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "images-cache",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60, 
        },
      },
    },
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
  images: {
    domains: ["plus.unsplash.com"],
  },
};

export default withPWA(nextConfig);
