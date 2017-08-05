var path = require('path')
var utils = require('./utils')
var config = require('../config')
//var webpack = require('webpack')
var vueLoaderConfig = require('./vue-loader.conf')

//add start
var glob = require('glob');
var entries = getEntry(['./src/**/**/*.js']);
function getEntry(globPath) {
    var entries = {}, basename, tmp, pathname;
    if(typeof(globPath) != 'object') {
        globPath = [globPath];
    }
    globPath.forEach(function(itemPath) {
        //glob.sync()同步获取文件列表
        glob.sync(itemPath).forEach(function(entry) {
            //path.basename(filepath) 获取文件名（一个参数，有扩展名的会将扩展名算入文件名）只是输出路径的最后一部分
            //path.extname(filepath）获取文件扩展名
            //*path.basename()有第二个参数就是获取文件名 但是不包括扩展名
            basename = path.basename(entry, path.extname(entry));
            if(entry.split('/').length > 4) {
                tmp = entry.split('/').splice(-3);
                pathname = tmp.splice(0, 1) + '/' + basename;
                entries[pathname] = entry;
            }else {
                entries[basename] = entry;
            }
        });
    });
    console.log(entries)
    return entries;
}
//add end

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: entries,//输出多个入口文件
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'node':resolve('node_modules/'),
            'pages': resolve('src/pages/')
        }
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
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}
