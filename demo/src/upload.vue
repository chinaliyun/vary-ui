<template>
  <var-card title="文件上传">
    <var-upload
      :disabled="uploadDisabled"
      :multiple="2"
      progress
      @error="(v) => $message.error(v.msg)"
    ></var-upload>
  </var-card>
</template>
<script>
export default {
  data() {
    return {
      age: "3",
      uploadDisabled: false,
    };
  },
  methods: {
    async beforeUpload(fileList) {
      // 用户其他的文件判断与上传过程由用户自己实现
      //  fileList 返回用户选择的所有文件
    },
  },
};
</script>