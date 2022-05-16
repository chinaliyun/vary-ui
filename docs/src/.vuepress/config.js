const path = require("path");
module.exports = {
  title: "VaryUI",
  description: "以Vue2.0为基础的UI组件库",
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],
  dest: path.resolve(__dirname, "../../dist"),
  themeConfig: {
    repo: "",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: false,
    nav: [
      {
        text: "组件",
        link: "/components/avatar",
      },
    ],
    sidebar: {
      "/components/": [
        {
          title: "安装及环境",
          collapsable: true,
          children: ["install", "variable"],
        },
        {
          title: "布局",
          collapsable: true,
          children: [
            "scene",
            // "space"
          ],
        },
        {
          title: "表单",
          collapsable: true,
          children: ["field", "input", "checkbox"],
        },
        {
          title: "组件库",
          collapsable: true,
          children: ["avatar", "button", "link", "card", "preview"],
        },
        {
          title: "弹出窗",
          collapsable: true,
          children: ["dialog", "loading"],
        },
      ],
      "/options/": [
        {
          title: "选项",
          collapsable: true,
          children: [""],
        },
      ],
    },
  },
  markdown: {
    lineNumbers: true,
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ["@vuepress/plugin-back-to-top", "@vuepress/plugin-medium-zoom"],
  scss: {
    prependData: `
    @import "@styles/index.scss";
    `,
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@styles": path.resolve(__dirname, "./styles"),
      },
    },
  },
};
