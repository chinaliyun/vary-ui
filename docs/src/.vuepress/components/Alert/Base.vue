<template>
  <div>
    <var-button @click="alert" primary>点击打开弹窗</var-button>
  </div>
</template>
<script>
export default {
  name: "AlertBase",
  methods: {
    async alert() {
      try {
        await this.$alert({
          title: "提示:",
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