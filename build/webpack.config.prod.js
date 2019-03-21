'use strict'

const path = require('path');

const webpack = require('webpack');
const env = require('../config/prod.env');
const config = require('../config');
const utils = require('./utils');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  output: {
    publicPath: config.build.publicPath,
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: false,
      extract: false,
      usePostCSS: false
    })
  },
  output: {
    filename: `js/[name].[chunkhash].js`,
    chunkFilename: `js/chunk.[name].[chunkhash].js`
  },
  plugins: [
            new webpack.DefinePlugin({
              'process.env': env
            }),
            new webpack.HashedModuleIdsPlugin(),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
              filename: 'index.html',
              template: 'index.html',
              inject: true,
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
              },
              chunksSortMode: 'dependency'
            }),
  ],
  devtool: config.build.devtool
}
