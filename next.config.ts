import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cdn.dummyjson.com",  "api.escuelajs.com" , 'res.cloudinary.com' ],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920, 2560, 3840],
  },
};

export default nextConfig;
