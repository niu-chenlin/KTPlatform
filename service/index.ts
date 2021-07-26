import Koa from 'koa'
import Router from 'koa-router'
import KoaViews from 'koa-views'
import KoaStatic from 'koa-static' // 处理静态资源，自带缓存 重定向到304缓存 - 304 http缓存
import KoaBodyParar from 'koa-bodyparser'
import {Config} from "./config/config"; // 封装原生koa post中req的数据 在代码中可以直接使用req.body获取数据 getPortData函数用于测试



const app = new Koa();
const router: Router = new Router();

// 路由级中间件
router.get('/', async ctx => {
    return ctx['render']('dashboard');
});

// app.use(KoaBodyParar()); // 使用函数getPostData测试一下原生post 和 Body的区别
// 视图管理模块 extension:视图默认扩展名  map 将文件扩展名映射到引擎 在此示例中每个以.html结尾的文件都将由ejs模板引擎进行渲染
// opts.autoRender: 是否用于ctx.body接收渲染的模板字符串。默认为true.
// opts.engineSource: 替换合并为默认引擎源
// { engineSource: {foo: () => Promise.resolve('bar')}} 覆盖整合的引擎模板 此示例表示 带有foo扩展名的模板将始终返回bar.
// opts.options：这些选项将传递给视图引擎。这是添加的时间partials和helpers等。
app.use(KoaViews("./views", {extension: 'html', map: {html: 'ejs'}}));
app.use(router.routes()); // 路由
app.use(KoaStatic("./static"));
app.use(router.allowedMethods());
app.listen(Config.Port);


