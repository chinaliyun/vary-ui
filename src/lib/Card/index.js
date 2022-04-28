import Card from './src/Card';

/* istanbul ignore next */
Card.install = function (Vue) {
  Vue.component(Card.name, Card);
};

export default Card;
