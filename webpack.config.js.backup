const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const CriticalCssPlugin = require('critical-css-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const glob = require('glob');
const TerserPlugin = require('terser-webpack-plugin');
const { processImage } = require('./src/utils/imageHelper');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isAnalyze = env.analyze;

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', ['@babel/preset-react', { pragma: 'h', pragmaFrag: 'Fragment' }]],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isProduction
                    ? '[hash:base64]'
                    : '[name]__[local]--[hash:base64:5]',
                },
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|webp)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[name].[ext]',
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65,
                },
                optipng: {
                  enabled: true,
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4,
                },
                gifsicle: {
                  interlaced: false,
                },
                webp: {
                  quality: 75,
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
      isProduction && new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].chunk.css',
      }),
      isProduction && new PurgecssPlugin({
        paths: glob.sync(path.join(__dirname, 'src/**/*.{html,js,jsx}'), { nodir: true }),
      }),
      new FaviconsWebpackPlugin({
        logo: './src/assets/logo.png',
        mode: 'webapp',
        devMode: 'webapp',
        favicons: {
          appName: 'Webpack Preact Jest Starter',
          appDescription: 'A starter template for Preact apps',
          developerName: 'Your Name',
          developerURL: null,
          background: '#ffffff',
          theme_color: '#ffffff',
          icons: {
            coast: false,
            yandex: false,
          },
        },
      }),
      new WebpackPwaManifest({
        name: 'Webpack Preact Jest Starter',
        short_name: 'Preact Starter',
        description: 'A starter template for Preact apps',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        inject: true,
        ios: true,
        icons: [
          {
            src: path.resolve('src/assets/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
          {
            src: path.resolve('src/assets/logo.png'),
            size: '1024x1024',
          },
          {
            src: path.resolve('src/assets/logo.png'),
            size: '1024x1024',
            purpose: 'maskable',
          },
        ],
      }),
      new WorkboxWebpackPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
      }),
      isProduction && new BundleAnalyzerPlugin({
        analyzerMode: isAnalyze ? 'server' : 'static',
        reportFilename: 'bundle-report.html',
        openAnalyzer: isAnalyze,
      }),
    ].filter(Boolean),
    optimization: {
      minimizer: [
        `...`,
        new CssMinimizerPlugin(),
        new TerserPlugin(),
      ],
    },
    devServer: {
      static: path.join(__dirname, 'public'),
      compress: true,
      port: 3000,
      hot: true,
      allowedHosts: 'all',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
      },
    },
    resolve: {
      alias: {
        'react': 'preact/compat',
        'react-dom': 'preact/compat',
      },
    },
    devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
  };
};
