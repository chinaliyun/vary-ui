<template>
  <div class="code_wrapper">
    <var-scene class="line" p="20"> 四个方向都被设置为20px的内边距 </var-scene>
    <br />
    <br />
    <var-scene class="line" pl="20">左侧内边距20px</var-scene>
    <br />
    <br />
    <var-scene class="line" pr="20" pl="20">左右侧内边距20px</var-scene>
    <br />
    <br />
    <var-scene class="line" pt="20">顶部内边距20px</var-scene>
    <br />
    <br />
    <var-scene class="line" pt="20" pb="20">上下两侧内边距20px</var-scene>
  </div>
</template>
<script>
export default {
  name: "ScenePadding",
};
</script>
<style lang="scss" scoped>
.line {
  display: inline-block;
  background-color: rgb(238, 238, 238);
}
</style>