---
pageClass: custom-page-class
---

# Upload 文件上传

文件上传组件仅包括上传的触发, 文件类型的校验等基础功能, 具体的上传逻辑必须通过`upload`来指定, 在本组件中, 上传组件的样式也是可以通过默认插槽自行定义的

## 基础用法

这是一个基础 demo, `progress`属性用来展示默认的上传进度条, 在这个 demo 中, 并没有指定`upload`属性, 组件本身使用了一个模拟的上传函数, 来配合`progress`熟悉展示进度条效果

<br/>

<Upload-Base/>

<<< ./src/.vuepress/components/Upload/Base.vue

## 实际应用

在实际案例中, 当用户传递了`upload`属性, 会把用户选择的所有文件`UploadFileList`当做参数, 传递给`upload`函数, `FileList`的内容如下:

```js
[
  {
    file: "具体的文件",
    progress: function (p) {
      // 如果想组件内置的进度条, 需要调用这个方法传入上传进度, p的范围是0~1
    },
  },
];
```

<br/>

<Upload-Case/>

<<< ./src/.vuepress/components/Upload/Case.vue

## 从组件外部触发上传

在某些情况下, 可能需要通过模拟点击的方式触发上传事件, 本组件也提供了`trigger`方法来实现这个目的, `upload`属性在绑定函数时, 第一个参数是`UploadFileList`, 第二个参数中的`isTrusted`表示了当前触发选择文件的行为是用户行为, 还是`trigger`行为

```js
methods:{
  upload(files, options){
    if(options.isTrusted){
      // 用户行为
    }else{
      // trigger行为
    }
  }
}
```

## props

| name       | default        | desc                                                             |
| ---------- | -------------- | ---------------------------------------------------------------- |
| `accept`   | `*`            | 限制文件选择类型                                                 |
| `multiple` | false          | 定义组件是否允许选择多个文件, 也可以制定数字来限制选择文件的数量 |
| `progress` | false          | 定义组价是否显示默认的上传进度条                                 |
| `disabled` | false          | 定义组件是否可用                                                 |
| `upload`   | `function(){}` | 定义具体的上传函数                                               |

## methods

| name     | desc                                                            |
| -------- | --------------------------------------------------------------- |
| `cancel` | 打开选择文件框,用户又点击了取消按钮时会触发该事件               |
| `error`  | 检测到文件类型不在指定范围内,或者超出文件数量限制时会触发该事件 |

## slots

| name      | desc               |
| --------- | ------------------ |
| `default` | 替换默认的上传样式 |
