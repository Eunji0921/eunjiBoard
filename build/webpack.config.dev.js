'use strict'
const path = require('path');

const webpack = require('webpack');
const config = require('../config');
const env = require('../config/dev.env');
const utils = require('./utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    publicPath: config.dev.publicPath,
  },
  module: {
    rules: utils.styleLoaders({sourceMap: false, usePostCSS: false})
  },
  devServer: {
    contentBase: false,
    hot: true,
    host: config.dev.host,
    port: config.dev.port,
    clientLogLevel: 'warning',
    compress: true,
    open: config.dev.openBrowser,
    overlay: { warnings: false, errors: true },
    historyApiFallback: true,
    disableHostCheck: true,
    noInfo: true,
    proxy: {
      '/api': {
        target: config.dev.target_host,
        changeOrigin: true
      },
      '/ProxyAPI': {
        target: config.dev.target_host,
        changeOrigin: true
      }
    }
  },
  plugins: [
            new webpack.DefinePlugin({
              'process.env': env
            }),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
              filename: 'index.html',
              template: 'index.html',
              inject: true
            })
  ],
  devtool: config.dev.devtool
}
