/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    url:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://ljtech-crud-auth0.vercel.app",
  },
};

module.exports = nextConfig;
