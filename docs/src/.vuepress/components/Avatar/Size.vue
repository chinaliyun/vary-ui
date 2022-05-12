<template>
  <var-scene flex middle>
    <var-avatar :src="src" size="100"></var-avatar>
    <var-avatar :src="src" size="120"></var-avatar>
    <var-avatar :src="src" size="140"></var-avatar>
  </var-scene>
</template>
<script>
export default {
  name: "AvatarSize",
  data() {
    return {
      src: require("./images/1.jpg"),
    };
  },
};
</script>