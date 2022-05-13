<template>
  <var-input v-model="name" w="300" clearable>
    <template #prefix=""><var-scene p="10">价格</var-scene></template>
    <template #suffix=""><var-scene p="10">元</var-scene></template>
  </var-input>
</template>

<script>
export default {
  name: "InputBase",
  data() {
    return {
      name: "zhangsan",
    };
  },
};
</script>