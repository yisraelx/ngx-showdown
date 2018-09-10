let webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    PACKAGE = require('./package.json'),
    banner = `/**
 * Angular X Showdown Module (https://github.com/yisraelx/ngx-showdown)
 * @version ${PACKAGE.version}
 * @license MIT (https://github.com/yisraelx/ngx-showdown/blob/master/LICENSE)
 * @copyright Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 */`;

module.exports = {
    mode: 'production',

    entry: {
        'ngx-showdown.umd': './src/index.ts',
        'ngx-showdown.umd.min': './src/index.ts'
    },

    output: {
        path: __dirname + '/bundles',
        filename: '[name].js',
        libraryTarget: 'umd',
        library: ['ng', 'showdown'],
        umdNamedDefine: false
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    plugins: [
        new CleanWebpackPlugin('./bundles'),
        new webpack.BannerPlugin({banner, raw: true, entryOnly: true})
    ],


    optimization: {
        minimize: true
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    compilerOptions: {
                        declaration: false
                    }
                }

            }
        ]
    },

    externals: {
        '@angular/core': {
            root: ['ng', 'core'],
            amd: '@angular/core',
            commonjs: '@angular/core',
            commonjs2: '@angular/core'
        },
        '@angular/common/http': {
            root: ['ng', 'common', 'http'],
            amd: '@angular/common/http',
            commonjs: '@angular/common/http',
            commonjs2: '@angular/common/http'
        },
        'showdown': 'showdown'
    }

};