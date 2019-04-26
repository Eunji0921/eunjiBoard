'use strict'

const path = require('path');
const merge = require('webpack-merge');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

var baseConfig = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: ['@babel/polyfill', './src/main.js'],
    },
    output: {
        path: path.resolve(__dirname, `../${config.resultPath}`),
        publicPath: '',
        filename: '[name].js'
    },
    module: {
        rules: [{
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
              test: /\.(png|jpg|gif|svg)$/,
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: '[name].[ext]?[hash:7]'
              }
            },
            {
                test: /\.(ttf|eot|woff|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    optimization: {
        minimize: true,
        namedModules: true,
        noEmitOnErrors: true,
        concatenateModules: true,
        mangleWasmImports: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        runtimeChunk: {
            name: "manifest",
        },
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vue: {
                    test: module => (/node_modules\/vue/.test(module.context) || /vue/.test(module.context)),
                    name: 'vue'
                },
                d3: {
                    test: module => (/node_modules\/d3/.test(module.context) || /d3/.test(module.context)),
                    name: 'd3'
                },
                vendor: {
                    test: module => (/node_modules\/(!vue)|(!d3)/.test(module.context) || /(!vue)|(!d3)/.test(module.context)),
                    name: 'vender'
                },
            },
        }
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'Fonts': path.resolve(__dirname, '../src/assets/fonts'),
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
}

module.exports = (env, argv) => {
    var target = {};
    baseConfig.mode = argv.mode;
    /* 개발 모드 */
    if (argv.mode === 'development') {
        target = require('./webpack.config.dev');
        /* 배포 모드 */
    } else if (argv.mode === 'production') {
        target = require('./webpack.config.prod');
        /* 빌드 파일 분석 툴 활성화 여부 */
        if (config.build.bundleAnalyzerReport) {
            const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
            baseConfig.plugins.push(new BundleAnalyzerPlugin())
        }
    }
    return merge(baseConfig, target);
};