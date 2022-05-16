<template>
  <div>
    <var-button @click="alert" primary>点击打开 success 类型弹窗</var-button>
    <var-button @click="alert('warning')" primary>
      点击打开 warning 类型弹窗
    </var-button>
    <var-button @click="alert('error')" primary>
      点击打开 error 类型弹窗
    </var-button>
    <var-button @click="alert('tips')" primary>
      点击打开 tips 类型弹窗
    </var-button>
  </div>
</template>
<script>
export default {
  name: "AlertType",
  methods: {
    async alert(type = "success") {
      try {
        await this.$alert[type]({
          title: `${type}类型的 Alert 确认框:`,
          content: "确定要删除当前文章吗",
          cancelText: "取消",
        });
        console.log("用户点击了确定按钮");
      } catch (error) {
        if (error.cancel) {
          console.log("用户通过取消按钮关闭了弹窗");
        }
        if (error.close) {
          console.log("用户通过点击遮罩层或者右上角的关闭按钮关闭了弹窗");
        }
      }
    },
  },
};
</script>