<template>
  <div>
    <var-button @click="message" primary>点击打开弹窗</var-button>
  </div>
</template>
<script>
export default {
  name: "AlertBase",
  methods: {
    message() {
      this.$message("文章删除成功");
    },
  },
};
</script>