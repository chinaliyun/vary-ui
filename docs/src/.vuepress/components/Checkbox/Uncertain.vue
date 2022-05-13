<template>
  <var-checkbox v-model="selected" uncertain>半选中状态</var-checkbox>
</template>

<script>
export default {
  name: "CheckboxUncertain",
  data() {
    return {
      selected: false,
      uncertain: false,
    };
  },
};
</script>