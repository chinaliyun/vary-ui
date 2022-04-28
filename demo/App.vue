<template>
  <div class="page_root">
    <UploadDemo />
    <br />
    <adm-card title="Steps">
      <adm-steps :data="steps" active="1"></adm-steps>
    </adm-card>
    <br />
    <adm-scene w="300" class="textarea_row">
      <adm-card title="文本域">
        <adm-textarea v-model="textarea" h="50"></adm-textarea>
      </adm-card>
    </adm-scene>
    <br />
    <adm-card title="tab选项卡">
      <adm-tabs :data="tabs"></adm-tabs>
    </adm-card>
    <br />
    <adm-card title="翻页">
      <adm-pager
        :total="200"
        :page-size="12"
        :pageNo="pageNo"
        @pageNoChanged="pageNoChanged"
      ></adm-pager>
    </adm-card>
    <br />
    <adm-card v-loading="loadingStatus">
      <div>loading指令</div>
      <br />
      <adm-scene flex>
        <adm-button primary w="100" @click="showLoading()">
          打开loading
        </adm-button>
        <adm-space w="10"></adm-space>
      </adm-scene>
    </adm-card>
    <br />
    <adm-card title="按钮">
      <adm-scene flex>
        <adm-button w="100" primary @click="showDialog">打开弹窗</adm-button>
        <adm-space w="10"></adm-space>
        <adm-button w="100" primary @click="alert">打开alert</adm-button>
        <adm-space w="10"></adm-space>
        <adm-button w="100" primary @click="message">打开message</adm-button>
        <adm-space w="10"></adm-space>
        <adm-button w="100" primary @click="notify">打开notify</adm-button>
        <adm-space w="10"></adm-space>
        <adm-button w="100" primary @click="preview">打开preview</adm-button>
        <adm-space w="10"></adm-space>
        <adm-button w="200" primary @click="loading">
          打开全局loading
        </adm-button>
        <adm-space w="10"></adm-space>
      </adm-scene>
    </adm-card>
    <br />
    <adm-card title="表单">
      <adm-field label="姓名" inline>
        <adm-input v-model="name"></adm-input>
      </adm-field>
      <br />
      <adm-field label="单选组" inline>
        <adm-radio v-model="sex" value="1">男</adm-radio>
        <adm-radio v-model="sex" value="2">女</adm-radio>
      </adm-field>
      <br />
      <adm-field label="复选框" inline>
        <adm-checkbox v-model="hobby" label="bus">公共汽车</adm-checkbox>
        <adm-checkbox v-model="hobby" label="car">小汽车</adm-checkbox>
      </adm-field>
      <br />
      <adm-field inline label="日期">
        <adm-datetime-picker>as</adm-datetime-picker>
      </adm-field>
      <br />
      <adm-field label="下拉选择器" inline>
        <adm-select
          v-model="level"
          :data="select"
          label-node="name"
          value-node="value"
          clearable
        ></adm-select>
      </adm-field>
    </adm-card>
    <br />
    <adm-card title="Link">
      <adm-scene flex>
        <adm-link primary>link</adm-link>
        <adm-link success>link</adm-link>
        <adm-link warning>link</adm-link>
        <adm-link error>link</adm-link>
        <adm-link border primary>link</adm-link>
      </adm-scene>
    </adm-card>
    <br />
    <adm-card title="头像">
      <adm-avatar
        src="https://pic.quanjing.com/3g/wg/QJ6113194984.jpg@!794ws"
      ></adm-avatar>
    </adm-card>
    <br />
    <adm-card title="卡片"> 内容 </adm-card>

    <adm-dialog title="标题" :visible.sync="dialogVisible">
      弹窗内容
    </adm-dialog>

    <br />
    <adm-card title="表格">
      <adm-table :columns="columns" :data="list" border>
        <template #formulateAmount="{ row }">
          <adm-input v-model.trim="row.formulateAmount" w="100%" format="6">
            <template v-slot:prefix> ≥ </template>
          </adm-input>
        </template>
        <template #formulatePrice="{ row }">
          <adm-input
            v-model.trim="row.formulatePrice"
            w="100%"
            format="6.2"
            placeholder="如：100.00"
          >
          </adm-input>
        </template>
      </adm-table>
    </adm-card>
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
