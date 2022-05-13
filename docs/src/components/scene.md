---
pageClass: custom-page-class
---

# Scene 布局

`Scene`组件在没有添加任何 props 的时候 相当于一个空白的`div`,

<Scene-Empty/>

<<< ./src/.vuepress/components/Scene/Empty.vue

## 设置宽高尺寸

Scene 组件支持快速为元素设置尺寸, 纯数字会默认当做`px`单位, 支持`px|rem|em|vh|vw|%`等单位

<Scene-Size/>

<<< ./src/.vuepress/components/Scene/Size.vue

## 设置内边距

Scene 组件支持快速为元素添加内边距

<Scene-Padding/>

<<< ./src/.vuepress/components/Scene/Padding.vue

## flex 布局

`Vary-scene`元素添加`flex`属性后, 相当于给元素添加了`display:flex`样式

<Scene-Flex/>

<<< ./src/.vuepress/components/Scene/Flex.vue

## 水平对齐方式

flex 布局中, UI 库提供了几种基础的对齐方式:

| prop 属性 | 相当于 CSS 属性:              |
| --------- | ----------------------------- |
| left      | justify-content:flex-start    |
| center    | justify-content:center        |
| right     | justify-content:flex-end      |
| around    | justify-content:space-around  |
| between   | justify-content:space-between |
| evenly    | justify-content:space-evenly  |

<Scene-AlignX/>

<<< ./src/.vuepress/components/Scene/AlignX.vue

<Scene-Arround/>

<<< ./src/.vuepress/components/Scene/Arround.vue

## 垂直对齐方式

`middle`可以让所有的子元素在垂直方向上居中显示, 会自动为元素添加`align-content:center; align-items:center`样式属性

<Scene-AlignY/>

<<< ./src/.vuepress/components/Scene/AlignY.vue

## 组合对齐方式

<Scene-Align/>

<<< ./src/.vuepress/components/Scene/Align.vue

## 控制子元素排列方向

`column`属性可以控制 flex 布局的方向, 相当于添加了`flex-direction:column`样式

<Scene-Direction/>

<<< ./src/.vuepress/components/Scene/Direction.vue

## 允许子元素扩展宽度

`fill`属性, 该 具备 flex 属性的元素的所有子元素都会被添加`flex-grow:1`的样式;

<Scene-Fill/>

<<< ./src/.vuepress/components/Scene/Fill.vue

## 允许元素本身扩展宽度

`grow`属性会为元素**本身**添加`flex-grow:1`的属性, 也可以为`grow`属性赋值, 比如`grow=2`相当于给元素添加了`flex-grow:2`的样式属性

<Scene-Grow/>

<<< ./src/.vuepress/components/Scene/Grow.vue

## 禁止元素扩展/缩放

`fixed`属性可以设置元素在 flex 布局中始终保持自己的宽度, 该属性会为元素添加`flex-shrink:0;flex-grow:0`的样式属性

<Scene-Fixed/>

<<< ./src/.vuepress/components/Scene/Fixed.vue

## 栅格化响应式布局

Scene 组件提供了 6 种基础网格化布局的属性, 能满足大部分场景的网格化布局需求, 网格化布局的父级元素必须有`row`属性)

| 前缀 | 尺寸               |
| ---- | ------------------ |
| xs   | media query > 768  |
| sm   | media query > 992  |
| md   | media query > 1190 |
| lg   | media query > 1440 |

下面的案例中

```
可视区域大于1440宽时, 单个元素占据1/6的宽度
可视区域大于1190宽时, 单个元素占据2/6的宽度
可视区域大于960宽时, 单个元素占据3/6的宽度
可视区域大于768宽时, 单个元素占据4/6的宽度
可视区域小于768宽时, 单个元素占据6/6的宽度
```

<Scene-Row/>

<<< ./src/.vuepress/components/Scene/Row.vue
