const { execSync, exec } = require("child_process");
const { readFileSync, writeFileSync } = require("fs");
const path = require("path");
const ProgressBar = require("progress");
require("colors");

function isFun(fn) {
  return (
    Object.prototype.toString.call(fn).toLowerCase().slice(-9, -1) ===
    "function"
  );
}

function progressFn(desc) {
  console.log(desc);
}
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

console.log("");
const branch = execSync(`git branch -a`).toString().split("\n");
const branchName = branch.find((item) => item.startsWith("*")).split(" ")[1];
console.log(`当前所在分支:`, `${branchName}`.green);

let newVersion = "";
console.log("拉取当前分支最新代码:");
execPromise(`git pull origin ${branchName}`, (res) => {
  console.log(res);
})
  .then((res) => {
    if (res.includes("Error")) {
      console.log(
        "git pull failed, 可能存在代码冲突, 请解决冲突后重新发布".red
      );
      process.exit();
    }

    updateVersion();
  })
  .catch((e) => {
    console.log("error", e);
    process.exit();
  });

async function updateVersion() {
  const pkgFile = path.resolve(__dirname, "./package.json");
  const pkg = readFileSync(pkgFile, {
    encoding: "utf-8",
  });
  const versionReg = /"(version": ")(\d\.\d\.\d{1,2})"/;
  const matchers = pkg.match(versionReg);
  // console.log(matchers);
  if (!/^\d\.\d\.\d{1,2}$/.test(matchers[2])) {
    console.log("本地package中未找到version字段".yellow);
    return;
  }
  let version = matchers[2];
  // const pkgJson = JSON.parse(pkg);
  console.log(`当前版本号为 ${version}`.green);
  newVersion = version = generateVersion(version);
  console.log(`即将发布版本为 ${version}`.green);

  const confirmRelease = await question(
    `\n确认发布版本<${version}>吗(按Enter键确认发布)?`
  );
  if (confirmRelease !== "") {
    console.log("终止发布".white);
    process.exit();
  }

  console.log(`编译npm包`);

  const barTotal = 100;
  const bar = new ProgressBar("Building [:bar]", { total: barTotal });
  const timer = setInterval(() => {
    // console.log('');
    bar.tick();
    if (bar.complete) {
      clearInterval(timer);
    }
  }, 500);

  execPromise("yarn deploy", (_) => {})
    .then((deploy) => {
      bar.tick(barTotal - bar.curr);
      console.log("\n");
      console.log(deploy.toString());

      writeFileSync(pkgFile, pkg.replace(versionReg, `"$1${version}"`), {
        encoding: "utf-8",
      });
      console.log(`推送Npm包：`.green);
      const publish = execSync(`npm publish --access=public`);
      const branchName = publish.toString().replace(/\n/, "");
      console.log(branchName);
      console.log(`\nSuccess: <${version}>版本发布成功\n`.green);
      commit();
    })
    .catch((e) => {
      console.log(e);
      process.exit();
    });
}

function question(q) {
  console.log(q);
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.on("line", (desc) => {
      readline.close();
      // console.log(desc);
      resolve(desc);
    });
  });
}

async function commit() {
  console.log("Npm推送完成".green);

  const status = execSync(`git status .`);
  console.log(status.toString());

  let commitDesc = await question(
    `请输入commit描述内容, 无描述内容将退出commit`
  );

  if (commitDesc === "") {
    console.log("release完成, 请手动提交代码".green);
    process.exit();
  }

  try {
    const add = execSync(`git add .`);
    console.log(add.toString() + "git add finished\n".green);

    const commit = execSync(`git commit -m '${commitDesc}'`);
    console.log(commit.toString());

    const push = await execPromise(`git push origin ${branchName}`);
    console.log(push.toString());
    console.log(`代码自动提交完成`.green);

    const log = execSync("git log -n 1");
    console.log(log.toString());
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

function generateVersion(str) {
  // 3位版本号,第三位+1
  // 如果第三位+1后满100, 二位+1
  // 如果二位满10, 一位+1
  const [a, b, c] = str.split(".");
  if (c * 1 + 1 < 100) {
    return [a, b, c * 1 + 1].join(".");
  }
  if (b * 1 + 1 < 10) {
    return [a, b * 1 + 1, 0].join(".");
  }
  return [a * 1 + 1, 0, 0].join(".");
}
