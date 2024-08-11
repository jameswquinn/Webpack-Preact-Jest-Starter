const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
                  localIdentName: isProduction
                    ? '[hash:base64]'
                    : '[name]__[local]--[hash:base64:5]',
                },
                importLoaders: 1,
              },
            },
            'postcss-loader'
          ],
        },
        {
          test: /\.(png|jpe?g|webp)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[name].[hash:8].[ext]',
              },
            },
            {
              loader: 'responsive-loader',
              options: {
                adapter: require('responsive-loader/sharp'),
                sizes: [300, 600, 1200, 2000],
                placeholder: true,
                placeholderSize: 20,
                name: 'images/[name]-[width].[ext]',
                format: 'webp',
              }
            }
          ]
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      isProduction && new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: 'public',
            to: 'assets',
            globOptions: {
              ignore: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.webp'],
            },
          },
        ],
      }),
      new WebpackPwaManifest({
        name: 'My Preact App',
        short_name: 'PreactApp',
        description: 'My awesome Preact app',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: path.resolve('src/assets/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512]
          },
        ]
      }),
      new FaviconsWebpackPlugin({
        logo: './src/assets/icon.png',
        mode: 'webapp',
        devMode: 'webapp',
      }),
      new WorkboxWebpackPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
      }),
    ].filter(Boolean),
    optimization: {
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin(),
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 3000,
      hot: true,
      allowedHosts: 'all',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      },
    },
    resolve: {
      alias: {
        'react': 'preact/compat',
        'react-dom': 'preact/compat',
      },
      extensions: ['.js', '.jsx'],
    },
  };
};
