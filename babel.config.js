// 从babel7.x开始支持2中配置文件 .babelrc和babel.config.js
// babelrc和babel.config.js的区别：
// babelrc只对所在目录进行翻译，而babel.config.js对本项目所有目录进行翻译。babel.config.js相当的于全局的配置文件，babelrc相当于局部的配置文件
// .babelrc 相对文件(File Relative)的配置文件， babel 决定一个 js 文件应用哪些配置文件时,会执行如下策略: 如果要转换的这个 js 文件在当前项目内，
// 则会先递归向上搜索最近的一个 .babelrc 文件(直到遇到package.json目录)，将其与全局配置合并。如果这个 js 文件不在当前项目内，则只应用全局配置，
// 忽略与这个文件相关的 .babelrc 。
// babel在编译时会将当前js目录或上级目录的.babelrc和babel.config.js合并
//

module.exports = {
    plugins: [
        [
            "import",
            {
                libraryName: 'element-plus',
                customStyleName: (name) => {
                    name = name.slice(3);
                    return `element-plus/packages/theme-chalk/src/${name}.scss`;
                },
            },
        ],
    ],
};