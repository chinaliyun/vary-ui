---
pageClass: custom-page-class
---

# 设置颜色变量

`vary-ui`中所有需要使用颜色的地方, 都采用了颜色变量, 这些颜色变量 UI 库本身是没有定义的, 需要使用本 UI 库的项目, 都务必在自己的项目中提前定义这些变量

```scss
$main-color: #ff6a00; // 主色
$main-color2: #3d7fff; // 辅助色

$border-color: #dadada; // 边框主色
$border-color2: #f0f2f5; // 边框辅助色

$font-color: #333; // 文字主色
$font-color2: #666; // 文字辅助色2
$font-color3: #999; // 文字辅助色3

$primary-color: #ff6a00; // 主色
$success-color: #38bd0e; // 成功
$warning-color: #ffa217; // 警告
$error-color: #ff2200; // 错误
$tips-color: #909399; // 信息

$input-error-color: #ff2200; // 输入框错误状态下的边框色
$link-color: #ff6a00;

$alert-color: $font-color; // 弹窗文字颜色
$alert-border-color: $border-color; // 弹窗边框色
$alert-confirm-background-color: $main-color; // 弹窗背景色

$button-color: $font-color2; // 按钮默认文字颜色
$button-background-color: $border-color2; // 按钮默认背景颜色
$button-primary-color: white; // primary 风格文字颜色
$button-primary-background-color: $primary-color; // primary 风格背景色
$button-warning-color: white; // warning 风格文字颜色
$button-warning-background-color: $warning-color; // warning 风格背景色
$button-error-color: white; // error 风格文字颜色
$button-error-background-color: $error-color; // error 风格背景色
$button-success-color: white; // success 风格文字颜色
$button-success-background-color: $success-color; // success 风格背景色
$button-disabled-background-color: $border-color2; // 禁用状态背景色

$card-border-color: $border-color; // card组件边框色

$checkbox-color: $border-color; // 复选框默认颜色
$checkbox-selected-color: $main-color; // 复选框被选中颜色

$field-tips-color: $tips-color; // 表单控件提示语颜色
$field-err-color: $error-color; // 表单控件错误提示语颜色

$input-color: $font-color; // 输入框默认文字颜色
$input-placeholder-color: $font-color3; // 输入框提示语颜色
$input-border-color: $border-color; // 提示框边框色
$input-border-focus-color: $border-color; // 提示框获得焦点颜色
$input-border-error-color: $error-color; // 输入框错误提示颜色
$input-background-color: white; // 输入框背景色
$input-disabled-color: $border-color2; // 输入框被禁用状态颜色
$input-option-arrow-color: $border-color; // 输入框选项的下级菜单箭头颜色
$input-option-border-color: $border-color; // 输入框选项的边框色

$picker-border-color: $border-color; // picker组件边框色
$picker-background-color: $border-color2; // picker组件背景色

$dialog-color: $main-color;
$dialog-border-color: $border-color; // 弹窗的边框色
$dialog-confirm-button-color: $primary-color; // 弹窗确认按钮的背景色
```
