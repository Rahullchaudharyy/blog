import type { NextConfig } from "next";

  const nextConfig: NextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cms.grey-to-green.com",
        },
      ],
    },
  };

export default nextConfig;
