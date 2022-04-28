import Vue from "vue";

import App from "./App";
import VaryUI from "../dist/vary-ui";
import "../dist/vary-ui.css";
Vue.use(VaryUI);

import "@/cover.scss";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
