<template>
  <var-scene flex middle>
    <var-button primary @click="log">
      点击后请在打开控制台查看防抖效果
    </var-button>
  </var-scene>
</template>
<script>
export default {
  methods: {
    log() {
      console.log(1);
    },
  },
};
</script>