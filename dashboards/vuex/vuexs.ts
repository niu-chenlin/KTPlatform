// vuex核心五 - vuex的模块化

import {routerState, viewStates} from "./states";
import {routerMutations, viewMutations} from "./mutations";
import {routerAction, viewAction} from "./actions";
import {routerGetters, viewGetters} from "./getters";
import {createStore} from "vuex";

const routerModule = {
    state: routerState,
    mutations: routerMutations,
    actions: routerAction,
    getters: routerGetters
};

const viewModule = {
    state: viewStates,
    mutations: viewMutations,
    actions: viewAction,
    getters: viewGetters
};

const myPlugins = (store) => { // vuex的插件
    // 当 store 初始化后调用
    store.subscribe((mutation, state) => {
        // 每次 mutation 之后调用
        // mutation 的格式为 { type, payload }
        console.log("每次 mutation 之后调用插件");
    })
};

const store = createStore({
    modules: {
        router: routerModule, // 使用store.router.state方式操作
        view: viewModule // 使用store.view.state.方式操作
    },
    plugins: [myPlugins]
});

export default store;