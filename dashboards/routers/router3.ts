// import VueRouter from 'vue-router'
// const { isNavigationFailure, NavigationFailureType } = VueRouter

// export const router = new VueRouter({
//     mode: "hash", // 'hash' | 'history' | 'abstract' 默认路由hash模式，如扩展history模式，需在后端koa路由配置
//     scrollBehavior (to, from, savedPosition) {
//         // 当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。
//         // scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
//         // return 期望滚动到哪个的位置
//         // 这个方法返回滚动位置的对象信息，长这样
//         // { x: number, y: number }
//         // { selector: string, offset? : { x: number, y: number }} (offset 只在 2.6.0+ 支持)
//         if (to.hash) { // 滚动到指定锚点
//             return {
//                 selector: to.hash,
//                 behavior: 'smooth', // 平滑滚动
//             }
//         }
//         // 你也可以返回一个 Promise 来得出预期的位置描述：
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve({ x: 0, y: 0 })
//             }, 500)
//         })
//     },
//     routes: [
//         { path: '/user/:id', component: "视图组件" }, // 动态路由 组件中通过this.$router访问url信息
//         { // 嵌套路由需要多个 <router-view></router-view>出口标签 1.根组件 2.视图出口组件
//             path: '/user', component: "视图组件",
//             children: [
//                 {path: 'info', component: "嵌套子组件"}
//             ]
//         },
//         { // 命名路由 - 可通过:to="{ name: 'user', params: { userId: 123 }} 方式匹配
//             path: '/name',
//             name: 'thisName',
//             component: "命名路由"
//         },
//         { // 命名视图 在组件中使用 <router-view name="a"/>  <router-view name="b"/>的方式使用
//             path: '/viewName',
//             components: {
//                 default: '默认组件',
//                 a: 'a组件',
//                 b: 'b组件'
//             },
//             children: [
//                 {
//                     path: 'info',
//                     components: {} // 同理 - 命名视图也可以嵌套使用
//                 }
//             ]
//         },
//         {path: '/redirect', redirect: '/to'}, // 路由重定向
//         {path: '/alias', alias: '/aliasName'}, // 路由别名
//         {path: '/props', props: true}, // 解耦<div>User {{ $route.params.id }}</div>，
//         // 设置props:true 路由的参数将直接作为组件的props，在组件中可通过id直接访问
//         // 如果 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用。   props: { newsletterPopup: false }
//         // 你可以创建一个函数返回 props。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。
//         // 请尽可能保持 props 函数为无状态的，因为它只会在路由发生变化时起作用。如果你需要状态来定义 props，请使用包装组件，这样 Vue 才可以对状态变化做出反应。
//         {path: '* of /user-*',
//             beforeEnter: (to, from, next) => { // 路由独享守卫
//                 // ...
//             }} //404路由
//     ]
// });
// router.beforeEach((to, from, next) => { // 全局前置守卫
//     // 全局的导航守卫 - 在路由进入时触发 既然有全局那肯定有局部守卫 在组件内可定义局部导航守卫
//     // 守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。
//     // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//     // 如果用户未能验证身份，则 `next` 会被调用两次
//     // next()
//     // 确保 next 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错。
//     // 应该如下这样使用
//     // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//     // else next()
// });
// // 你可以用 router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用
// router.beforeResolve(() => {}); // 全局解析守卫
// // 你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身：
// router.afterEach((to, from) => {
//     // ...
// });
// 组件内的守卫
// beforeRouteEnter(to, from, next) {
//     // 在渲染该组件的对应路由被 confirm 前调用
//     // 不！能！获取组件实例 `this`
//     // 因为当守卫执行前，组件实例还没被创建
// },
// beforeRouteUpdate(to, from, next) {
//     // 在当前路由改变，但是该组件被复用时调用
//     // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
//     // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
//     // 可以访问组件实例 `this`
// },
// beforeRouteLeave(to, from, next) {
//     // 导航离开该组件的对应路由时调用
//     // 可以访问组件实例 `this`
// }


// Router对象支持h5 history的所有方法 如下方法也可以在组件中使用this.$router访问到 访问当前路由情使用this.$route没r
// router.push(); router.push(location, onComplete?, onAbort?) 所有方法支持访问开始和
// router.go();
// router.replace();
// <router-link :to="...">标签会渲染为一个a标签，底层采用pus()实现，因此会往浏览器里是添加一条历史记录

// #完整的导航解析流程
// 导航被触发。
// 在失活的组件里调用 beforeRouteLeave 守卫。
// 调用全局的 beforeEach 守卫。
// 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
// 在路由配置里调用 beforeEnter。
// 解析异步路由组件。
// 在被激活的组件里调用 beforeRouteEnter。
// 调用全局的 beforeResolve 守卫 (2.5+)。
// 导航被确认。
// 调用全局的 afterEach 钩子。
// 触发 DOM 更新。
// 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

// 组件对路由的监听
// watch: {
//     // 如果路由有变化，会再次执行该方法
//     '$route': 'fetchData'
// },

// 要检查一个错误是否来自于路由器，可以使用 isNavigationFailure 函数：
// 正在尝试访问 admin 页面
// router.push('/admin').catch(failure => {
//     if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
//         // 向用户显示一个小通知
//         showToast('Login in order to access the admin panel')
// 所有的导航故障都会有 to 和 from 属性，分别用来表达这次失败的导航的目标位置和当前位置。
// failure.to.path // '/admin'
// failure.from.path // '/'
//     }
// })
//NavigationFailureType 可以帮助开发者来区分不同类型的导航故障。有四种不同的类型：
// redirected：在导航守卫中调用了 next(newLocation) 重定向到了其他地方。
// aborted：在导航守卫中调用了 next(false) 中断了本次导航。
// cancelled：在当前导航还没有完成之前又有了一个新的导航。比如，在等待导航守卫的过程中又调用了 router.push。
// duplicated：导航被阻止，因为我们已经在目标位置了。