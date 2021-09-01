const path = require("path");
const os = require('os');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require("vue-loader"); // vue3
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        main: path.join(__dirname, 'dashboards/main.js')
    },
    output: {
        path: path.join(__dirname, 'static/dashboard'),
        filename: 'script/[name].js?[hash]',
        publicPath: "/dashboard/"
    },
    resolve: {
        extensions: ['.vue', '.js', '.json', '.ts'],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new OptimizeCssAssetsPlugin(),
        ]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_module/,
                use: [
                    {
                        // loader: 'vue-loader',
                        // options: vueLoaderConfig
                    }
                ]
            },
            {
                test:/\.scss?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [
                                    ['autoprefixer'],
                                ]
                            }
                        }
                    },
                    // "resolve-url-loader",
                    "sass-loader"
                ]
            },
            {
                test:/\.ts?$/,
                exclude: /node_module/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/], // 解析vue lang=ts
                    configFile: path.join("dashboards/tsconfig.json")
                }
            },
            // {
            //     test: /\.(ico|svg|png|jpg)/,
            //     loader: "file-loader",
            //     options: {
            //         name: 'img/[name].[ext]?[hash]'
            //     }
            // },
        ]
    },
    mode: "development",
    devtool: "source-map",
    plugins: [
        new MiniCssExtractPlugin({
            filename:"style/[name].css?[hash]",
        }),
        new HtmlWebpackPlugin({
            title: "vue开发平台",
            template:"./dashboards/index.html",
            filename: '../../views/dashboard.html', // 将html文件写入到这里 - 输出的文件相对与dashboard（也就是output的path）
            inject: 'body',
            favicon: path.join(__dirname, "dashboards/static/image/logo.png")
        }),
        new VueLoaderPlugin(),
        new webpack.DllReferencePlugin({ // 打包的main文件中不会包含动态链接库定义的文件
            context: __dirname,
            manifest: require('./static/dashboard/dll/vendor-manifest.json')
        })
    ]
};
