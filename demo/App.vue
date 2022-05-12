<template>
  <div class="page_root">
    <UploadDemo />
    <br />
    <var-card title="Steps" shadow>
      <var-steps :data="steps" active="1"></var-steps>
    </var-card>
    <br />
    <var-scene w="300" class="textarea_row">
      <var-card title="文本域">
        <var-textarea v-model="textarea" h="50"></var-textarea>
      </var-card>
    </var-scene>
    <br />
    <var-card title="tab选项卡">
      <var-tabs :data="tabs"></var-tabs>
    </var-card>
    <br />
    <var-card title="翻页">
      <var-pager
        :total="200"
        :page-size="12"
        :pageNo="pageNo"
        @pageNoChanged="pageNoChanged"
      ></var-pager>
    </var-card>
    <br />
    <var-card v-loading="loadingStatus">
      <div>loading指令</div>
      <br />
      <var-button primary @click="showLoading()" w="100">
        打开loading
      </var-button>
    </var-card>
    <br />
    <var-card title="按钮">
      <var-scene flex>
        <var-button w="100" primary @click="showDialog">打开弹窗</var-button>
        <var-space w="10"></var-space>
        <var-button w="100" primary @click="alert">打开alert</var-button>
        <var-space w="10"></var-space>
        <var-button w="100" primary @click="message">打开message</var-button>
        <var-space w="10"></var-space>
        <var-button w="100" primary @click="notify">打开notify</var-button>
        <var-space w="10"></var-space>
        <var-button w="100" primary @click="preview">打开preview</var-button>
        <var-space w="10"></var-space>
        <var-button w="200" primary @click="loading">
          打开全局loading
        </var-button>
        <var-space w="10"></var-space>
      </var-scene>
    </var-card>
    <br />
    <var-card title="表单">
      <var-field label="姓名" inline>
        <var-input v-model="name"></var-input>
      </var-field>
      <br />
      <var-field label="单选组" inline>
        <var-radio v-model="sex" value="1">男</var-radio>
        <var-radio v-model="sex" value="2">女</var-radio>
      </var-field>
      <br />
      <var-field label="复选框" inline>
        <var-checkbox v-model="hobby" label="bus">公共汽车</var-checkbox>
        <var-checkbox v-model="hobby" label="car">小汽车</var-checkbox>
      </var-field>
      <br />
      <var-field inline label="日期">
        <var-datetime-picker>as</var-datetime-picker>
      </var-field>
      <br />
      <var-field label="下拉选择器" inline>
        <var-select
          v-model="level"
          :data="select"
          label-node="name"
          value-node="value"
          clearable
        ></var-select>
      </var-field>
    </var-card>
    <br />
    <var-card title="Link">
      <var-scene flex>
        <var-link primary>link</var-link>
        <var-link success>link</var-link>
        <var-link warning>link</var-link>
        <var-link error>link</var-link>
        <var-link border primary>link</var-link>
      </var-scene>
    </var-card>
    <br />
    <var-card title="头像">
      <var-avatar
        src="https://pic.quanjing.com/3g/wg/QJ6113194984.jpg@!794ws"
      ></var-avatar>
    </var-card>
    <br />
    <var-card title="卡片"> 内容 </var-card>

    <var-dialog title="标题" :visible.sync="dialogVisible">
      弹窗内容
    </var-dialog>

    <br />
    <var-card title="表格">
      <var-table :columns="columns" :data="list" border>
        <template #formulateAmount="{ row }">
          <var-input v-model.trim="row.formulateAmount" w="100%" format="6">
            <template v-slot:prefix> ≥ </template>
          </var-input>
        </template>
        <template #formulatePrice="{ row }">
          <var-input
            v-model.trim="row.formulatePrice"
            w="100%"
            format="6.2"
            placeholder="如：100.00"
          >
          </var-input>
        </template>
      </var-table>
    </var-card>
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
      hobby: [],
      sex: "1",
      dialogVisible: false,
      name: "",
      level: "1",
      textarea: "",
      loadingStatus: false,
      steps: ["第一步", "第二步", "第三步"],
      tabs: [
        {
          label: "首页",
          name: "home",
        },
        {
          label: "新闻",
          name: "news",
        },
      ],
      columns: [
        { label: "ID", prop: "id" },
        { label: "起订量", prop: "formulateAmount", width: 365 },
        { label: "销售价", prop: "formulatePrice" },
      ],
      list: [{ formulateAmount: "", id: 1 }],
      select: [
        {
          id: 1,
          name: "一级",
          value: 1,
          children: [
            {
              id: "1-1",
              name: "一科",
              value: "1-1",
            },
            {
              id: "1-2",
              name: "二科",
              value: "1-2",
            },
          ],
        },
        {
          id: 2,
          name: "二级",
          value: 2,
        },
        {
          id: 3,
          name: "三级",
          value: 3,
        },
      ],
      pageNo: 1,
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
