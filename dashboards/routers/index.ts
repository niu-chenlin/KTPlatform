import {createRouter, createWebHashHistory, RouteRecordRaw, RouteComponent} from "vue-router";
import routeList from "./routeList";
import MainView from "../views/main-view.vue";
import LoginView from "../views/login-view.vue"
import {AuthTool} from "../util-tool/auth-tool";

const routes: RouteRecordRaw[] = routeList.map(item => {
    return {
        path: item.path,
        component: item.component,
        components: item.components,
        children: item.children
    } as unknown as RouteRecordRaw
});

const route = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/', redirect: '/main'},
        {path: '/login', component: LoginView},
        {
            path: '/main',
            component: MainView,
            // children: routes
        }
    ]
});

route.beforeEach((to, from, next) => { // 路由前置守卫
    if(to.path !== "/login" && !AuthTool.hasAuthInfo()) {
        next('/login');
    } else {
        next();
    }
});

export default route;