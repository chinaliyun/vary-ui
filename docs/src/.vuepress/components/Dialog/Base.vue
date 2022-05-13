<template>
  <div>
    <div>
      <var-button @click="visible = true">点击打开弹窗</var-button>
    </div>
    <var-dialog title="提示" :visible.sync="visible" close-on-mask>
      <var-button @click="visible = false">点击关闭弹窗</var-button>
    </var-dialog>
  </div>
</template>
<script>
export default {
  name: "DialogBase",
  data() {
    return {
      visible: false,
    };
  },
};
</script>