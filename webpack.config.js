let webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    PACKAGE = require('./package.json'),
    banner = `/**
 * Angular 2 Markdown Module (https://github.com/yisraelx/ng2-md)
 * @version ${PACKAGE.version}
 * @license MIT (https://github.com/yisraelx/ng2-md/blob/master/LICENSE)
 * @copyright Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 */`;

module.exports = {

    entry: {
        "ng2-md.umd": "./src/index.ts",
        "ng2-md.umd.min": "./src/index.ts"
    },

    output: {
        path: __dirname + "/bundles",
        filename: "[name].js",
        libraryTarget: 'umd',
        library: ['ng', 'md'],
        umdNamedDefine: false
    },

    resolve: {
        extensions: ['', '.js', '.ts']
    },

    plugins: [
        new CleanWebpackPlugin('./bundles'),
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/, minimize: true
        }),
        new webpack.BannerPlugin(banner, {raw: true, entryOnly: true})
    ],

    module: {
        loaders: [
            {test: /\.ts$/, loader: "ts-loader"}
        ]
    },

    ts: {
        compilerOptions: {
            declaration: false
        }
    },

    externals: {
        '@angular/core': {
            root: ['ng', 'core'],
            amd: '@angular/core',
            commonjs: '@angular/core',
            commonjs2: '@angular/core'
        },
        '@angular/http': {
            root: ['ng', 'http'],
            amd: '@angular/http',
            commonjs: '@angular/http',
            commonjs2: '@angular/http'
        },
        'showdown': 'showdown'
    }

};