import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/cloudinaryLoader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

export default withPayload(nextConfig);
