<template>
  <div class="page_root">
    <!-- <UploadDemo /> -->
    <var-field label="姓名" err="请输入正确的姓名" label-width="200">
      <var-input w="200"></var-input>
    </var-field>
    <var-field label="姓名" err="请输入正确的姓名" label-width="200" center>
      <var-input w="200"></var-input>
    </var-field>
    <var-field label="姓名" err="请输入正确的姓名" label-width="200" right>
      <var-input w="200"></var-input>
    </var-field>
  </div>
</template>
<script>
import UploadDemo from "./src/upload.vue";
export default {
  name: "AppRoot",
  components: {
    UploadDemo,
  },
  data() {
    return {
      log() {
        console.log(1);
      },
    };
  },
  mounted() {},
  methods: {
    async alert() {
      try {
        await this.$alert.success({
          title: "title",
          content:
            "© 2022 网易公司 网易公司 隐私政策 京ICP证080268号 京ICP备10005211号",
          confirmText: "确认",
          cancelText: "取消",
        });
      } catch (e) {
        this.$message.tips("cancel");
      }
    },
    message() {
      this.$message.success(
        "message content message content message content message content message content message content"
      );
    },
    notify() {
      this.$notify.success({
        title: "title",
        content:
          "© 2022 网易公司 网易公司 隐私政策 京ICP证080268号 京ICP备10005211号",
      });
    },

    loading() {
      const loading = this.$loading();
      setTimeout(() => {
        loading.close();
      }, 2000);
    },
    showLoading() {
      this.loadingStatus = true;
      setTimeout(() => {
        this.loadingStatus = false;
      }, 3000);
    },
    showDialog() {
      this.dialogVisible = true;
    },
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
    pageNoChanged(v) {
      this.pageNo = v;
    },
    nextPage() {
      this.pageNo++;
    },
  },
};
</script>
<style scoped lang="scss">
.page_root {
  background-color: rgb(238, 238, 238);
  padding: 30px;
}
</style>
