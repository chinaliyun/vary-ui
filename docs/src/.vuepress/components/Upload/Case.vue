<template>
  <div>
    <var-upload :upload="upload"> </var-upload>
    <div class="file_list">
      <div v-for="(item, index) in files" :key="index" class="file_item">
        {{ item.file.name }} 上传进度:{{ item.rate }}
      </div>
    </div>
  </div>
</template>
<script>
function upload(file) {
  // 模拟上传事件
  return new Promise((resolve) => {
    let p = 0;
    file.progress(0);
    let timer = setInterval(() => {
      p += Math.random() * 0.2;
      if (p > 1) {
        p = 1;
        clearInterval(timer);
        timer = null;
      }
      file.progress(p);
      if (p === 1) resolve(file);
    }, 500 + Math.random() * 1000);
  });
}

export default {
  name: "UploadCase",
  data() {
    return {
      files: [],
    };
  },
  methods: {
    async upload(files) {
      this.files = files;
      await Promise.all(files.map((item) => upload(item)));
    },
  },
};
</script>
<style scoped>
.file_item {
  font-size: 14px;
  padding: 2px 0;
}
</style>