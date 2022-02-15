const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /\.m?js$/,
            resolve: {
              fullySpecified: false,
            },
          },
        ],
      },
      resolve: {
        fallback: {
          // process: require.resolve("process/browser"),
          // zlib: require.resolve("browserify-zlib"),
          // stream: require.resolve("stream-browserify"),
          // util: require.resolve("util"),
          // buffer: require.resolve("buffer"),
          // asset: require.resolve("assert"),
          url: require.resolve("url"),
          fs: require.resolve("fs"),
          assert: require.resolve("assert"),
          crypto: require.resolve("crypto-browserify"),
          http: require.resolve("stream-http"),
          https: require.resolve("https-browserify"),
          os: require.resolve("os-browserify/browser"),
          buffer: require.resolve("buffer"),
          stream: require.resolve("stream-browserify"),
          // zlib: require.resolve("zlib"),
          // tls: require.resolve("tls"),
          // net: require.resolve("net"),
          // dns: require.resolve("dns"),
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
          process: "process/browser",
        }),
      ],
    },
  },
};
