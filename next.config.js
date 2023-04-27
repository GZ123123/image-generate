/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  swcMinify: true,
  redirects() {
    return [
      {
        source: '/',
        destination: '/builder',
        permanent: true
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: process.env.IMAGE_PROTOCOL,
        hostname: process.env.IMAGE_HOSTNAME,
        port: process.env.IMAGE_PORT,
        pathname: process.env.IMAGE_PATHNAME
      }
    ] 
  }
}

module.exports = withBundleAnalyzer(nextConfig)
