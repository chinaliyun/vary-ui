const path = require("path");

const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    "value-ui": ["./src/index.js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
    clean: true,
    library: {
      type: "commonjs2",
    },
    assetModuleFilename: "images/[hash][ext][query]",
  },
  // mode: "production",
  mode: "development",

  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": process.cwd() + "/src",
    },
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
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
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

  plugins: [new VueLoaderPlugin(), new MiniCssExtractPlugin()],
};
