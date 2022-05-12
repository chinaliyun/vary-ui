# 修改镜像源

`Vary-ui`库是阿呆猫内部项目专用, 使用前需要开发人员将本地的 `npm` 包管理器仓库地址,修改为公司内部的 `npm` 镜像源地址, 当前镜像源地址为:`http://192.168.20.32:4873/`, 推荐使用[nrm](https://github.com/Pana/nrm)管理镜像源

```bash
nrm ls 查看s所有可用镜像源
nrm add Vary http://192.168.20.32:4873/  添加阿呆猫镜像源
nrm use Vary 使用阿呆猫镜像源
nrm use ... 切换为其他镜像源
```
