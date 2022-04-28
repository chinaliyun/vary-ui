import Tree from './src/Tree';

/* istanbul ignore next */
Tree.install = function (Vue) {
  Vue.component(Tree.name, Tree);
};

export default Tree;
