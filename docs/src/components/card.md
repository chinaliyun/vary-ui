---
pageClass: custom-page-class
---

# Card 卡片

## 基础用法

`title`属性用来设置卡片的标题, `shadow`用来打开卡片的阴影效果

<br/>
<Card-Base/>

<<< ./src/.vuepress/components/Card/Base.vue

## 副标题插槽

组件提供了`subtitle`插槽, 作为卡片的副标题, 要注意的是: 副标题插槽不提供任何样式, 所有的样式都由用户定义

<br/>

<Card-SubTitle/>

<<< ./src/.vuepress/components/Card/SubTitle.vue

## props

| name   | 默认值 | 说明         |
| ------ | ------ | ------------ |
| title  | null   | 标题         |
| shadow | false  | 是否打开阴影 |

## slots

| name     | 默认值 | 说明       |
| -------- | ------ | ---------- |
| default  | null   | 卡片内容   |
| subtitle | null   | 副标题插槽 |
