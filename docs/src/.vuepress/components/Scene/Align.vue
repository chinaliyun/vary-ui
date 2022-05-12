<template>
  <div class="code_wrapper">
    <var-scene class="line" flex right center>
      <p>第1行</p>
      <p>第2行</p>
      <p>靠右侧垂直居中对齐</p>
    </var-scene>
    <br />
    <var-scene class="line" flex right bottom>
      <p>第1行</p>
      <p>第2行</p>
      <p>靠右侧底部对齐</p>
    </var-scene>
    <br />
    <var-scene class="line" flex center middle>
      <p>第1行</p>
      <p>第2行</p>
      <p>垂直和水平都居中对齐</p>
    </var-scene>
  </div>
</template>
<script>
export default {
  name: "SceneAlign",
};
</script>
<style lang="scss" scoped>
.line {
  background-color: rgb(240, 240, 240);
  height: 50px;
}
</style>