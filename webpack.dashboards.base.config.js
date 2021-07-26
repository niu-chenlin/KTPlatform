// webpack公共配置文件
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 这个插件是必须的！ 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。
// 例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 运行在 Node.js 之上的 Webpack 是单线程模型的，也就是说 Webpack 需要处理的任务需要一件件挨着做，不能多个事情一起做。
// 由于 JavaScript 是单线程模型，要想发挥多核 CPU 的能力，只能通过多进程去实现，而无法通过多线程实现。
// 使用happypack开启多进程处理不同的loader
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const vueLoaderConfig = require('./vue-loader.config');

module.exports = {
    entry: {
        main: path.join(__dirname, 'dashboards/main.js')
    },
    output: {
        path: path.join(__dirname, 'static/dashboard'), // 打包到static/dashboard/script/[name].js文件
        filename: 'script/[name].js?[hash]',
        publicPath: "/dashboard/" // html文件访问路径前加/dashboard/
    },
    resolve: {
        extensions: ['.vue', '.js', '.json']
    },
    // // 创建一个 vendors chunk，其中包括整个应用程序中 node_modules 的所有代码。
    optimization: { // 从 webpack 4 开始，会根据你选择的 mode 来执行不同的优化， 不过所有的优化还是可以手动配置和重写。
        minimize: true, // 压缩JS代码 压缩后的代码不换行
        splitChunks: { // 主要就是根据不同的策略来分割打包出来的bundle。
            cacheGroups: {
                vendors: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial"
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                exclude: /node_module/,
                // use: [
                //     'style-loader',
                //     'css-loader',
                //     {
                //         loader: "postcss-loader",
                //         options: {
                //             sourceMap: true,
                //             postcssOptions: {
                //                 plugins: [
                //                     ['autoprefixer'],
                //                 ]
                //             }
                //         }
                //     },
                //     'less-loader'
                // ]
                use: 'happypack/loader?id=css'
            },
            {
                test: /\.js$/,
                exclude: /node_module/,
                // 将.js文件交给id为happyBabel的happypack实例来执行
                // loader: 'happypack/loader?id=happyBabel', // 错误 不能在webpack5中使用?查询
                use: 'happypack/loader?id=js'
                // include: /dashboards/,
                // loader: 'babel-loader',
                // options: {
                //     "cacheDirectory": true
                //     // 在这里或者新建.babelrc文件均可
                // }
            },
            {
                test: /\.vue$/,
                exclude: /node_module/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: vueLoaderConfig
                    }
                ],
                // use: 'happypack/loader?id=vue'
            }
        ]
    },
    // externals 和 DllPlugin 解决的是同一类问题：将依赖的框架等模块从构建过程中移除。
    // Externals 配置项用来告诉 Webpack 要构建的代码中使用了哪些不用被打包的模块，也就是说这些模版是外部环境提供的，Webpack 在打包时可以忽略它们。
    // 在使用第三方库时可以直接使用cnd上的资源, 而不用打包到bundle.js中。
    externals: {
        // key指的是require的东西 代码中当require的参数是Vue的时候，使用vue这个全局变量引用它
        // 'vue': 'Vue',
        // 'vue-router': 'VueRouter',
        // 'vuex': 'vuex',
        // 'elemenct-ui': 'ELEMENT',
        // 'axios': 'axios',
        // 'fastclick': 'FastClick'
    },
    plugins: [
        new HappyPack({ // 经测试 感觉HappyPack不是特别好用 打包速度没有提升，反而下降了
            // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
            id: 'js',
            // 如何处理 .js 文件，用法和 Loader 配置中一样
            // 注意：loaders 是 use 的别名
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        "cacheDirectory": true,
                        // 2.使用bable,新语法转成es5语法
                        // presets: [
                        //     '@babel/preset-env'
                        // ]
                    }
                }
            ],
            threadPool: happyThreadPool
            // threads Number 代表开启几个子进程去处理这一类型的文件，默认是3个，类型必须是整数。
            // verbose: Boolean 是否允许 HappyPack 输出日志，默认是 true。
            // threadPool: HappyThreadPool 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
            //
        }),
        new HappyPack({
            id: 'css',
            use: [
                // MiniCssExtractPlugin.loader,
                'style-loader',
                'css-loader',
                // {
                //     loader: 'css-loader',
                //     options:{
                //         minimize: true //css压缩
                //     }
                // },
                'less-loader'
            ],
            threadPool: happyThreadPool
        }),
        // new HappyPack({ // 可能是版本问题 对vue-loader不支持
        //     id: 'vue',
        //     loaders: [
        //         {
        //             loader: 'vue-loader',
        //             options: vueLoaderConfig
        //         }
        //     ],
        //     threadPool: happyThreadPool
        // }),

        // 该插件将为你生成一个 HTML5 文件， 在 body 中使用 script 标签引入你所有 webpack 生成的 bundle
        new HtmlWebpackPlugin({
            title: "vue开发平台",
            template:"./dashboards/index.html",
            filename: '../../views/dashboard.html', // 将html文件写入到这里 - 输出的文件相对与dashboard（也就是output的path）
            inject: 'body',
            // favicon: path.join(__dirname, "dashboards/static/img/favicon.ico")
        }),
        new VueLoaderPlugin(), // vue项目独有，把vue模板中的template script style代码块运用到webpack的loader中
        // new webpack.DllReferencePlugin({ // 打包的main文件中不会包含动态链接库定义的文件
        //     context: __dirname,
        //     manifest: require('./static/dashboard/dll/vendor-manifest.json')
        // })
    ],
};

// 1.babel-loader 虽然webpack本身就能够处理.js文件，但无法对ES2015+的语法进行转换，babel-loader的作用正是实现对使用了ES2015+语法的.js文件进行处理。
// 2.babel-core babel-core的作用在于提供一系列api。这便是说，当webpack使用babel-loader处理文件时，babel-loader实际上调用了babel-core的api，因此也必须安装babel-core
// 3.babel-preset-env babel-preset-env的作用是告诉babel使用哪种转码规则进行文件处理
//   可选babel-preset-es2015、babel-preset-latest、babel-preset-env 官方现已建议采用babel-preset-env
//   "useBuiltIns": "usage" 按需加载的配置 默认babel 会将所有的 polyfill 全部引入这样包很大
// 4.babel-plugin-transform-runtime  消除一些重复代码 可以重用 Babel 注入的辅助代码以节省代码大小。
// babel-loader7之后必须采用@babel/preset-  @babel/plugin-方式安装和定义

// 在Babel执行编译的过程中，会从项目的根目录下的 .babelrc文件中读取配置
// presets 属性字段设定转码规则，“plugins"属性设置使用到的插件

// Babel 是一个 JavaScript 编译器。
// Babel 是一个工具链，主要用于将采用 ECMAScript 2015+ 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。
// 下面列出的是 Babel 能为你做的事情：
// 语法转换
// 通过 Polyfill 方式在目标环境中添加缺失的特性（通过第三方 polyfill 模块，例如 core-js，实现）
// 源码转换 (codemods)

// Polyfill 是一块代码（通常是 Web 上的 JavaScript），用来为旧浏览器提供它没有原生支持的较新的功能。
// webpack - 模块化打包工具

// .babelrc文件：
// plugins 该属性是告诉babel要使用那些插件，这些插件可以控制如何转换代码。
// 1. 理解 babel-polyfill 和 babel-runtime 及 babel-plugin-transform-runtime
// Babel默认只转换新的javascript语法，而不转换新的API，比如 Iterator, Generator, Set, Maps, Proxy, Reflect,Symbol,Promise 等全局对象。以及一些在全局对象上的方法(比如 Object.assign)都不会转码。
// 比如说，ES6在Array对象上新增了Array.form方法，Babel就不会转码这个方法，如果想让这个方法运行，必须使用 babel-polyfill来转换等。

// 自动打包优化三种方式
// 1. 默认为production模式，对打包结果完全优化，代码会变得不可读。优化方式：TreeShaking、SideEffects。
//  TreeShaking webpack 的一种 打包优化，不会打包未使用的代码。
//  SideEffects ebpack 4新特性，允许使用配置形式来标识代码的副作用，一般在开发npm模块时，才会用到。
// 2. development模式，优化打包速度，增加调试过程中的辅助信息，打包结果适合调试。
// 3. none模式，最原始的状态打包代码，不进行打包优化。


// Webpack构建优化—使用DllPlugin、HappyPack、ParallelUglifyPlugin
// 一、DllPlugin .dll为后缀的文件，这些文件称为动态链接库，在一个动态链接库中可以包含给其他模块调用的函数和数据。
    // 要给Web项目构建接入动态链接库的思想，需要完成以下事情：
    // 把网页依赖的基础模块抽离出来，打包到一个个单独的动态链接库中去。一个动态链接库中可以包含多个模块。
    // 当需要导入的模块存在于某个动态链接库中时，这个模块不能被再次被打包，而是去动态链接库中获取。
    // 页面依赖的所有动态链接库需要被加载。
// 为什么给 Web 项目构建接入动态链接库的思想后，会大大提升构建速度呢？ 原因在于包含大量复用模块的动态链接库只需要编译一次，
// 在之后的构建过程中被动态链接库包含的模块将不会在重新编译，而是直接使用动态链接库中的代码。由于动态链接库中大多数包含的是常用的第三方模块，
// 例如react、react-dom，只要不升级这些模块的版本，动态链接库就不用重新编译。
// Webpack已经内置了对动态链接库的支持，需要通过2个内置的插件接入，它们分别是：
// 1.DllPlugin插件：用于打包出一个个单独的动态链接库文件。
// 2.DllReferencePlugin插件：用于在主要配置文件中去引入DllPlugin插件打包好的动态链接库文件。
// 还有一个CommonsChunkPlugin插件，对于 CommonsChunkPlugin，webpack 每次打包实际还是需要去处理这些第三方库，只是打包完之后，能把第三方库和我们自己的代码分开。
// 而 DLLPlugin 则是能把第三方代码完全分离开，即每次只打包项目自身的代码。
// 二、
