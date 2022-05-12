---
pageClass: custom-page-class
---

# Preview 图片预览

## props

| prop    | type   | 是否必填 | desc                                                                                       |
| ------- | ------ | -------- | ------------------------------------------------------------------------------------------ |
| urls    | Array  | 是       | 图片路径的数组集合,`[src1, src2, src3]`                                                    |
| current | Number | -        | 默认展示的图片索引值, 从 0 开始, 如果 current 小于 0 或者超过了最大索引值,会展示第一张图片 |
| maxZoom | Number | -        | 最大缩放比例, 默认值为 5                                                                   |

## 非法路径拦截

传入的 url 参数中只处理`jpg|jpeg|png|gif`等格式的图片文件, 其他格式文件会被过滤掉

## 快捷键支持

组件支持使用上下箭头按键控制图片的切换

## 案例

<Preview-Base/>

<<< ./src/.vuepress/components/Preview/Base.vue

## 各种状态下的图例

![](../assets/preview/1.jpg)
![](../assets/preview/2.jpg)
![](../assets/preview/3.jpg)
