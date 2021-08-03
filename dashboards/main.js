// import Vue from "vue"; // vue 2
import {createApp} from "vue";
import App from "./App";
import ElementPlus from 'element-plus';
// import "../node_modules/element-plus/packages/theme-chalk/src/base.scss";
import "./static/style/style.scss";
import img from "./static/image/logo.png";

// Vue.config.productionTip = false;
// // vue 2
// new Vue({
//     render: h => h(App),
// }).$mount('#app-root');

// vue 3
const app = createApp(App);
app.use(ElementPlus);
app.mount('#app-root');
