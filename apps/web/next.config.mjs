/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  basePath: "/demo/contentthailand",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        protocol: "https",
        hostname: "contentthailand.com",
      },
      {
        protocol: "https",
        hostname: "www.contentthailand.com",
      },
    ],
  },
};

export default nextConfig;
