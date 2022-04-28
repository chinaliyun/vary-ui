import Field from './src/Field';

/* istanbul ignore next */
Field.install = function (Vue) {
  Vue.component(Field.name, Field);
};

export default Field;
