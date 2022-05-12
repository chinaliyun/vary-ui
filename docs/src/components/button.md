---
pageClass: custom-page-class
---

# Button 按钮

## 基础用法

<Button-Base/>

<<< ./src/.vuepress/components/Button/Base.vue

## 边框风格的按钮

通过给组件添加`border`属性 , 可以显示为边框风格式的按钮

<Button-Border/>

<<< ./src/.vuepress/components/Button/Border.vue

## 设置按钮宽度

按钮默认的宽度, 采用的是`inline-block`, 但是可以通过`width`属性直接给按钮设置宽度, 它的值可以是任何有效的 css 单位

<Button-Width/>

<<< ./src/.vuepress/components/Button/Width.vue

## 添加防抖功能

前端几乎大部分的按钮,在它的逻辑功能上都需要做防抖处理, 防止用户多次连续触发, 本组件默认支持了 800 毫秒的防抖功能, 也可以通过`wait`属性自行定义防抖时间,

<Button-Wait/>

<<< ./src/.vuepress/components/Button/Wait.vue

## props

| prop    | 默认值 | 说明                                                                          |
| ------- | ------ | ----------------------------------------------------------------------------- |
| src     | null   | 头像地址                                                                      |
| default | null   | 默认头像地址, 如果 src 加载失败, 且 default 有值的情况下, 会加载 default 头像 |
| size    | 80px   | 定义头像的尺寸,                                                               |
| alt     | null   | 同 `img`元素的`alt`属性                                                       |
