import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'businessmaser.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'www.dostor.org',
        port: '',
        pathname: '/UploadCache/**',
      },
      {
        protocol: 'https',
        hostname: 'www.shorouknews.com',
        port: '',
        pathname: '/uploadedimages/**',
      },
    ],
  },
}

export default nextConfig
