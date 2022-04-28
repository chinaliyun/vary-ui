import Vue from "vue";
import Message from "./src/Message";

let instanceMap = [];
const createComponent = function (type, msg) {
  const Component = Vue.extend(Message);
  const instance = new Component();
  instanceMap.push(instance);
  instance.init(type, msg, instanceMap.length);
  const el = instance.$mount().$el;
  document.body.appendChild(el);

  let timer = setTimeout(() => {
    instance.$destroy();
    document.body.removeChild(instance.$el);
    instanceMap = instanceMap.filter((item) => item._uid !== instance._uid);
    resetStyle();
    clearTimeout(timer);
    timer = null;
  }, 3100);
  return instance;
};

function instance(msg) {
  createComponent("success", msg);
}

const resetStyle = function () {
  if (instanceMap.length > 0) {
    instanceMap.forEach((item, index) => {
      item.renderStyle(index + 1);
    });
  }
};

instance.success = function (msg) {
  createComponent("success", msg);
};
instance.error = function (msg) {
  createComponent("error", msg);
};
instance.warning = function (msg) {
  createComponent("warning", msg);
};
instance.tips = function (msg) {
  createComponent("tips", msg);
};

instance.install = function (Vue) {
  Vue.prototype.$message = instance;
};
export default instance;
