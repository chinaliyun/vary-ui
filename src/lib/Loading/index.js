import Vue from "vue";
import Loading from "./src/Loading";

let globalComponentInstance = null;

function createGlobalInstance(options, parentNode) {
  const component = Vue.extend(Loading);
  globalComponentInstance = new component();
  globalComponentInstance.init(options);
  const ele = globalComponentInstance.$mount().$el;

  globalComponentInstance.close = function () {
    globalComponentInstance.$destroy();
    parentNode.removeChild(ele);
    globalComponentInstance = null;
  };

  parentNode.appendChild(ele);
  return globalComponentInstance;
}

function createSingleInstance(options, parentNode) {
  const component = Vue.extend(Loading);
  let singleComponentInstance = new component();
  singleComponentInstance.init(options);
  const ele = singleComponentInstance.$mount().$el;

  let parentNodePositionValue = "";
  const parentNodeCss = window.getComputedStyle(parentNode);
  parentNodePositionValue = parentNodeCss.position;
  if (parentNodeCss.position == "static") {
    parentNode.style.position = "relative";
    ele.style.position = "absolute";
  }

  singleComponentInstance.close = function () {
    singleComponentInstance.$destroy();
    parentNode.removeChild(ele);
    singleComponentInstance = null;
    parentNode.style.position = parentNodePositionValue;
  };

  parentNode.appendChild(ele);
  return singleComponentInstance;
}
function createInstance(options = {}, parentNode = null) {
  if (parentNode) {
    return createSingleInstance(options, parentNode);
  } else {
    return createGlobalInstance(options, document.body);
  }
}

const instance = {
  install(Vue) {
    Vue.prototype.$loading = createInstance;
    Vue.directive("loading", {
      bind: (el, binding, vnode) => {
        console.log(el, binding, vnode);
      },
      update: (el, binding, vnode) => {
        if (!binding.value && el.$loading) {
          el.$loading.close();
          el.$loading = null;
          return;
        }
        if (binding.value && !el.$loading) {
          el.$loading = createInstance(
            { text: vnode.data.attrs["loading-text"] },
            el
          );
        }
      },
    });
  },
};

export default instance;
