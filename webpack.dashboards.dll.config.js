const path = require('path');
// webpack已经内置了dll插件
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: {
        vendor: ['vue', 'element-plus'] // 'vue-router','vuex',,'vue-loader/lib/component-normalizer.js',
    },
    output: {
        path: path.resolve('static/dashboard/dll'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            context: __dirname,
            path: path.resolve('static/dashboard/dll', '[name]-manifest.json'),
            name: '[name]_library'
        })
    ]
};

