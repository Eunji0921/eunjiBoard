var appname = 'eunjiboard';
var path = require('path');
var webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode : 'production',
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
  plugins: [
    new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html'
    }),
    new CleanWebpackPlugin(['dist'])
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
  optimization: {
    minimize: true,
    splitChunks: {},
    concatenateModules: true,
  }
}