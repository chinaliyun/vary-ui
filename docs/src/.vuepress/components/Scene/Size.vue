<template>
  <div class="code_wrapper">
    <var-scene w="200" class="line">设置宽度200px</var-scene>
    <br />
    <var-scene w="50%" class="line">设置宽度50%</var-scene>
    <br />
    <var-scene w="20vw" class="line">设置宽度20vw</var-scene>
    <br />
    <var-scene h="50" class="line">设置高度50px</var-scene>
    <br />
    <var-scene h="4em" class="line">设置高度4em</var-scene>
    <br />
    <var-scene h="10vh" class="line">设置高度10vh</var-scene>
  </div>
</template>
<script>
export default {
  name: "SceneSize",
};
</script>
<style lang="scss" scoped>
.line {
  background-color: rgb(238, 238, 238);
  height: 30px;
}
</style>