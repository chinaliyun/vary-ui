import Vue from "vue";

import App from "./App";
import VaryUI from "../src/index";
Vue.use(VaryUI);

import "@/cover.scss";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
