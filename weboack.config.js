const path = require("path");

module.exports = {
    entry: {
        main: ""
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js?[hash]'
    },
    watch: true, // 执行该配置文件默认开启自动编译 类似 npm run webpack -w
    mode: "development", // 配置用于提供模式配置选项告诉webpack相应地使用其内置的优化 三个值可选：development production none
    devtool: "source-map", // 打包后的source-map文件
    // 创建一个 vendors chunk，其中包括整个应用程序中 node_modules 的所有代码。
    optimization: { // 从 webpack 4 开始，会根据你选择的 mode 来执行不同的优化， 不过所有的优化还是可以手动配置和重写。
        // optimization帮助我们手动配置和重写代码优化
        minimize: true, // 压缩JS代码
        splitChunks:{ // 主要就是根据不同的策略来分割打包出来的bundle。
            cacheGroups: {
                vendors: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial"
                }
                // 比如单独打包某个文件
                // a: {
                //     test: /a\.js/,//匹配规则
                //     minChunks:2,//重写公用chunks的次数
                //     chunks: "all",
                //     name: "a",//重写文件名称
                //     enforce: true //强制生成
                // }
            }
        }
    },
};