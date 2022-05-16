---
pageClass: custom-page-class
---

# Field 表单控件

## 基础用法

`label`属性用来设置表单的标题, `required`用来表示该表单属于必填项

<br/>
<Field-Base/>

<<< ./src/.vuepress/components/Field/Base.vue

## 排列方向

默认情况下, `label`与`slot`,`提示语`三者是横向排列的, 如果希望他们垂直排列, 可以使用`vertical`属性

<br/>

<Field-Vertical/>

<<< ./src/.vuepress/components/Field/Vertical.vue

## label 的尺寸与位置

`label-width`属性可以设置`label`部分的宽度, 支持所有的 CSS 常见尺寸单位, 默认情况下, `label`内的文字是靠左对齐的, `center,right`可以设置`label`居中或者靠右对齐

<br/>

<Field-Size/>

<<< ./src/.vuepress/components/Field/Size.vue

水平排列的情况下, `label` 与实际控件在水平方向上是居中对齐的, 但是在某些情境下, 需要`label`与控件顶部对齐, 为此, 组件也提供了`top`属性来实现这个功能(`vertical` 模式下,该属性是无效的)

<br/>

<Field-Top/>

<<< ./src/.vuepress/components/Field/Top.vue

## props

| name        | 默认值 | 说明                                                   |
| ----------- | ------ | ------------------------------------------------------ |
| vertical    | null   | 设置表单名称, 内容, 错误信息,垂直排列显示              |
| required    | null   | 设置当前表单是否必填, 该选项仅做展示提示, 无任何逻功能 |
| label       | null   | 表单名称                                               |
| label-width | null   | 设置 label 的宽度                                      |
| left        | true   | 设置 label 中的文字左对齐                              |
| right       | false  | 设置 label 中的文字右对齐                              |
| center      | false  | 设置 label 中的文字居中对齐                            |
| err         | false  | 设置错误信息                                           |
| msg         | false  | 设置提示信息                                           |

## slots

| name    | 默认值 | 说明     |
| ------- | ------ | -------- |
| default | null   | 表单内容 |
