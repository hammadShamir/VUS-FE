/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "storage.googleapis.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scontent-iad3-*.cdninstagram.com",
      },
    ],
  },
};

export default nextConfig;
