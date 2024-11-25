import type { NextConfig } from 'next';

const BUILD_MODE = process.env.BUILD_MODE;


console.log('BUILD_MODE:', BUILD_MODE);

const nextConfig: NextConfig = {
  /* config options here */
  output: BUILD_MODE === 'export' ? 'export' : 'standalone',
};

export default nextConfig;
