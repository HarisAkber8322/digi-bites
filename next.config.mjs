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
