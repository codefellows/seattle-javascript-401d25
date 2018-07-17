'use strict';

require('dotenv').config();

// The DefinePlugin allows you to create global constants which can be configured at compile time. 
// https://webpack.js.org/plugins/define-plugin/
const { DefinePlugin } = require('webpack');

// helps to generate a new index.html file in memory
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = module.exports = {};

// we define the main entry point of our app
webpackConfig.entry = `${__dirname}/src/main.js`;

// these are the hashed file names that get generated in memory
webpackConfig.output = {
  filename: '[name].[hash].js',
  path: `${__dirname}/build`,
  publicPath: process.env.CDN_URL, // not really being used yet, but this allows you to specify the base path for all the assets within your application. https://webpack.js.org/guides/public-path/
};

// we instantiate an array of all our plugins
webpackConfig.plugins = [
  // creates our index.html with a "title" that shows in our browser tab
  new HtmlWebpackPlugin({
    title: 'Day 27 Pokemon React App',
  }),
  // this enables us to have "API_URL" available as a global variable in our app
  new DefinePlugin({
    API_URL: JSON.stringify(process.env.API_URL),
  }),
];

// we need to define a "module" property on our webpack configuration
webpackConfig.module = {};

// this rules array applies "loaders": Loaders are transformations that are applied on the source code of a module. https://webpack.js.org/concepts/loaders/
webpackConfig.module.rules = [
  {
    test: /\.(png|svg|jpg|gif)$/i,
    use: ['file-loader'],
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['env', 'stage-0', 'react'],
        plugins: ['transform-react-jsx-source'],
        cacheDirectory: true, // caches files that were already transpiled and doesn't re-transpile them unnecessarily
      },
    },
  },
];
