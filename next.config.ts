/** @type {import('next').NextConfig} */
const nextConfig = {
    
};
// next.config.js
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**', // Allows images from any domain
        },
      ],
    },
  };
  

export default nextConfig;
