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
  dest: path.resolve(__dirname, "../../../docs"),
  themeConfig: {
    repo: "",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: false,
    nav: [
      {
        text: "组件",
        link: "/components/scene",
      }
    ],
    sidebar: {
      "/guide/": [
        {
          title: "安装",
          collapsable: false,
          children: [],
        },
      ],
      "/components/": [
        {
          title: "组件",
          collapsable: false,
          children: ["avatar", "button", "scene", "preview"],
        },
      ],
      "/options/": [
        {
          title: "选项",
          collapsable: false,
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
