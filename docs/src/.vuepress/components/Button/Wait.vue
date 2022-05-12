<template>
  <var-button primary @click="log">
    点击后请在打开控制台查看防抖效果
  </var-button>
</template>
<script>
export default {
  name: "ButtonWait",
  methods: {
    log() {
      console.log(1);
    },
  },
};
</script>