const path = require("path");

const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: ["./demo/index.js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../demo"),
    clean: true,
    assetModuleFilename: "images/[hash][ext][query]",
  },
  // mode: "production",
  mode: "development",

  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": process.cwd() + "/demo",
    },
  },

  devServer: {
    host: "0.0.0.0",
    port: 8085,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          "vue-style-loader",
          "css-loader",
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: path.resolve(__dirname, "../src/var.scss"),
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../demo/index.html"),
    }),
  ],
};
