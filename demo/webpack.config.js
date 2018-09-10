const webpack = require('webpack'),
CleanWebpackPlugin = require('clean-webpack-plugin'),
HtmlWebpackPlugin = require('html-webpack-plugin'),
MiniCssExtractPlugin = require('mini-css-extract-plugin');
path = require('path');

module.exports = {
    mode: 'production',
    
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
        extensions: ['.ts', '.js']
    },
    
    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        open: true,
        port: 8080,
        inline: true,
        openPage: ''
    },
    
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: ['ts-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|md)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: root('src', 'app'),
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.css$/,
                include: root('src', 'app'),
                loader: 'raw-loader'
            }
        ]
    },
    
    plugins: [
        new CleanWebpackPlugin('build'),
        new webpack.ContextReplacementPlugin(
            /\@angular(\\|\/)core(\\|\/)f?esm5/,
            root('src')
        ),
        new HtmlWebpackPlugin({
            template: root('src', 'index.html'),
            favicon: root('src', 'favicon.ico')
        }),
        
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    
    optimization: {
        splitChunks: {
            cacheGroups: {
                //app: { name: 'app'},
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    name: 'vendor',
                    enforce: true
                },
                //polyfills: { name: 'polyfills'},
            }
        }
    },
    
    devtool: 'source-map'
};



function root(...args) {
    return path.join(__dirname, ...args)
}