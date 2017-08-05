var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

//add start
var glob = require('glob');
var path = require('path');
//add end

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: 'index.html',
        //     inject: true
        // }),
        new FriendlyErrorsPlugin()
    ]
});
//add start
function getEntry(globPath) {
    var entries = {}, basename, tmp, pathname;
    if(typeof(globPath) != 'object') {
        globPath = [globPath];
    }
    globPath.forEach(function(itemPath) {
        glob.sync(itemPath).forEach(function(entry) {
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
    console.log('html:')
    console.log(entries)
    return entries;
}
var pages = getEntry(['./src/**/**/*.html']);
for(var pathname in pages) {
    var conf = {
        filename: pathname + '.html',   
        template: pages[pathname],//模板路径
        inject: true,
        chunksSortMode: 'dependency'
    };
    if(pathname in module.exports.entry) {
        conf.chunks = ['manifest', 'vendor', pathname];
        conf.hash = true;
    }
    module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}
//add end
