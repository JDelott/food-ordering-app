/** @type {import('next').NextConfig} */

// Load environment variables from .env file
require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "jacob-food-ordering.s3.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
