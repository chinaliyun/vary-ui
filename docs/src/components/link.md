---
pageClass: custom-page-class
---

# Link 按钮

## 基础用法

<br/>
<Link-Base/>

<<< ./src/.vuepress/components/Link/Base.vue

## 添加防抖功能

与 button 一样, 本组件默认支持了 800 毫秒的防抖功能, 也可以通过`wait`属性自行定义防抖时间,

<br/>
<Link-Wait/>

<<< ./src/.vuepress/components/Link/Wait.vue

## 禁用状态

通过`disabled`属性设置 link 的禁用状态,注意: `disabled`的样式优先级会高于`primary,error,tips,warning`样式

<br/>
<Link-Disabled/>

<<< ./src/.vuepress/components/Link/Disabled.vue

## 前置插槽

在某些状态下, 可能需要为`link`添加前置的 icon, 所以我们提供了`prefix`插槽

## props

| name     | 默认值 | 说明            |
| -------- | ------ | --------------- |
| primary  | false  | 主按钮风格      |
| warning  | false  | 警告风格按钮    |
| error    | false  | 错误风格的按钮, |
| success  | false  | 成功风格的按钮  |
| disabled | false  | 设置禁用状态    |
| wait     | 800    | 防抖间隔时间    |

## slots

| name    | 说明         |
| ------- | ------------ |
| default | 默认插槽     |
| prefix  | 按钮前缀插槽 |

## events

| name  | 说明     |
| ----- | -------- |
| click | 点击事件 |
