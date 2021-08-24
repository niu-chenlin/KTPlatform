// 通过此组件你将了解vue.use干了什么，为什么有些插件需要vue.use而有些不需要，例如axios就不用
// vue.use 调用了插件的install方法并传入vue作为参数，所以一个组件如果需要.use那这个组件必须有install方法
// 个人理解这个组件需要依赖vue，所以需要一个install方法作为中间方法传入vue参数

import LoadingComponent from './customComponentLoading'

const Loading = {
    install: function(Vue) { // 这个方法的第一个参数是Vue构造器,第二个参数是一个可选的选项对象
        Vue.component('LoadingComponent', LoadingComponent); // 注册全局组件  context.components[name] = component; use是注册全局插件
        // 添加全局方法或者属性
        // Vue.myGlobMethod = function () {};
        // // 添加全局指令
        // Vue.directive();
        // // 添加混入
        // Vue.mixin();
        // 添加实例方法
        // Vue.prototype.$xxx = function () {};
        // 注册全局组件
        // Vue.component();
    }
};

export default Loading;