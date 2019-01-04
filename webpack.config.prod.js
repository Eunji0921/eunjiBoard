var appname = 'eunjiboard';
var path = require('path');
var webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode : 'production',
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