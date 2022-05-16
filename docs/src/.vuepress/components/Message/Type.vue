<template>
  <div>
    <var-button @click="message" primary>点击打开 success 类型弹窗</var-button>
    <var-button @click="message('warning')" primary>
      点击打开 warning 类型弹窗
    </var-button>
    <var-button @click="message('error')" primary>
      点击打开 error 类型弹窗
    </var-button>
    <var-button @click="message('tips')" primary>
      点击打开 tips 类型弹窗
    </var-button>
  </div>
</template>
<script>
export default {
  name: "AlertType",
  methods: {
    message(type = "success") {
      this.$message[type](`${type}类型的message弹窗`);
    },
  },
};
</script>