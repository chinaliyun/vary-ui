---
pageClass: custom-page-class
---

# Textarea 多行文本输入框

## 基础用法

以下案例中展示了如何进行数据的双向绑定, 以及通过`w,h`快速指定组件宽高尺寸, 还有通过`prefix,suffix`指定组件的前后插槽

<br/>

<Textarea-Base/>

<<< ./src/.vuepress/components/Textarea/Base.vue

## props

| name          | default | desc             |
| ------------- | ------- | ---------------- |
| `w,width`     | null    | 定义组件宽度     |
| `h,height`    | null    | 定义组件高度     |
| `placeholder` | null    | 定义提示语       |
| `disabled`    | null    | 定义组件是否可用 |

## methods

| name     | desc                 |
| -------- | -------------------- |
| `focus`  | 组件获得焦点事件     |
| `blur`   | 组件失去焦点事件     |
| `change` | 组件的值发生改变事件 |

## slots

| name     | desc     |
| -------- | -------- |
| `prefix` | 前置插槽 |
| `suffix` | 后置插槽 |
