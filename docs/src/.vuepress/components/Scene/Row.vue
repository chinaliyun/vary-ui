<template>
  <div class="code_wrapper">
    <var-scene class="line" row>
      <var-scene class="child" lg="1" md="2" sm="3" xs="2">
        没有设置宽度的元素
      </var-scene>
      <var-scene class="child" lg="1" md="2" sm="3" xs="2">
        没有设置宽度的元素
      </var-scene>
      <var-scene class="child" lg="1" md="2" sm="3" xs="2">
        没有设置宽度的元素
      </var-scene>
      <var-scene class="child" lg="1" md="2" sm="3" xs="2">
        没有设置宽度的元素
      </var-scene>
      <var-scene class="child" lg="1" md="2" sm="3" xs="2">
        没有设置宽度的元素
      </var-scene>
      <var-scene class="child" lg="1" md="2" sm="3" xs="2">
        没有设置宽度的元素
      </var-scene>
    </var-scene>
    <br />
  </div>
</template>
<script>
export default {
  name: "SceneRow",
};
</script>
<style lang="scss" scoped>
.line {
  background-color: rgb(240, 240, 240);
  .child {
    border: 1px solid rgb(161, 152, 238);
  }
}
</style>