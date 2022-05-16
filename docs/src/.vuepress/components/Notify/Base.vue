<template>
  <div>
    <var-button @click="notify" primary>点击打开弹窗</var-button>
  </div>
</template>
<script>
export default {
  name: "AlertBase",
  methods: {
    notify() {
      this.$notify({
        title: "提示:",
        content: "您有新的消息",
        buttonText: "知道了",
        buttonCallback: () => {
          console.log("用户点击了确定按钮");
        },
      });
    },
  },
};
</script>