export function debounce(fn, duration = 1000) {
  let timer = null;
  return function () {
    if (!timer) {
      fn.call(this, ...arguments);
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
      }, duration);
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
      }, duration);
    }
  };
}

export function throttle(fn, duration = 1000) {
  // 如果当前时间减去上次点击时间,少于duration,则重置定时器
  let last;
  let timer = null;
  let now;
  return function () {
    if (timer === null) {
      last = new Date().getTime();
      timer = setTimeout(() => {
        timer = null;
        fn.call(this, ...arguments);
      }, duration);
    } else {
      now = new Date().getTime();
      if (now - last <= duration) {
        clearTimeout(timer);
        last = now;
        timer = setTimeout(() => {
          timer = null;
          fn.call(this, ...arguments);
        }, duration);
      }
    }
  };
}

export function validateMobile(str) {
  // 检查手机号码格式
  return /^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[2567])|(17[1-8])|(18[0-9])|(19[1|3])|(19[5|6])|(19[8|9]))\d{8}$/.test(
    str
  );
}

export function isBoolean(target) {
  return (
    Object.prototype.toString.call(target).toLowerCase().slice(-8, -1) ===
    "boolean"
  );
}

export const config = (function () {
  let options = {};
  function init(v) {
    options = v;
  }
  function set(k, v) {
    options[k] = v;
  }
  function get(key) {
    return options[key];
  }
  return {
    get,
    set,
    init,
  };
})();
