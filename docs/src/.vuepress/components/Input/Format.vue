<template>
  <div>
    <var-scene flex middle>
      <var-field label="只能输入3位以内整数:" label-width="300">
        <var-input v-model="weight1" w="300" clearable format="3"> </var-input>
      </var-field>
      <var-scene pl="10">输入的内容为:{{ weight1 }}</var-scene>
    </var-scene>
    <br />

    <var-scene flex middle>
      <var-field label="整数不做限制, 小数限制3位以内:" label-width="300">
        <var-input v-model="weight2" w="300" clearable format=".3"> </var-input>
      </var-field>
      <var-scene pl="10">输入的内容为:{{ weight2 }}</var-scene>
    </var-scene>

    <br />
    <var-scene flex middle>
      <var-field label="整数限制4位以内, 小数限制3位以内:" label-width="300">
        <var-input
          v-model="weight3"
          w="300"
          clearable
          placeholder=""
          format="4.3"
        >
        </var-input>
      </var-field>
      <var-scene pl="10">输入的内容为:{{ weight3 }}</var-scene>
    </var-scene>
  </div>
</template>

<script>
export default {
  name: "InputBase",
  data() {
    return {
      weight1: "",
      weight2: "",
      weight3: "",
    };
  },
};
</script>