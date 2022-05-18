<template>
  <var-textarea v-model="detail" placeholder="请输入" w="200" h="50">
    <template #prefix=""> prefix </template>
    <template #suffix=""> suffix </template>
  </var-textarea>
</template>
<script>
export default {
  name: "TextareaBase",
  data() {
    return {
      detail: "",
    };
  },
};
</script>