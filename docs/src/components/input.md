---
pageClass: custom-page-class
---

# Input 输入框

## 基础用法

这是最基础的案例, `v-model`用来数据的双向绑定, `w`是`width`的简写, 用来指定输入框的宽度, 支持所有常用的 CSS 单位, `clearable`用来支持用户一键清空内容

<br/>
<Input-Base/>

<<< ./src/.vuepress/components/Input/Base.vue

## 前后插槽

除了输入框, 组件提供了前置与后置两个插槽, 用来适应某些情景下的样式, 需要注意的是, 插槽不会内置任何样式, 需要用户自行提供

<br/>
<Input-Slot/>

<<< ./src/.vuepress/components/Input/Slot.vue

## 错误警告状态

当`err`属性的值返回`true`时, 输入框会自动添加错误样式, 样式的颜色可以在全局变量中自行定义

<br/>
<Input-Error/>

<<< ./src/.vuepress/components/Input/Error.vue

## 限制输入格式

普通的`<input type='number'/>`会有默认两种限制: 1 是仅能输入数字, 2 是在移动端可以自动唤起输入法的数字键盘, 但是这种输入框右侧的箭头实在是太难看

默认状态下, 组件支持输入任何字符, 当`format`属性有值 且它的值满足`\d, .\d , \d.\d`三种模式时,会转为数字输入模式, 要注意的是:

> 这种模式只能限制输入数字, 不能自动唤起数字键盘.

<br/>
<Input-Format/>

<<< ./src/.vuepress/components/Input/Format.vue

## 输入框类型

组件支持`type`属性定义输入框类型, 但从经验来看, `input`在绝大部分情况下, 只有`text,number,password`是比较常用的`type`值, 所以当你需要使用数字模式时, 再不考虑移动端的情况下, 尽可能通过`format`属性限制输入内容

<br/>
<Input-Type/>

<<< ./src/.vuepress/components/Input/Type.vue

## 输入框备选项

组件提供备选项功能, 如果传入了`data`属性, 当输入框获得焦点时, 会打开下拉框备选项

<br/>
<Input-Option/>

<<< ./src/.vuepress/components/Input/Option.vue

## props

| name        | 默认值 | 说明                                   |
| ----------- | ------ | -------------------------------------- |
| format      | ''     | 限制内容格式                           |
| type        | text   | 设置输入框类型                         |
| left        | true   | 设置 value 中的文字左对齐              |
| right       | false  | 设置 value 中的文字右对齐              |
| center      | false  | 设置 value 中的文字居中对齐            |
| maxlength   | false  | 设置输入框最大字符数量                 |
| disabled    | false  | 设置禁用状态                           |
| clearable   | false  | 设置是否显示一键清空按钮               |
| autofocus   | false  | 设置元素 mounted 后自动获取焦点        |
| err         | false  | 设置错误状态, 用于展示错误状态下的样式 |
| data        | false  | 设置下拉框数据                         |
| `w , width` | null   | 设置输入框宽度                         |

## methods

| name  | 默认值 | 说明                 |
| ----- | ------ | -------------------- |
| input | null   | 输入框 input 事件    |
| enter | null   | 在表单内按下了回车键 |
| blur  | null   | 输入框失去焦点事件   |
| focus | null   | 输入框获取焦点事件   |
