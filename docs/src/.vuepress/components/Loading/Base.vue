<template>
  <var-button primary @click="loading">点击打开loading</var-button>
</template>
<script>
export default {
  name: "LoadingBase",
  methods: {
    loading() {
      const loading = this.$loading({ text: "请稍等" });

      setTimeout(() => {
        loading.close();
      }, 3000);
    },
  },
};
</script>