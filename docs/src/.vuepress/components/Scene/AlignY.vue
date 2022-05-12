<template>
  <div class="code_wrapper">
    <var-scene class="line" flex top>
      <p>第1行</p>
      <p>第2行</p>
      <p>垂直顶对齐</p>
    </var-scene>
    <br />
    <var-scene class="line" flex middle>
      <p>第1行</p>
      <p>第2行</p>
      <p>垂直居中对齐</p>
    </var-scene>
    <br />
    <var-scene class="line" flex bottom>
      <p>第1行</p>
      <p>第2行</p>
      <p>垂直底对齐</p>
    </var-scene>
  </div>
</template>
<script>
export default {
  name: "SceneAlignY",
};
</script>
<style lang="scss" scoped>
.line {
  background-color: rgb(240, 240, 240);
  height: 50px;
}
</style>