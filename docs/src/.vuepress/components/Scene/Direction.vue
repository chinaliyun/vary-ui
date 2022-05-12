<template>
  <div class="code_wrapper">
    <var-scene class="line" flex column middle>
      <p>第1行</p>
      <p>第2行</p>
      <p>flex-direction:column下的水平居中对齐</p>
    </var-scene>
  </div>
</template>
<script>
export default {
  name: "SceneDirection",
};
</script>
<style lang="scss" scoped>
.line {
  background-color: rgb(240, 240, 240);
  // height: 50px;
}
</style>