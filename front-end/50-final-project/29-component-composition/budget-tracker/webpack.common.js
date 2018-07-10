'use strict';

require('dotenv').config();

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');

const webpackConfig = module.exports = {};

webpackConfig.entry = `${__dirname}/src/main.js`;

webpackConfig.output = {
  filename: '[name].[hash].js',
  path: `${__dirname}/build`,
  publicPath: process.env.CDN_URL,
};

webpackConfig.plugins = [
  new HtmlWebpackPlugin({
    title: '401d23 Budget Tracker',
  }),
  new MiniCssPlugin({
    filename: '[name].[hash].css',
  }),
];

webpackConfig.module = {};
webpackConfig.module.rules = [
  {
    test: /\.(png|svg|jpg|gif)$/,
    use: [
      'file-loader',
    ],
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['env', 'stage-0', 'react'],
        plugins: ['transform-react-jsx-source'],
        cacheDirectory: true,
      },
    },
  },
  {
    test: /\.scss$/,
    use: [
      MiniCssPlugin.loader,
      'css-loader',
      'sass-loader',
    ],
  },
];
