'use strict';

// this is what enables hot reloading
const { HotModuleReplacementPlugin } = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');


const webpackDevConfig = {};

// our webpack config requires a "module" property that will be an object
webpackDevConfig.module = {};


// we define what "mode" we are in
webpackDevConfig.mode = 'development';

// this devtool enables us to see the specific line numbers of our original code. If we didn't have this, we would see line numbers mapping to line 1001 in our big bundle.js that gets output by Webpack
webpackDevConfig.devtool = 'inline-source-map';

// these are configuration settings for our webpack-dev-server runs
webpackDevConfig.devServer = {
  contentBase: './build', // tells server where to serve content from 
  open: true, // opens a new tab in our default browser
  hot: true, // hot reloads our changes every time we save
  historyApiFallback: true, 
  // enables us to visit "localhost:8080/somePath" without breaking, will just reload back to the default page
};

// we use this plugin to hot reload our app when running webpack-dev-server
webpackDevConfig.plugins = [
  new HotModuleReplacementPlugin(),
];

// these get prepprocessed from teh last item in the array to the first
// 1. sass-loader takes a sass/SCSS file and complies it to CSS
// 2. css-loader interprets @import and url() like import/require() and will resolve them.
// 3. style-loader takes the CSS and inserts it onto the index.html page via a <style></style> tag
webpackDevConfig.module.rules = [
  {
    test: /\.scss$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true, // maps css lines in inspector back to actual scss file
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  },
];

// we use webpack-merge to merge our common configuration with this webpackDevConfig so we can run this configuration when running webpack-dev-server
module.exports = merge(commonConfig, webpackDevConfig);
