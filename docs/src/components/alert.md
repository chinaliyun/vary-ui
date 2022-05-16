---
pageClass: custom-page-class
---

# Alert 提示弹窗

## 基础用法

`alert`已经绑定到`Vue.prototype.$alert`属性中, 代码中可以直接通过`this.$alert`显示弹窗, 弹窗会返回一个`Promise`对象, 用户可以通过该返回值, 判断用户的下一步操作

<br/>

<Alert-Base/>

<<< ./src/.vuepress/components/Alert/Base.vue

在上面的案例中, 当用户点击`确定`按钮后, 可以通过`Promise.resolve`事件, 当用户点击了遮罩层或者取消按钮后, 会通过`Promise.catch`事件, 而且可以通过`cancel:true`与`close:true`区分取消按钮关闭事件与用户点击遮罩层关闭事件

## 弹窗类型

`Alert`组件也提供了几种常见的弹窗样式`success(默认), error, warning, tips`, 分别通过`this.$alert.success, this.$alert.error, this.$alert.warning, this.$alert.tips`来调用

<br/>

<Alert-Type/>

<<< ./src/.vuepress/components/Alert/Type.vue

## options

| name        | default | desc                                           |
| ----------- | ------- | ---------------------------------------------- |
| title       | ''      | 弹窗标题                                       |
| content     | ''      | 弹窗内容                                       |
| confirmText | '确定'  | 确定按钮的文字                                 |
| cancelText  | ''      | 取消按钮的文字, 如果没有文字, 不会显示取消按钮 |
