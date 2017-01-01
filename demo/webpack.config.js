var webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    path = require('path');

module.exports = {
    entry: {
        'polyfills': root('src', 'polyfills.ts'),
        'vendor': root('src', 'vendor.ts'),
        'app': root('src', 'main.ts')
    },

    output: {
        path: root('build'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        extensions: ['', '.ts', '.js']
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        open: true,
        port: 8080,
        inline: true
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|md)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: root('src', 'app'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.css$/,
                include: root('src', 'app'),
                loader: 'raw'
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin('build'),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: root('src', 'index.html'),
            favicon: root('src', 'favicon.ico')
        }),

        new ExtractTextPlugin('[name].css')
    ],

    devtool: 'source-map'
};



function root(...args) {
    return path.join.apply(path, [__dirname].concat(args))
}