var appname = 'eunjiboard';
var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const HOST = 'localhost'
const PORT = 8080

module.exports = {
  mode: 'development',
  module : {
    rules : [
              {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                  loaders: {
                    esModule: true,
                    extractCSS: true
                  }
                }
              },
              {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
              },
              {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
              },
              {
                test: /\.(png|svg|jpe?g|gif)$/,
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]?[hash]'
                }
              },
              {
                test: /\.(png|svg|jpe?g|gif)$/,
                loader:'url-loader',
                options: {
                    limit: 10000
                  }
              }
            ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new VueLoaderPlugin()
  ],
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: 'dist',
    compress: true,
    host: HOST,
    port: PORT,
    open: true,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    quiet: true,
    watchOptions: {
      poll: true
    }
  },
}