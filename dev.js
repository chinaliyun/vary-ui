const cli = require("webpack-cli/lib/bootstrap");
const path = require("path");

const webpackDir = path.resolve(
  __dirname,
  "node_modules/webpack/bin/webpack.js"
);
const webpackCliDir = path.resolve(
  __dirname,
  "node_modules/webpack-cli/bin/cli.js"
);

cli([process.argv[0], webpackDir, "-c", "config/webpack.config.js", "-w"]);

cli([
  "/usr/local/bin/node",
  webpackCliDir,
  "serve",
  "--config",
  "config/webpack.demo.config.js",
]);
