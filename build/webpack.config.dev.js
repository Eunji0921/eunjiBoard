'use strict'

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const config = require('../config');
const env = require('../config/dev.env');
const utils = require('./utils');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const devWebpackConfig = merge(baseConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: true, usePostCSS: true})
  },
  devServer: {
    contentBase: false,
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
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new HtmlWebpackPlugin({
              filename: 'index.html',
              template: 'index.html',
              inject: true
            }),
  ],
  devtool: config.dev.devtool
})


module.exports = devWebpackConfig;