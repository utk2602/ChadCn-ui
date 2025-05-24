/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
   // ppr: true,
    staleTimes : { 
      dynamic:30, 
      static: 60,
    },
    serverActions: true,
  },
}

export default nextConfig
