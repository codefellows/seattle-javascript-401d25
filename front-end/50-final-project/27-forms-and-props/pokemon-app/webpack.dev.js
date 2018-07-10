'use strict';

const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const { HotModuleReplacementPlugin } = require('webpack');

const webpackDevConfig = {};

webpackDevConfig.mode = 'development';
webpackDevConfig.devtool = 'inline-source-map';

webpackDevConfig.devServer = {
  contentBase: './build', // tells server where to serve content from
  open: true, // opens new tab in browser
  hot: true, // enables hot module reloading in conjunction with HMR plugin
  historyApiFallback: true, // enables use to go to different front end routes without 404 error
};

webpackDevConfig.plugins = [
  new HotModuleReplacementPlugin(),
];

webpackDevConfig.module = {};

webpackDevConfig.module.rules = [
  {
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader',
    ],
  },
];

module.exports = merge(commonConfig, webpackDevConfig);

