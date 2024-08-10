const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const CriticalCssPlugin = require('critical-css-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { processImage } = require('./src/utils/imageHelper');
const glob = require('glob');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
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
              presets: ['@babel/preset-env', ['@babel/preset-react', { pragma: 'h' }]],
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
              loader: 'img-loader',
              options: {
                plugins: [
                  async function(content, filepath) {
                    const outputPath = path.join(__dirname, 'dist', 'images');
                    const sizes = [300, 600, 1200, 2000];
                    const results = await processImage(filepath, outputPath, sizes);
                    
                    return {
                      src: results[0].src,
                      srcSet: results.map(r => `${r.src} ${r.width}w`).join(', '),
                      placeholder: results[0].placeholder
                    };
                  }
                ]
              }
            }
          ]
        }
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
        paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true }),
      }),
      isProduction && new CriticalCssPlugin({
        base: path.resolve(__dirname, 'dist'),
        src: 'index.html',
        target: 'index.html',
        inline: true,
        extract: true,
        width: 375,
        height: 565,
        penthouse: {
          blockJSRequests: false,
        },
      }),
    ].filter(Boolean),
    optimization: {
      minimizer: [
        `...`,
        new CssMinimizerPlugin(),
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      hot: true,
      historyApiFallback: true,
      port: 3000,
    },
    resolve: {
      alias: {
        'react': 'preact/compat',
        'react-dom': 'preact/compat',
      },
    },
  };
};
