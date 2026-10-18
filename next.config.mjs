/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cần cho Docker multi-stage build (image nhỏ, chạy bằng server.js)
  output: "standalone",
};

export default nextConfig;
