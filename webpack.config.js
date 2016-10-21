const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const buildPath = path.join(__dirname, '/dist/');

module.exports = {
    entry: './main.js',
    output: {
        path: buildPath,
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        })
    ],
    module: {
        loaders: [
            {
                test: /\js?$/,
                exclude: [nodeModulesPath],
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'react-hmre']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file"
            }
        ]
    }
}