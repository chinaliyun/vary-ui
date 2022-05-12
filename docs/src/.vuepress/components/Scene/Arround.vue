<template>
  <div class="code_wrapper">
    <var-scene class="line" flex around>
      <var-scene w="200" class="child"> 200px宽的元素 </var-scene>
      <var-scene w="200" class="child"> 200px宽的元素 </var-scene>
      <var-scene w="200" class="child"> 200px宽的元素 </var-scene>
    </var-scene>
    <br />
    <var-scene class="line" flex between>
      <var-scene w="200" class="child"> 200px宽的元素 </var-scene>
      <var-scene w="200" class="child"> 200px宽的元素 </var-scene>
      <var-scene w="200" class="child"> 200px宽的元素 </var-scene>
    </var-scene>
    <br />
    <var-scene class="line" flex evenly>
      <var-scene w="200" class="child"> 200px宽的元素 </var-scene>
      <var-scene w="200" class="child"> 200px宽的元素 </var-scene>
      <var-scene w="200" class="child"> 200px宽的元素 </var-scene>
    </var-scene>
    <br />
  </div>
</template>
<script>
export default {
  name: "SceneAround",
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