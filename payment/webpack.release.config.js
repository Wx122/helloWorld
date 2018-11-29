const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json'), 'utf-8'));
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../configs/config.service.json'), 'utf-8'));
const publicPath = `http://${config.res_source.host}:${config.res_source.port}/dist/${config.env}/${packageJson.name}/${packageJson.version}/`;

module.exports = {
    entry: {
        home: path.resolve(__dirname, 'public', 'javascripts', 'home', 'index.js'),
        product: path.resolve(__dirname, 'public', 'javascripts', 'product', 'index.js'),
        order: path.resolve(__dirname, 'public', 'javascripts', 'order', 'index.js'),
        other: path.resolve(__dirname, 'public', 'javascripts', 'other', 'index.js')
    },
    output: {
        path: path.join(__dirname, 'public', 'dist'),
        publicPath,
        filename: '[name].js'
    },
    externals: {
        jquery: 'jQuery',
        kendo: 'kendo',
        echarts: 'echarts'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192&name=images/[name].[ext]' },
            // required for bootstrap icons
            { test: /\.svg$/, loader: 'file-loader?prefix=font/' },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: [require.resolve('babel-preset-es2015')]
                }
            }
        ]
    },
    resolveLoader: {
        root: path.resolve(__dirname, 'node_modules')
    },
    resolve: {
        extensions: ['', '.js']
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            _development_: false,
            enum: 'enum'
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: false,
            compress: {
                warnings: false
            }
        })
    ]
};
