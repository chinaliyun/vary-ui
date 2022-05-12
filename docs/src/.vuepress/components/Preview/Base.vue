<template>
  <div>
    <var-scene h="50" flex center middle>
      <var-button primary auto @click="preview">打开预览</var-button>
    </var-scene>
  </div>
</template>
<script>
export default {
  name: "PreviewBase",
  methods: {
    preview() {
      this.$preview({
        urls: [
          "http://pic1.win4000.com/wallpaper/2018-11-13/5bea6fdd33620.jpg",
          "http://pic1.win4000.com/wallpaper/8/521d5ecd5ad3a.jpg",
          "http://pic1.win4000.com/wallpaper/b/512080cad4523.jpg",
          "http://pic1.win4000.com/wallpaper/d/55779b4cdeb28.jpg",
          "http://pic1.win4000.com/wallpaper/2/5509238febf73.jpg",
          "http://pic1.win4000.com/wallpaper/2/5509239fe366a.jpg",
          "http://pic1.win4000.com/tj/2020-07-07/5f0434b008d05.jpg",
          "http://pic1.win4000.com/tj/2020-11-23/5fbb52853885a.jpg",
        ],
        current: 2,
      });
    },
  },
};
</script>