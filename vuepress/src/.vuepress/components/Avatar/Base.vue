<template>
  <var-avatar :src="src"></var-avatar>
</template>
<script>
export default {
  name: "AvatarBase",
  data() {
    return {
      src: require("./images/1.jpg"),
    };
  },
};
</script>