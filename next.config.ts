import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // External packages for server-side rendering with Tailwind CSS v4
  serverExternalPackages: ["@tailwindcss/node"],
};

export default nextConfig;
