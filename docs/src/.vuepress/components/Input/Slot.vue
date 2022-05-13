<template>
  <var-scene flex>
    <var-input v-model="name" w="300" clearable>
      <template #prefix=""><span class="span">价格</span></template>
      <template #suffix=""><span class="span">元</span></template>
    </var-input>
    <var-space w="10" />
    <var-input v-model="name" w="300" clearable>
      <template #prefix=""><span class="span">比例</span></template>
      <template #suffix=""><span class="span">%</span></template>
    </var-input>
  </var-scene>
</template>

<script>
export default {
  name: "InputBase",
  data() {
    return {
      name: "",
      percent: "",
    };
  },
};
</script>
<style scoped>
.span {
  font-size: 14px;
  color: rgb(81, 81, 81);
  padding: 0 10px;
}
</style>