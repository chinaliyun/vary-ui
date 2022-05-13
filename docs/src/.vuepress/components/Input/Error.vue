<template>
  <var-scene flex middle>
    <var-input v-model="name" w="300" clearable :err="name.length > 3" />
  </var-scene>
</template>

<script>
export default {
  name: "InputBase",
  data() {
    return {
      name: "",
    };
  },
};
</script>