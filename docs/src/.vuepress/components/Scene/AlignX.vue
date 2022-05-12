<template>
  <div class="code_wrapper">
    <var-scene class="line" flex center>
      <p>第1行</p>
      <p>第2行</p>
      <p>水平居中对齐</p>
    </var-scene>
    <br />
    <var-scene class="line" flex right>
      <p>第1行</p>
      <p>第2行</p>
      <p>水平右对齐</p>
    </var-scene>
    <br />
    <var-scene class="line" flex left>
      <p>第1行</p>
      <p>第2行</p>
      <p>左对齐</p>
    </var-scene>
  </div>
</template>
<script>
export default {
  name: "SceneAlignX",
};
</script>
<style lang="scss" scoped>
.line {
  background-color: rgb(240, 240, 240);
  height: 50px;
}
</style>