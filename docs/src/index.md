---
home: true
# tagline:
actionText: Quick Start →
actionLink: /components/install
# features:
#   - title: Feature 1 Title
#     details: Feature 1 Description
#   - title: Feature 2 Title
#     details: Feature 2 Description
#   - title: Feature 3 Title
#     details: Feature 3 Description
footer: Made by  with @二师兄
---

## 快速配置 CSS 样式的组件及属性

VaryUI 的部分组件提供了快速布局的功能, 只需要在组件上添加对应的 prop, 即可快速添加 CSS 样式, 开发过程中避免了频繁切换文件修改 CSS 样式的问题

```vue
<template>
  <var-scene w="100" h="200"> 一个宽100px, 高200px的元素</var-scene>
  <var-scene p="20"> 一个内边距20px的元素</var-scene>
</template>
```

## 更简洁的 prop 传参方法

VaryUI 组件提供更为简洁的 prop 属性, 不再需要背那些繁琐的属性名及属性值

```vue
<template>
  <var-scene flex left>
    <!--定义一个带有display:flex样式的元素, 且内部的元素会水平靠左对齐 -->
  </var-scene>

  <var-scene flex center>
    <!--定义一个带有display:flex样式的元素, 且内部的元素会水平居中对齐 -->
  </var-scene>

  <var-scene flex bottom>
    <!--定义一个带有display:flex样式的元素, 且内部的元素会垂直靠下对齐 -->
  </var-scene>
</template>
```

<div style="text-align:center;padding: 20px 0"><a href="/components/scene.html" style="font-size:20px;background: #36a573;color:white;padding:20px;border-radius:4px;min-width:300px">View Components</a></div>
<br/>
