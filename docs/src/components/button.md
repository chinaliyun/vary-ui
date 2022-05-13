---
pageClass: custom-page-class
---

# Button 按钮

## 基础用法

<br/>
<Button-Base/>

<<< ./src/.vuepress/components/Button/Base.vue

## 边框风格的按钮

通过给组件添加`border`属性 , 可以显示为边框风格式的按钮

<br/>
<Button-Border/>

<<< ./src/.vuepress/components/Button/Border.vue

## 设置按钮宽度

按钮默认的宽度是被内容撑开的, 可以通过`width`属性直接给按钮设置宽度, 它的值可以是任何有效的 css 单位

<br/>
<Button-Width/>

<<< ./src/.vuepress/components/Button/Width.vue

如果实在希望把按钮设置为`块元素`,可以通过`:style="display:'block'"`或者通过 SFC 来实现

## 添加防抖功能

前端几乎大部分的按钮,在它的逻辑功能上都需要做防抖处理, 防止用户多次连续触发, 本组件默认支持了 800 毫秒的防抖功能, 也可以通过`wait`属性自行定义防抖时间,

<br/>
<Button-Wait/>

<<< ./src/.vuepress/components/Button/Wait.vue

## 禁用状态

通过`disabled`属性设置按钮的禁用状态,注意: `disabled`的样式优先级会高于`primary,error,tips,warning`样式

<br/>
<Button-Disabled/>

<<< ./src/.vuepress/components/Button/Disabled.vue

## 前置插槽

在某些状态下, 可能需要为`button`添加前置的 icon, 所以我们提供了`prefix`插槽

## props

| name        | 默认值 | 说明            |
| ----------- | ------ | --------------- |
| primary     | false  | 主按钮风格      |
| warning     | false  | 警告风格按钮    |
| error       | false  | 错误风格的按钮, |
| success     | false  | 成功风格的按钮  |
| border      | false  | 带边框的按钮    |
| disabled    | false  | 设置禁用状态    |
| wait        | 800    | 防抖间隔时间    |
| `w , width` | null   | 设置按钮宽度    |

## slots

| name    | 说明         |
| ------- | ------------ |
| default | 默认插槽     |
| prefix  | 按钮前缀插槽 |

## events

| name  | 说明     |
| ----- | -------- |
| click | 点击事件 |
