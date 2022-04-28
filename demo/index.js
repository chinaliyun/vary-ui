import Vue from "vue";

import App from "./App";
import MasterUI from "../dist/master-ui";
import "../dist/master-ui.css";
Vue.use(MasterUI);

import "@/cover.scss";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
