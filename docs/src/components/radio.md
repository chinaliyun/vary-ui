---
pageClass: custom-page-class
---

# Radio 单选框控件

## 基础用法

<br/>

<Radio-Base/>

<<< ./src/.vuepress/components/Radio/Base.vue

## 控件状态改变事件

虽然使用组件的时候可以通过`@change`监听控件状态的变化, 但我们不建议使用该方法, 因为它只会在控件被选中时触发, 如果想监控控件所绑定的属性变化, 请在组件之外使用`watch`

## props

| name     | default | desc             |
| -------- | ------- | ---------------- |
| label    | ''      | 控件对应的真实值 |
| disabled | false   | 禁用控件         |
| readonly | false   | 设置控件只读     |
