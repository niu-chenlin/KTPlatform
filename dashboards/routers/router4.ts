import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router"

const routes: RouteRecordRaw[] = [ // 创建方式与3.x一样
    // @ts-ignore
    {path: '/user', component: '视图组件'},
    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
    // { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    // 将匹配以 `/user-` 开头的所有内容，并将其放在 `$route.params.afterUser` 下
    // { path: '/user-:afterUser(.*)', component: UserGeneric },
];

// 使用带有参数的路由时需要注意的是，当用户从 /users/johnny 导航到 /users/jolyne 时，相同的组件实例将被重复使用。因为两个路由都渲染同个组件，
// 比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会被调用。
const route = createRouter({
    history: createWebHashHistory(), // 使用hash模式 在SEO 中确实有不好的影响
    routes: routes,
});

export default route; // 在main.js中 app.use(route)

// 要在 setup 函数中访问路由，请调用 useRouter 或 useRoute 函数  组件其它地方使用this.$router获取组件的实例
// 因为相同组件的实例会被复用，因此如果导航到相同组件（参数有所变化的情况下）需要对动态参数做出变化，使用如下方式：
// 要对同一个组件中参数的变化做出响应的话，你可以简单地 watch $route 对象上的任意属性，在这个场景中，就是 $route.params ：
// created() { 在created钩子函数中使用this.$watch
//     this.$watch(
//         () => this.$route.params,
//         (toParams, previousParams) => {
//             // 对路由变化做出响应...
//         }
//     )
// },
// 或者，与3.x一样 使用 beforeRouteUpdate 导航守卫，它也可以取消导航：
// async beforeRouteUpdate(to, from) {
//     // 对路由变化做出响应...
//     this.userData = await fetchUser(to.params.id)
// },

// router.push 和所有其他导航方法都会返回一个 Promise，让我们可以等到导航完成后才知道是成功还是失败。
// 注：path和params不可同时存在 path可结合query使用(params:/:userID，query:userId=1)

// 可通过 router.addRoute() 和 router.removeRoute()来实现动态路由 他们只负责添加或删除，切换还是需要push等方法
// 添加嵌套路由
// router.addRoute({ name: 'admin', path: '/admin', component: Admin })
// router.addRoute('admin', { path: 'settings', component: AdminSettings })

// 查看现有路由
// Vue Router 提供了两个功能来查看现有的路由：
// router.hasRoute()：检查路由是否存在。
// router.getRoutes()：获取一个包含所有路由记录的数组。