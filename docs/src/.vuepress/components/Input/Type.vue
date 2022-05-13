<template>
  <var-scene flex middle>
    <var-input v-model="username" w="300" clearable placeholder="请输入姓名" />
    <var-space w="10"></var-space>
    <var-input
      v-model="password"
      type="password"
      w="300"
      clearable
      placeholder="请输入密码"
    />
  </var-scene>
</template>

<script>
export default {
  name: "InputBase",
  data() {
    return {
      username: "",
      password: "",
    };
  },
};
</script>