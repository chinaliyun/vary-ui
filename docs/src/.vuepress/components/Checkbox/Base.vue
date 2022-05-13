<template>
  <var-scene flex middle>
    <var-checkbox v-model="selected"></var-checkbox>
    <var-space w="10"></var-space>
    <div>{{ selected ? "被选中" : "未选中" }}</div>
  </var-scene>
</template>
<script>
export default {
  name: "CheckboxBase",
  data() {
    return {
      selected: false,
    };
  },
};
</script>