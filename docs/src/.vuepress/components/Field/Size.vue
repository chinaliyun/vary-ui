<template>
  <div>
    <var-field label="姓名:" required err="请输入正确的姓名" label-width="200">
      <var-input w="200"></var-input>
    </var-field>
    <var-field
      label="姓名:"
      required
      err="请输入正确的姓名"
      label-width="200"
      center
    >
      <var-input w="200"></var-input>
    </var-field>
    <var-field
      label="姓名:"
      required
      err="请输入正确的姓名"
      label-width="200"
      right
    >
      <var-input w="200"></var-input>
    </var-field>
  </div>
</template>


<script>
export default {
  name: "FieldSize",
};
</script>