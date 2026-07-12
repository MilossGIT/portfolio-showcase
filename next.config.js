/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/favicon.ico',
        destination: '/icon.svg',
        permanent: false,
      },
    ]
  },
};

module.exports = nextConfig;
