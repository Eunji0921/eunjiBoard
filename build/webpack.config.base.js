'use strict'

const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, `../${config.resultPath}`),
    publicPath:  process.env.NODE_ENV === 'production'
    ? config.build.publicPath
    : config.dev.publicPath,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'Styles': path.resolve(__dirname, '../src/assets/styles'),
      'Script': path.resolve(__dirname, '../src/assets/script'),
      'Images': path.resolve(__dirname, '../src/assets/images'),
      'Component': path.resolve(__dirname, '../src/components'),
      'Config': path.resolve(__dirname, '../src/config')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  performance: {
    hints: false
  }
};
