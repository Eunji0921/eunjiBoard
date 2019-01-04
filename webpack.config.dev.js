var appname = 'eunjiboard';
var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode : 'development',
  entry : {
    app: './src/main.js',
    vendors: ['jquery']
  },
  output : {
    path : path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module : {
    rules : [
              {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
              },
              {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
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
            ]
  },
  devtool: 'source-map',
  devServer : {
    colors : true,
    historyApiFailback : true,
    inline : true,
    hot : true,
    disableHostCheck: true,
    noInfo: true,
    overlay: true,
  },
  performance: {
    hints: false
  },
}