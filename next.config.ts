import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img*.suumo.com', // ワイルドカードを使用
      },
    ],
  },
}

export default nextConfig
