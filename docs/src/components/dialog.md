---
pageClass: custom-page-class
---

# Dialog 弹出框

## 基础用法

下方案例中, `title`属性用来设置弹窗的标题,`visible`属性用来控制弹出框的显示与隐藏, `close-on-mask`属性用来允许点击遮罩层的时候关闭弹窗, 但是`close-on-mask`必须与`:visible.sync`配合使用才能生效

<br/>
<Dialog-Base/>

<<< ./src/.vuepress/components/Dialog/Base.vue

## props

| prop        | 默认值 | 说明                           |
| ----------- | ------ | ------------------------------ |
| visible     | false  | 设置弹窗的显示状态             |
| title       | ""     | 设置弹窗标题                   |
| closeOnMask | false  | 设置是否允许点击遮罩层关闭弹窗 |

## methods

| name  | 默认值 | 说明           |
| ----- | ------ | -------------- |
| close | null   | 弹出框关闭事件 |
