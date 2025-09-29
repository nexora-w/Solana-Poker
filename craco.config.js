const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add fallbacks for Node.js modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
        process: require.resolve('process/browser.js'),
        util: require.resolve('util'),
        assert: require.resolve('assert'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        url: require.resolve('url'),
        vm: false, // Disable vm module
        fs: false,
        net: false,
        tls: false,
        child_process: false,
      };

      // Add aliases for better module resolution
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        'process/browser': require.resolve('process/browser.js'),
        'process/browser.js': require.resolve('process/browser.js'),
      };

      // Add extensions to resolve
      webpackConfig.resolve.extensions = [
        ...webpackConfig.resolve.extensions,
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
      ];

      // Add plugins for global variables
      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.ProvidePlugin({
          process: 'process/browser.js',
          Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.NormalModuleReplacementPlugin(
          /^process\/browser$/,
          require.resolve('process/browser.js')
        ),
      ];

      // Configure source map handling to ignore missing source maps
      if (webpackConfig.devtool) {
        webpackConfig.devtool = 'source-map';
      }
      
      // Add ignore patterns for problematic source maps
      webpackConfig.ignoreWarnings = [
        /Failed to parse source map/,
        /ENOENT: no such file or directory/,
      ];

      return webpackConfig;
    },
  },
};
