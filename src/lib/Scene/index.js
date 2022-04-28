import Scene from './src/Scene';

/* istanbul ignore next */
Scene.install = function (Vue) {
  Vue.component(Scene.name, Scene);
};

export default Scene;
