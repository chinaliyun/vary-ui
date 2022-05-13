---
pageClass: custom-page-class
---

# Checkbox 复选框

## 基础用法

基础用法很简单, 直接通过`v-model`绑定一个布尔值类型的属性即可.

<br/>
<Checkbox-Base/>

<<< ./src/.vuepress/components/Checkbox/Base.vue

## 复选框组

当出现多个复选框选项时, `v-model`的需要绑定一个数组类型的属性

<br/>
<Checkbox-Group/>

<<< ./src/.vuepress/components/Checkbox/Group.vue

## 半选状态

通过 `uncertain`属性可以设置复选框为半选状态, 半选状态再次点击会切换为选中状态

<br/>
<Checkbox-Uncertain/>

<<< ./src/.vuepress/components/Checkbox/Uncertain.vue

## props

| name      | 默认值 | 说明                                                     |
| --------- | ------ | -------------------------------------------------------- |
| disabled  | false  | 禁用当前复选框                                           |
| readonly  | false  | 设置为只读状态                                           |
| label     | false  | 当 v-model 中绑定数组类型的时候,这个值决定了数组中的元素 |
| uncertain | false  | 设置为不确定状态                                         |

## slots

| name    | 说明                     |
| ------- | ------------------------ |
| default | 复选框对应的文字描述信息 |

## events

| name   | 说明                         |
| ------ | ---------------------------- |
| change | 复选框的选中状态发生改变事件 |
