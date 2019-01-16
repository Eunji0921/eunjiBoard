'use strict'

const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const env = require('../config/prod.env');
const config = require('../config');
const utils = require('./utils');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpackConfig = merge(baseConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: true,
      extract: false,
      usePostCSS: true
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
            new webpack.optimize.UglifyJsPlugin({
              sourceMap: true,
              compress: {
                warnings: false
              }
            }),
            new webpack.HashedModuleIdsPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
              name: 'vendor',
              minChunks (module) {
                return (
                  module.resource &&
                  /\.js$/.test(module.resource) &&
                  module.resource.indexOf(
                    path.join(__dirname, '../node_modules')
                  ) === 0
                )
              }
            }),
            new webpack.optimize.CommonsChunkPlugin({
              name: 'vue',
              minChunks: function(module){
                  return (module.context && (/node_modules\/vue/.test(module.context) || /vue/.test(module.context)));
              }
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
              name: 'manifest',
              minChunks: Infinity
            }),
            new webpack.optimize.CommonsChunkPlugin({
              name: 'app',
              async: 'vendor-async',
              children: true,
              minChunks: 3
            }),
            new CleanWebpackPlugin([`${config.resultPath}`], { root: path.resolve(__dirname , '..'), verbose: true }),
            new ExtractTextPlugin({
              filename: 'css/[name].[contenthash].css',
              allChunks: true,
            }),
            new OptimizeCSSPlugin({
              cssProcessorOptions: { safe: true, map: { inline: false } }
            }),
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
            })
  ],
  devtool: config.build.devtool
})

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig;