var webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function (config) {
    config.set({
        basePath: '',

        frameworks: ['jasmine','source-map-support'],

        files: [
            { pattern: './test/index.ts', watched: false }
        ],

        preprocessors: {
            './test/index.ts': ['webpack']
        },

        webpack: {
            devtool: 'inline-source-map',

            resolve: {
                extensions: ['', '.ts', '.js'],
                modulesDirectories: ['node_modules', 'src']
            },

            module: {
                loaders: [
                    {
                        test: /\.ts$/,
                        loader: 'ts-loader'
                    }
                ],
                postLoaders: [
                    {
                        test: /\.ts$/,
                        loader: 'istanbul-instrumenter-loader',
                        exclude: [
                            /node_modules/,
                            /test/
                        ]
                    }
                ]
            },

            plugins:[
                new CleanWebpackPlugin('./coverage')
            ]
        },

        webpackMiddleware: {
            stats: 'errors-only'
        },

        webpackServer: {
            noInfo: true
        },

        coverageReporter: {
            type: 'in-memory'
        },

        remapCoverageReporter: {
            'text-summary': null,
            html: './coverage/html',
            json: './coverage/coverage-final.json',
            lcovonly: './coverage/lcov.info'
        },

        reporters: ['progress', 'coverage','remap-coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true
    });
};
