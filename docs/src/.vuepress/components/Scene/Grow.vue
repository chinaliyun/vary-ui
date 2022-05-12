<template>
  <div class="code_wrapper">
    <var-scene class="line" flex>
      <var-scene w="100" class="child" grow> 100px宽的元素 </var-scene>
      <var-scene w="100" class="child" grow> 100px宽的元素 </var-scene>
    </var-scene>
    <br />
    <var-scene class="line" flex>
      <var-scene w="100" class="child" grow="1"> 100px宽的元素 </var-scene>
      <var-scene w="100" class="child" grow="2"> 100px宽的元素 </var-scene>
    </var-scene>
  </div>
</template>
<script>
export default {
  name: "SceneGrow",
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