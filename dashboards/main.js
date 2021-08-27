// import Vue from "vue" // vue 2
import {createApp, reactive} from "vue"
import App from "./App"
// import ElementPlus from 'element-plus' // 配置按需引入后，项目运行不能找到ElementPlus,需要通过如下方式引入@1
import { ElButton, ElSelect, ElInput, ElRow } from 'element-plus';
// import "../node_modules/element-plus/packages/theme-chalk/src/base.scss"
// import "~element-plus/packages/theme-chalk/src/base" // @import ~用于告诉webpack搜索node_modules - css及其预处理文件中使用
import "./static/style/style.scss"
import zhCn from 'element-plus/lib/locale/lang/zh-cn'; // 国际化
import Loading from "./customComponents/customComponentByVue.use/customComponentByVue.use"
import MyHome from './customComponents/MyHome'
// import store from './vuex/vuex'
import store from './vuex/vuexs'
// import VueRouter from 'vue-router'
import VueRouter from './routers/index'

// Vue.config.productionTip = false;
// // vue 2
// new Vue({
//     render: h => h(App),
// }).$mount('#app-root');

// vue 3
const app = createApp(App);
// app.use(ElementPlus); // @1
// app.use(ElementPlus, { size: 'small', zIndex: 3000 }); // 全局引入时修改全局配置


app.config.globalProperties.$ELEMENT =  { size: 'small', zIndex: 3000 }; // 按需引入时修改全局配置

app.use(store);
app.use(Loading);
app.use(VueRouter);
app.component('ComponentA', MyHome);
app.component(ElButton.name, ElButton); // 全局引入 - 在组件内部不需要再import
app.component(ElSelect.name, ElSelect);
app.component(ElInput.name, ElInput);
app.component(ElRow.name, ElRow);

app.mount('#app-root'); // mount必须放在最后，其它函数如use\component才有用