/** @type {import('next').NextConfig} */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const withBundleAnalyzer = require('@next/bundle-analyzer')(
  {
    enabled: process.env.ANALYZE === 'true',
  }
);

// Comment out PWA configuration for now
// const withPWA = require('next-pwa')({
//   dest: 'public',
//   disable: process.env.NODE_ENV === 'development',
//   register: true,
//   skipWaiting: true,
//   buildExcludes: [/middleware-manifest\.json$/],
//   runtimeCaching: [],
// });

const nextConfig = {
  devIndicators: {
    position: 'bottom-right',
  },
  // Bundle size optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nexify-try.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nexify-uat.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nexify-prod.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 60,
  },
  // Enable webpack optimization
  webpack: config => {
    // Only load necessary locales from dayjs
    config.resolve.alias = {
      ...config.resolve.alias,
      'dayjs/locale': 'dayjs/locale/en',
    };

    // Use ESBuild minify for better performance
    if (process.env.NODE_ENV === 'production') {
      const TerserPlugin = require('terser-webpack-plugin');
      const CompressionPlugin = require('compression-webpack-plugin');

      // Add compression for assets
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
        })
      );

      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              passes: 2,
            },
            mangle: true,
            output: {
              comments: false,
            },
          },
        }),
      ];

      // Add chunk optimization specifically targeting landing pages
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: false,
          defaultVendors: false,
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            priority: 40,
            enforce: true,
          },
          mantine: {
            name: 'mantine',
            test: /[\\/]node_modules[\\/]@mantine[\\/]/,
            priority: 35,
            reuseExistingChunk: true,
          },
          landing: {
            name: 'landing-pages',
            test: /[\\/]Components[\\/]Landing[\\/](Course|tg|lc|DP)[\\/]/,
            priority: 50,
            reuseExistingChunk: true,
            enforce: true,
          },
          commons: {
            name: 'commons',
            test: /[\\/]node_modules[\\/]/,
            priority: 30,
          },
          lib: {
            test(module) {
              return (
                module.size() > 80000 &&
                /node_modules[/\\]/.test(
                  module.identifier()
                )
              );
            },
            name(module) {
              const rawRequest = module.rawRequest || '';
              const match = rawRequest.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              );
              if (match) {
                return `npm.${match[1].replace('@', '')}`;
              }
              return null;
            },
            priority: 20,
            minChunks: 1,
            reuseExistingChunk: true,
          },
        },
      };
    }

    return config;
  },
};

// Just use the bundle analyzer without PWA for now
export default process.env.ANALYZE === 'true'
  ? withBundleAnalyzer(nextConfig)
  : nextConfig;
