import Space from "./src/Space";

/* istanbul ignore next */
Space.install = function (Vue) {
  Vue.component(Space.name, Space);
};

export default Space;
