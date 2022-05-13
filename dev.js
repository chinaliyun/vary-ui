// const cli = require("webpack-cli/lib/bootstrap");
const path = require("path");
const { exec } = require("child_process");

function execPromise(command, progress = progressFn) {
  if (!command) {
    console.log(`Error: command param can't be empty\n`.red);
  }
  if (progress && !isFun(progress)) {
    console.log("Error: progress param was not a function\n".red);
  }
  console.log("\n" + command);
  return new Promise((resolve, reject) => {
    const sh = exec(command);
    let resolveData = "";
    sh.stdout.on("data", (desc) => {
      progress(desc.toString());
      resolveData += desc;
    });
    sh.stderr.on("data", (desc) => {
      progress(desc.toString());
      resolveData += desc;
    });
    sh.on("exit", () => {
      resolve(resolveData.toString());
    });
    // sh.on("close", () => {});
    sh.on("error", (err) => {
      reject(err);
    });
  });
}

async function run() {
  await execPromise("yarn build", (res) => {
    console.log(res);
  });
  await execPromise("yarn dev", (res) => {
    console.log(res);
  });
}
run();
