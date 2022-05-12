---
pageClass: custom-page-class
---

# Field 表单域

## 基础用法

`title`属性用来设置卡片的标题, `shadow`用来打开卡片的阴影效果

<br/>
<Field-Base/>

<<< ./src/.vuepress/components/Field/Base.vue

## 副标题插槽

组件提供了`subtitle`插槽, 作为卡片的副标题, 要注意的是: 副标题插槽不提供任何样式, 所有的样式都由用户定义

<br/>

<Card-SubTitle/>

<<< ./src/.vuepress/components/Card/SubTitle.vue

## props

| name        | 默认值 | 说明                                      |
| ----------- | ------ | ----------------------------------------- |
| vertical    | null   | 设置表单名称, 内容, 错误信息,垂直排列显示 |
| required    | null   | 设置当前表单是否必填                      |
| label       | null   | 表单名称                                  |
| label-width | null   | 设置 label 的宽度                         |
| left        | true   | label 中的文字左对齐                      |
| right       | false  | 设置 label 中的文字右对齐                 |
| center      | false  | 设置 label 中的文字居中对齐               |
| err         | false  | 设置错误信息                              |
| msg         | false  | 设置提示信息                              |

## slots

| name    | 默认值 | 说明     |
| ------- | ------ | -------- |
| default | null   | 表单内容 |
