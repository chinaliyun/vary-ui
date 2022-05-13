<template>
  <var-scene flex middle>
    <var-input w="200" :data="data" v-model="address" clearable />
    <var-space w="10"></var-space>
    <div>您的选择是:{{ address }}</div>
  </var-scene>
</template>
<script>
export default {
  name: "InputOption",
  data() {
    return {
      address: "",
      data: ["北京", "河南"],
    };
  },
};
</script>