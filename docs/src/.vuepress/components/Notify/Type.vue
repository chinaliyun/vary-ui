<template>
  <div>
    <var-button @click="notify('success')" primary
      >点击打开 success 类型弹窗</var-button
    >
    <var-button @click="notify('warning')" primary>
      点击打开 warning 类型弹窗
    </var-button>
    <var-button @click="notify('error')" primary>
      点击打开 error 类型弹窗
    </var-button>
    <var-button @click="notify('tips')" primary>
      点击打开 tips 类型弹窗
    </var-button>
  </div>
</template>
<script>
export default {
  name: "AlertType",
  methods: {
    notify(type) {
      this.$notify[type]({
        title: "提示:",
        content: "您有新的消息",
      });
    },
  },
};
</script>