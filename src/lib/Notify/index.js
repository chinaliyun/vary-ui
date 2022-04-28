import Vue from "vue";
import Notify from "./src/Notify";

let nextInstance = [];
let instanceMap = [];
let top = 20;
const createComponent = function (type, options) {
  top = 20;
  const { title, content, buttonText, buttonCallback, meta } = options;
  // 限制用户传参类型
  const realOptions = {
    title,
    content,
    buttonText,
    buttonCallback,
    meta, // 用于保存额外数据, 点击按钮时,会传给回调函数
  };
  if (title.trim() === "" || content.trim() === "") {
    throw new Error(
      "title and content option can not be empty in Notify component "
    );
  }
  if (
    buttonCallback &&
    Object.prototype.toString
      .call(buttonCallback)
      .slice(-9, -1)
      .toLowerCase() !== "function"
  ) {
    throw new Error(
      "buttonCallback  option must be a function in Notify component "
    );
  }

  instanceMap.forEach((item) => {
    top += item.$el.getBoundingClientRect().height + 20;
  });
  const Component = Vue.extend(Notify);
  const instance = new Component();

  realOptions.top = top;
  instance.init(type, realOptions);

  const el = instance.$mount().$el;

  document.body.appendChild(el);
  const elHeight = el.getBoundingClientRect().height + 20;
  console.log("create", el, el.getBoundingClientRect());
  if (top + elHeight > window.innerHeight) {
    // 如果新增的弹窗,位置在可视区域之外, 照样把他放进队列中 但是要先移除该弹窗
    nextInstance.push({
      type,
      realOptions,
    });
    document.body.removeChild(el);

    return;
  }
  instanceMap.push(instance);
  instance.show();

  realOptions.remove = function () {
    console.log("remove", elHeight);
    document.body.removeChild(el);
    const currentIndex = instanceMap.findIndex(
      (item) => item._uid === instance._uid
    );
    instanceMap = instanceMap.filter((item) => item._uid !== instance._uid);
    resetStyle(elHeight, currentIndex);
    if (nextInstance.length > 0) {
      createComponent(nextInstance[0].type, nextInstance[0].realOptions);
      nextInstance = nextInstance.slice(1);
    }
  };
  return instance;
};

function instance(options) {
  createComponent("success", options);
}

const resetStyle = function (elHeight, currentIndex) {
  console.log("resetStyle", elHeight, currentIndex);
  if (instanceMap.length > 0) {
    instanceMap.forEach((item, itemIndex) => {
      if (itemIndex >= currentIndex) {
        item.renderStyle(elHeight);
      }
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
  Vue.prototype.$notify = instance;
};
export default instance;
