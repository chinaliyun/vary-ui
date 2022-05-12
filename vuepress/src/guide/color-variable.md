# 设置颜色变量

`Vary-ui`中所有需要使用颜色的地方, 都采用了颜色变量, 这些颜色变量 UI 库本身是没有定义的, 需要使用本 UI 库的项目, 都需要提前定义这些变量, 项目中可以通过修改这些变量的值, 来批量修改组件主题色

```scss
$main-color: #ff6633; // 主色
$main-color2: #3d7fff; // 辅助色

$border-color: #dadada; // 边框主色
$border-color2: #f0f2f5; // 边框辅助色

$font-color: #262626; // 文字主色
$font-color2: #666; // 文字辅助色
$font-color3: #999; // 文字辅助色

$primary-color: #ff6633; // 主色
$success-color: #38bd0e; // 成功
$warning-color: #ffa217; // 警告
$error-color: #ff2200; // 错误
$tips-color: #909399; // 信息

$link-color: #3d7fff;
```

## Nuxt 项目中定义颜色变量

创建一个保存颜色变量的文件`/assets/style/variable.scss`,[参考文档](https://nuxtjs.org/docs/configuration-glossary/configuration-build/#styleresources)

```js
// nuxt.config.js
export default {
  build: {
    styleResources: {
      scss: ["assets/style/variable.scss"],
    },
  },
};
```

## Vue 项目中定义颜色变量

创建一个保存颜色变量的文件`/src/variable.scss`,在`vue.config.js`中通过`webpack`引入该文件

```js
export default {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/main.scss";`,
      },
    },
  },
};
```
