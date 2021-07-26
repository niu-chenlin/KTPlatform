
module.exports = {
    preserveWhitespace: true,        //除去空格符
    // extractCSS: !isDev,              // 把vue的css提取到单独的文件，默认 css单独提取出来,再在webpack.config.base.js里面配置
    //                                  //开发的环境不需要,正式环境需要
    // cssModules: {                    //css配置文件
    //     localIdentName:isDev?'[path]-[name]-[hash:base64:5]':'[hash:base64:5]',
    //     //生成的文件名称
    //     camelCase:true
    // },
    //hotReload: false               //热重载功能,根据环境变量生成,默认不用设置.
    /*loaders: {                     //自定义loader,用处较少
        //'docs': docsLoader,
        js: 'coffe-loader',
        //html, style
    },
    preLoader: {},                   //先解析，再用指定的loader去加载，如typescript
    postLoader: {}*/
};