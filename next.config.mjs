/** @type {import('next').NextConfig} */
import nextPWA from 'next-pwa';
import CompressionPlugin from 'compression-webpack-plugin';

// Configure next-pwa
const withPWA = nextPWA({
  dest: 'public',
  disable: process.env.NEXT_PUBLIC_ENV === 'DEV', // Disable in dev
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest\.json$/],
  runtimeCaching: [],
});

const nextConfig = {
  // Dev indicators
  devIndicators: {
    position: 'bottom-right',
  },

  // Bundle size optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Strips console logs in prod
  },

  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nexify-try.s3.ap-south-1.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nexify-uat.s3.ap-south-1.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nexify-prod.s3.ap-south-1.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 60,
  },

  // Webpack optimizations
  webpack: config => {
    // Day.js locale optimization
    config.resolve.alias = {
      ...config.resolve.alias,
      'dayjs/locale': 'dayjs/locale/en',
    };

    if (process.env.NODE_ENV === 'production') {
      // Gzip compression
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240, // Compress files > 10KB
          minRatio: 0.8,
        })
      );

      // Comment out splitChunks to test if it’s the issue
      /*
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            reuseExistingChunk: true,
          },
          mantine: {
            test: /[\\/]node_modules[\\/]@mantine[\\/]/,
            name: 'mantine',
            priority: -5,
            reuseExistingChunk: true,
          },
        },
      };
      */
    }

    // Fix runtime errors (e.g., "self is not defined")
    config.output.globalObject = 'globalThis';

    return config;
  },
};

export default withPWA(nextConfig);
