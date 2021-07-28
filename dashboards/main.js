import {createApp} from "vue";
// import Vue from "vue";
import App from "./App";
import "./static/style/main.less";
import img from "./static/image/logo.png";
//
// Vue.config.productionTip = false;
// // vue 2
// new Vue({
//     render: h => h(App),
// }).$mount('#app-root');

// vue 3

createApp(App).mount('#app-root');
