/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "upload.wikimedia.org",
      "commons.wikimedia.org",
      "cdn.sanity.io",
      "lh3.googleusercontent.com",
    ],
  },
};
