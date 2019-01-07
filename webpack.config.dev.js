var appname = 'eunjiboard';
var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode : 'development',
  entry : {
    app: './src/index.js',
    vendors: ['vue', 'vuex', 'vue-router', 'axios', 'jquery']
  },
  output : {
    path : path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module : {
    rules : [
              {
                test: /\.vue$/,
                loader: 'vue-loader'
              },
              {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader?cacheDirectory=true'
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
            ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devtool: '#eval-source-map',
  devServer : {
    port : 8000,
    disableHostCheck: true,
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    inline: false
  },
  performance: {
    hints: false
  },
}