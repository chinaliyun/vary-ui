<template>
  <var-field label="爱好:">
    <var-scene flex middle>
      <var-checkbox
        v-for="item in data"
        :key="item.id"
        v-model="selected"
        :label="item.name"
      >
        {{ item.name }}
      </var-checkbox>
      <var-scene w="10"></var-scene>
      <div>您的选择结果是: {{ selected.join(",") }}</div>
    </var-scene>
  </var-field>
</template>
<script>
export default {
  name: "CheckboxGroup",
  data() {
    return {
      data: [
        {
          id: 1,
          name: "篮球",
        },
        {
          id: 2,
          name: "足球",
        },
        {
          id: 3,
          name: "排球",
        },
      ],
      selected: [],
    };
  },
};
</script>