import Vue from "vue";
import App from "./App";
import "./static/style/main.less";

console.log("test");
new Vue({
    el: "#app-root",
    component: {app: App},
    template: "<App>"
});