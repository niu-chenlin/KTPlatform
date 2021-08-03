const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.dashboards.base.config");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // webpack 可视化
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css代码分离  在开发阶段使用style-loader打包性能更优 - 没必要分离
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css去重
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 单线程的js压缩插件
const WebpackUglifyJsPlugin = require("webpack-parallel-uglify-plugin"); // 多进程的js压缩插件 - 开启多个子进程进程压缩
const pubStyleLoader = [
    MiniCssExtractPlugin.loader,
    // 'style-loader',
    'css-loader',
    {
        loader: "postcss-loader",
        options: {
            sourceMap: true,
            postcssOptions: {
                plugins: [
                    ['autoprefixer'],
                    // cssnano 优化器也可以在loader中配置，除了 不能去重 之外，其他效果等同，所以小编这里就只在plugin中配置了，免得在配置一遍
                    // ['cssnano'] // 上面指的是optimize-css-assets-webpack-plugin
                    // 不压缩是最快的 使用optimize-css-assets-webpack-plugin 最快 使用cssnano最慢
                ]
            }
        }
    },
];
module.exports = webpackMerge.merge(baseConfig, {
    watch: true, // 执行该配置文件默认开启自动编译 类似 npm run webpack -w
    mode: "development", // 配置用于提供模式配置选项告诉webpack相应地使用其内置的优化 三个值可选：development production none
    devtool: "source-map", // 打包后的source-map文件
    // 抽离打包第三方模块 和dll动态链接库完成的工作几乎一致 推荐dll
    // 创建一个 vendors chunk，其中包括整个应用程序中 node_modules 的所有代码。
    optimization: { // 从 webpack 4 开始，会根据你选择的 mode 来执行不同的优化， 不过所有的优化还是可以手动配置和重写。
        minimize: true, // 压缩JS代码 压缩后的代码不换行
        // splitChunks: { // 主要就是根据不同的策略来分割打包出来的bundle。
        //     cacheGroups: {
        //         vendors: { // 抽离第三方模块
        //             name: 'vendor',
        //             test: /[\\/]node_modules[\\/]/,
        //             chunks: "initial"
        //         }
        //     }
        // }
        minimizer: [
            // 如果配置了minimizer，就表示开发者在自定以压缩插件。内部的JS压缩器就会被覆盖掉。所以这里还需要手动将它添加回来。webpack内部使用的JS压缩器是「terser-webpack-plugin」。
            new OptimizeCssAssetsPlugin(),
            // new WebpackUglifyJsPlugin({ // 配置到minimizer方便同意管理，配置在plugin中启动时就执行
            //     // test: /.js$/g,
            //     // cacheDir: true, // 缓存压缩后的结果，下次遇到一样的输入时直接从缓存中获取压缩后的结果并返回，cacheDir 用于配置缓存存放的目录路径。默认不会缓存，想开启缓存请设置一个目录路径。
            //     // workerCount: '',
            //     // sourceMap: true,
            //     uglifyJS: {
            //         output: {
            //             beautify: false, // 是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，默认是true
            //             comments: false //  是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
            //         },
            //         compress: {
            //             warnings: false, // 是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用不大的警告
            //             drop_console: true, // 是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
            //             collapse_vars: true, // 是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不转换，为了达到更好的压缩效果，可以设置为false
            //             // 是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成
            //             // var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
            //             reduce_vars: true
            //         }
            //     }
            // })
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        // warnings: false
                        drop_console: true // 压缩代码后去除console 成功
                    }
                },
                sourceMap: true,
                parallel: true, // 开启多进程压缩
            })
        ]
    },

    module: {
        rules: [
            {
                test:/\.scss?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            // config: {
                            //     path: path.join(__dirname, 'postcss.config.js')
                            // },
                            postcssOptions: {
                                plugins: [
                                    ['autoprefixer'],
                                    // cssnano 优化器也可以在loader中配置，除了 不能去重 之外，其他效果等同，所以小编这里就只在plugin中配置了，免得在配置一遍
                                    // ['cssnano'] // 上面指的是optimize-css-assets-webpack-plugin
                                    // 不压缩是最快的 使用optimize-css-assets-webpack-plugin 最快 使用cssnano最慢
                                ]
                            }
                        }
                    },
                    "resolve-url-loader", // 用来解决在sass中引入第三方样式导致的url地址不正确问题  - 也可以重写Sass的变量地址
                    "sass-loader"
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename:"style/[name].css?[hash]",
        }),
        // new WebpackUglifyJsPlugin({
        //     uglifyJS: {
        //
        //     }
        // })
        // new BundleAnalyzerPlugin()  // webpack 可视化
        // 配置在「plugins」中，webpack就会在启动时使用这个插件。
        // 而配置在 「optimization.minimizer」 中，就只会在「optimization.minimize」这个特性开启时使用。
        // 所以webpack推荐，像压缩类的插件，应该配置在「optimization.minimizer」数组中。
        // 以便于通过「optimization.minimize」统一控制。（生产环境会默认开启minimize）
        // new OptimizeCssAssetsPlugin(),
    ],
    // devServer: {
    //     port: 8889,
    //     inline: true,
    //     contentBase:  path.join(__dirname, "static"),
    // }

    // 1. 开发基于AngularJs + java服务代理的云计算管理平台项目。
    // 2. 基于React栈的共享动感单车项目。项目整体基于NodeJs Koa2框架做web服务。前端框架采用React + Antd，后端数据库操作采用Sequelize ORM框架。
    // 3. 官方网站开发：
    // 1.基于express ejs模板引擎的高度配置官网开发，后期人员只需通过简单的配置即可生成想要的web页面
    // 2.基于css3 h5的静态网站 - 某保健品官网
    // 3.基于websoclet的动态展示页 - 某公司展会项目 等

    //5年的前端开发工作经验，1年的java开发经验，能够胜任全栈开发，个人独立开发过2个项目。
    // 个人掌握主要技术：JavaScript TypeScript css3 html5 React AngularJs NodeJs webpack等
    // 浅要技术：Python Java Linux Vue Vite等
});