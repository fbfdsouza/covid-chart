const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { merge } = require('webpack-merge')
const dev = require('./webpack.dev')

module.exports = merge(dev, {
    plugins: [
        new UglifyJsPlugin({ test: /\.js(\?.*)?$/i }),
    ],
    module: {
        rules: [],
    },
});