<template>
  <div class="code_wrapper">
    <var-scene class="line" flex fill>
      <var-scene class="child" w="100"> 100px宽的元素 </var-scene>
      <var-scene class="child" w="100"> 100px宽的元素 </var-scene>
      <var-scene class="child" w="200" fixed> 200px宽的元素 </var-scene>
    </var-scene>
  </div>
</template>
<script>
export default {
  name: "SceneFixed",
};
</script>
<style lang="scss" scoped>
.line {
  background-color: rgb(240, 240, 240);
  height: 50px;
  .child {
    border: 1px solid rgb(161, 152, 238);
  }
}
</style>