# 引入组件库

```bash
yarn install vary-ui
```

## Nuxt 项目引入组件库

如果是在 Nuxt 项目中引用`vary-ui`组件库, 推荐在`plugin`目录中为`vary-ui`创建单独的插件, 然后在`nuxt.config.js`文件中引用它

```js
// /plugin/vary-ui.js
import Vue from "vue";
import VaryUI from "vary-ui";

Vue.use(VaryUI, {
  // options
});
```

`nuxt.config.js`中引入组件时, 一定要允许**在服务端渲染**, 否则`Nuxt`会警告服务端渲染的 DOM 与客户端 DOM 不一致; 除了引入该插件外, `vary-ui`中使用了大量的`ES6`语法, 所以引用的时候,需要指定该 UI 库使用`babel`编译

```js
// nuxt.config.js
export default {
  plugins: [
    {
      src: "~/plugins/vary-ui",
      ssr: true,
    },
  ];

  build: {
    transpile: ['vary-ui''],
  },
}
```

## Vue 项目引入组件库

如果是单纯的`Vue SPA`项目中引用该组件库, 直接在入口文件`main.js`中引入即可

```js
// main.js
import Vue from "vue";
import VaryUI from "vary-ui";

Vue.use(VaryUI, {
  // options
});
```
