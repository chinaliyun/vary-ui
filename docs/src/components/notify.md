---
pageClass: custom-page-class
---

# Notify 通知弹窗

## 基础用法

`notify`已经绑定到`Vue.prototype.$notify`属性中, 代码中可以直接通过`this.$notify`显示弹窗,与`Alert`不同的是, `Notify`弹窗通过`buttonText,buttonCallback`来分别定义按钮的文字内容以及按钮的点击事件

<br/>

<Notify-Base/>

<<< ./src/.vuepress/components/Notify/Base.vue

## 弹窗类型

`Notify`组件也提供了几种常见的弹窗样式`success(默认), error, warning, tips`, 分别通过`this.$notify.success, this.$notify.error, this.$notify.warning, this.$notify.tips`来调用

<br/>

<Notify-Type/>

<<< ./src/.vuepress/components/Notify/Type.vue

## options

| name            | default | desc                                         |
| --------------- | ------- | -------------------------------------------- |
| title           | ''      | 弹窗标题                                     |
| content         | ''      | 弹窗内容                                     |
| buttonText      | ''      | 定义弹窗内的按钮文字,如果没有值,按钮不会显示 |
| buttonCalllback | ''      | 取定义按钮的点击事件                         |
