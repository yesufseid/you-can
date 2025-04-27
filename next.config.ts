import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['ozcuwnfchwhgnwdincfu.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vibkbnqsknyzaflcbxwd.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
