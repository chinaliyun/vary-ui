---
pageClass: custom-page-class
---

# Table 表格

## 基础用法

`columns`属性用来定义表格的`列`, `data`用来定义表格的`行`

<br/>

<Table-Base/>

<<< ./src/.vuepress/components/Table/Base.vue

## 完整的边框

`border`属性会给表格添加完整的边框

<br/>
<Table-Border/>

```html
<var-table :columns="columns" :data="data" border></var-table>
```

## 单元格内容的对齐方式

默认情况下, 单元格的内容都靠左对齐, 也可以通过 prop 的`center, right`来控制它们统一居中对齐, 或者右对齐

<br/>
<Table-Align/>

```html
<var-table :columns="columns" :data="data" border center></var-table>
<br />
<var-table :columns="columns" :data="data" border right></var-table>
```

需要注意的是: 如果单元格使用了插槽, 内容的对齐方式将完全由用户自行定义

## 列的宽度

默认情况下,每一列会按照表格的总体宽度,自动扩展, 组件支持通过`columns.width`设置单个列的宽度

<br/>
<Table-Width/> -->

<<< ./src/.vuepress/components/Table/Width.vue

## 固定列

组件支持指定某些列固定在表格左侧或者右侧, 可以通过`columns[].fixed`来设置

<br/>

<Table-Scroll/>

<<< ./src/.vuepress/components/Table/Scroll.vue

## 动态插槽

组件提供中动态化的插槽, 用来方便用户自定义表头与单元格内容, 下面的案例中, 通过`#prop`来自定义单元格的内容, 通过`#prop_th`来自定义表头的内容

<br/>

<Table-Slot/>

<<< ./src/.vuepress/components/Table/Slot.vue

## 快速修改样式

组件提供了组件级别的`headStyle,rowStyle`用来自定义全局的`th,td`样式, 也可以通过`columns[].headStyle, columns[].rowStyle`来自定义当前列的`th,td`样式

注意: 虽然我们提供了`headStyle, rowStyle`来快速定义样式, 但它只是我们提供的一个快接入口, 如果你的样式比较复杂,请尽可能使用插槽来实现. 另外, 我们推荐修改全局的 `scss` 变量来设置组件的主题颜色. 能够达到快速修改全局主题样式的目的

<br/>

<Table-Style/>

<<< ./src/.vuepress/components/Table/Style.vue

## props

| name         | default | desc                   |
| ------------ | ------- | ---------------------- |
| `columns`    | []      | 定义表格的`列`         |
| `data `      | []      | 定义表格每`行`的数据   |
| `border `    | []      | 是否显示完整的边框     |
| `center `    | []      | 定义单元格内容水平居中 |
| `right `     | []      | 定义单元格内容靠右对齐 |
| `headStyle ` | []      | 定义所有 th 部分的样式 |
| `rowStyle `  | []      | 定义所有 td 部分的样式 |

## columns

| name         | default | desc                                                            |
| ------------ | ------- | --------------------------------------------------------------- |
| `prop`       | ""      | 定义该列从 `data` 的哪个字段中获取默认的显示内容                |
| `label `     | ""      | 定义该列表头的文字内容                                          |
| `fixed `     | ""      | 定义该列是否固定显示,`left`表示固定到左侧,`right`表示固定到右侧 |
| `width `     | ""      | 定义单元格内容水平居中                                          |
| `headStyle ` | {}      | 定义该列 th 部分的样式                                          |
| `rowStyle `  | {}      | 定义该列 td 的样式                                              |

## slots

| name        | desc                   |
| ----------- | ---------------------- |
| `empty`     | 定义无数据时的显示内容 |
| `动态slot ` | 定义`th, td`部分的内容 |
