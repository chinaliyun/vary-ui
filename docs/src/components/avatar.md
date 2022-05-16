---
pageClass: custom-page-class
---

# Avatar 头像

## 基础用法

<br/>

<Avatar-Base/>

<<< ./src/.vuepress/components/Avatar/Base.vue

## 自定义尺寸

默认的头像尺寸是 80px, 可以通过 `size`属性自定义尺寸

<br/>

<Avatar-Size/>

<<< ./src/.vuepress/components/Avatar/Size.vue

## props

| prop    | 默认值 | 说明                                                                          |
| ------- | ------ | ----------------------------------------------------------------------------- |
| src     | null   | 头像地址                                                                      |
| default | null   | 默认头像地址, 如果 src 加载失败, 且 default 有值的情况下, 会加载 default 头像 |
| size    | 80px   | 定义头像的尺寸,                                                               |
| alt     | null   | 同 `img`元素的`alt`属性                                                       |
