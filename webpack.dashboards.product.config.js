const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.dashboards.base.config");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 单线程的js压缩插件
const WebpackUglifyJsPlugin = require("webpack-parallel-uglify-plugin"); // 多进程的js压缩插件 - 开启多个子进程进程压缩
// 开发环境（development）是使用style-loader，这样引入js的时候，就会把样式插入到style当中，因为style-loader内部实现了HMR功能，
// 故在开发环境中的打包性能就会更好，打包速度就会更快。
// 将css文件单独提取出来，那么就可以先在页面的最前面引入这个单独的css文件，浏览器先解析了css文件就会生成cssom从而与
// dom tree生成渲染树从而以最快速度渲染出页面。如果放在js文件中，不仅会增加js文件体积，使js文件的下载时间延长，
// 而且进行解析js文件往往都是在dom树生成之后，那么这两者增加的延迟会大大影响渲染速度，削弱用户体验。
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css代码分离
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css去重


module.exports = webpackMerge.merge(baseConfig, {
    mode: "production", // 配置用于提供模式配置选项告诉webpack相应地使用其内置的优化 三个值可选：development production none
    // 创建一个 vendors chunk，其中包括整个应用程序中 node_modules 的所有代码。
    optimization: { // 从 webpack 4 开始，会根据你选择的 mode 来执行不同的优化， 不过所有的优化还是可以手动配置和重写。
        minimize: true, // 压缩JS代码 压缩后的代码不换行
        splitChunks: { // 主要就是根据不同的策略来分割打包出来的bundle。
            //     cacheGroups: {
            //         vendors: {
            //             name: 'vendor',
            //             test: /[\\/]node_modules[\\/]/,
            //             chunks: "initial"
            //         }
            //         // commons: { // 公共的代码
            //         //     name: "commons", // 抽离出来的模块名
            //         //     chunks: 'initial', // 初始化，从入口文件开始抽离
            //         //     minSize: 0, // 如果这个代码大于0字节
            //         //     minChunks: 2, // 这个代码引用多少次才需要抽离
            //         // },
            //         // vendors: { // 抽取第三方模块
            //         //     priority: 1, // 权重，权重越高越先抽取
            //         //     name: 'vendors',
            //         //     test: /node_modules/, // 如果你多次引用了node_modules第三方模块,就抽取出来
            //         //     chunks: 'initial',
            //         //     minSize: 0,
            //         //     minChunks: 2
            //         // }
            //     }
            // },

        },
        minimizer: [ // production会默认开启js压缩，但是如果你配置了minimizer，webpack会任务你采用自定义的压缩方式，因此会覆盖掉默认的js压缩器
            // new UglifyJsPlugin({ // 由于自定义的minimizer会覆盖掉webpack的默认压缩插件 所以此处需要配置自定义的js压缩插件
            //     test: /\.js(\?.*)?$/i,  //测试匹配文件,
            //     // include: /\/includes/, //包含哪些文件
            //     // excluce: /node/, //不包含哪些文件
            //     //允许过滤哪些块应该被uglified（默认情况下，所有块都是uglified）。
            //     //返回true以uglify块，否则返回false。
            //     // chunkFilter: (chunk) => {
            //     //     // `vendor` 模块不压缩
            //     //     if (chunk.name === 'vendor') {
            //     //         return false;
            //     //     }
            //     //     return true;
            //     // },
            //     cache: false,   //是否启用文件缓存，默认缓存在node_modules/.cache/uglifyjs-webpack-plugin.目录
            //     parallel: true,  //使用多进程并行运行来提高构建速度
            // }),
            new OptimizeCssAssetsPlugin(), // css去重 - 仅仅是去掉重复的代码块 然后合并代码块的中的属性
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        drop_console: true // 压缩代码后去除console 成功
                    }
                },
                sourceMap: true,
                parallel: true, // 开启多进程压缩
            })
        ],
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                exclude: /node_module/,
                use: [
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
                                    // ['cssnano'] // 使用cssnano最慢 推荐使用插件OptimizeCssAssetsPlugin
                                ]
                            }
                        }
                    },
                    'less-loader'
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename:"style/[name].css?[hash]",
        }),
    ]
});