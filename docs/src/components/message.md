---
pageClass: custom-page-class
---

# Message 提示弹窗

## 基础用法

`message`已经绑定到`Vue.prototype.$message`属性中, 代码中可以直接通过`this.$message`显示弹窗

<br/>

<Message-Base/>

<<< ./src/.vuepress/components/Message/Base.vue

## 弹窗类型

与`Alert`一样, `Message`组件也提供了几种常见的弹窗样式`success(默认), error, warning, tips`, 分别通过`this.$message.success, this.$message.error, this.$message.warning, this.$message.tips`来调用

<br/>

<Message-Type/>

<<< ./src/.vuepress/components/Message/Type.vue
