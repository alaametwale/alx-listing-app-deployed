/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-api-endpoint.com'], // السماح بتحميل الصور من API
  },
};

module.exports = nextConfig;
