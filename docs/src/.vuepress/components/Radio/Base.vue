<template>
  <div>
    <var-radio label="1" v-model="sex" @change="onChanged">男性</var-radio>
    <var-radio label="2" v-model="sex" @change="onChanged">女性</var-radio>
  </div>
</template>
<script>
export default {
  name: "RadioBase",
  data() {
    return {
      sex: "1",
    };
  },
  methods: {
    onChanged(v) {
      console.log(v);
    },
  },
};
</script>