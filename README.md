# Vary UI

Vary UI 是基于 Vue2 实现的一套 UI 组件库

## 全局安装及使用

```js
import Vue from "vue";
import VaryUI from "vary-ui";
Vue.use(VaryUI);
import "vary-ui/dist/vary-ui.css";
```

## 局部引用

```js
import Vue from "vue";
import { Button, Link } from "vary-ui";

Vue.use(Button);
Vue.use(Link);
import "vary-ui/dist/vary-ui.css";
```
