import SmsCode from './src/SmsCode';

/* istanbul ignore next */
SmsCode.install = function (Vue) {
  Vue.component(SmsCode.name, SmsCode);
};

export default SmsCode;
