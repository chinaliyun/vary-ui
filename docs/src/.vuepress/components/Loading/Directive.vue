<template>
  <div>
    <var-button primary @click="openLoading">点击打开loading</var-button>
    <br />
    <br />
    <div
      w="300"
      h="100"
      flex
      middle
      center
      v-loading="loading"
      loading-text="请稍等"
      class="comp_root"
    ></div>
  </div>
</template>
<script>
export default {
  name: "LoadingDirective",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    openLoading() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
  },
};
</script>
<style lang="scss" scoped>
.comp_root {
  width: 300px;
  height: 100px;
  background-color: antiquewhite;
}
</style>