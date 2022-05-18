<template>
  <div class="v_upload">
    <div class="v_upload_body" @click.stop="openSelectDialog($event)">
      <slot>
        <div class="v_upload_default_field" :class="{ disabled }"></div>
      </slot>
      <div class="v_upload_progress" :class="{ show: progress }" @click.stop="">
        <div v-for="item in selectedFiles" :key="item.fileName">
          <div class="v_upload_progress_item">
            <var-scene flex middle class="file_info">
              <var-scene grow class="file_name">
                {{ item.file.name }}
              </var-scene>

              <var-scene
                fixed
                flex
                middle
                class="progress_result"
                :class="{ success: item.rate == 1 }"
              >
                <div
                  class="percent"
                  :class="{ show: item.rate && item.rate < 1 }"
                >
                  {{ Math.floor(item.rate * 100) }}%
                </div>
                <IconSuccess class="result_success" />
              </var-scene>
            </var-scene>
            <div class="progress_bg">
              <div
                class="progress_bar"
                :style="{ width: item.rate * 100 + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <input
      ref="input"
      type="file"
      hidden
      :disabled="disabled"
      :multiple="multiple"
      :accept="accept"
      @change="inputFileChange"
    />
  </div>
</template>
<script>
function mapError(code, context) {
  return {
    code,
    msg: context,
  };
}

function upload(file) {
  return new Promise((resolve) => {
    let p = 0;
    file.progress(0);
    let timer = setInterval(() => {
      p += Math.random() * 0.2;
      if (p > 1) {
        p = 1;
        clearInterval(timer);
        timer = null;
      }
      file.progress(p);
      if (p === 1) resolve(file);
    }, 500 + Math.random() * 1000);
  });
}
import IconSuccess from "./icons/success.vue";
export default {
  name: "VarUpload",
  components: {
    IconSuccess,
  },
  props: {
    accept: {
      type: String,
      default: "*",
    },
    multiple: {
      type: [Boolean, Number],
      default: false,
    },
    progress: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    upload: {
      type: Function,
      async default(files) {
        // 省略总大小检测,单文件文件大小检测
        await Promise.all(files.map((item) => upload(item)));
      },
    },
    beforeUpload: {
      type: Function,
      async default() {
        return true;
      },
    },
  },
  data() {
    return {
      selectedFiles: [],
      acceptStr: "",
      isTrusted: true,
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  methods: {
    init() {
      // 确定允许上传的文件类型
      if (this.accept !== "*") {
        const acceptStr = this.accept
          .replace(/,,/g, ",")
          .replace(/(^,|,$)/g, "");
        if (
          !/^\.[a-zA-Z0-9]{2,5}(,\.[a-zA-Z0-9]{2,5})*$/.test(
            acceptStr.toLowerCase()
          )
        ) {
          throw new Error(`accept格式错误, 参考'.jpg,.png,.mp4'`);
        }
        this.acceptStr = acceptStr;
      }
    },

    openSelectDialog() {
      // 有文件上传的时候, 禁止选择文件
      if (!this.uploading) {
        this.isTrusted = true;
        this.$refs.input.click();
      }
    },

    trigger() {
      if (!this.uploading) {
        this.isTrusted = fase;
        this.$refs.input.click();
      }
    },

    async inputFileChange(e) {
      let files = Array.from(e.target.files);

      if (files.length === 0) {
        this.$emit("cancel");
        return;
      }

      // 超过最大数量限制
      if (
        !isNaN(this.multiple) &&
        this.multiple &&
        files.length > this.multiple
      ) {
        this.$emit(
          "error",
          mapError(1001, `最多只能选择${this.multiple}个文件`)
        );
        e.target.value = "";
        return;
      }

      // 文件类型限制
      for (const item of files) {
        const typeExp = new RegExp(
          this.acceptStr.replace(/\./g, "\\.").replace(/,/g, "|"),
          "g"
        );
        if (
          !typeExp.test(item.name.match(/\.[a-zA-Z0-9]{2,5}$/)[0].toLowerCase())
        ) {
          this.$emit(
            "error",
            mapError(1001, `${item.name}文件格式错误, 请重新选择文件`)
          );
          break;
        }
      }

      this.selectedFiles = files.map((item) => {
        const file = {
          file: item,
          rate: 0,
          progress(p) {
            file.rate = p;
          },
        };
        return file;
      });

      this.upload(this.selectedFiles, {
        isTrusted: this.isTrusted,
      });
    },
  },
};
</script>
<style lang="scss">
.v_upload {
  .v_upload_body {
    display: flex;
    .v_upload_default_field {
      width: 100px;
      height: 100px;
      border: 1px dashed rgb(189, 189, 189);
      display: flex;
      font-size: 40px;
      color: #999;
      align-items: center;
      justify-content: center;
      transition: all 0.2s linear;
      border-radius: 4px;
      cursor: pointer;
      font-weight: lighter;
      background: url("./images/plus.svg") no-repeat center center/30px 30px;
      background-color: rgba(255, 249, 247, 0.397);
      &:hover {
        // color: rgb(243, 162, 86);
        border-color: rgb(243, 162, 86);
      }
      &.disabled {
        cursor: not-allowed;
      }
    }
    .v_upload_progress {
      flex-grow: 1;
      font-size: 12px;
      display: none;
      padding: 0 10px;
      &.show {
        display: block;
      }
      .file_info {
        transition: all 0.2s linear;
        border-radius: 4px;
        padding: 4px;
        position: relative;
        &:hover {
          background-color: rgb(246, 246, 246);
          .delete_row {
            opacity: 1;
            // display: flex;
          }
        }
      }
      .file_name {
        color: #999;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .delete_row {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
        width: 20px;
        // display: none;
        opacity: 0;
        background-color: rgb(246, 246, 246);
        transition: all 0.2s linear;
        .delete {
          width: 14px;
          height: 14px;
          cursor: pointer;
          transition: all 0.2s linear;
          &:hover {
            transform: scale(1.1);
          }
        }
      }
      .progress_result {
        .percent {
          display: none;
          &.show {
            display: block;
          }
        }
        .result_success {
          width: 14px;
          height: 14px;
          display: none;
        }
        &.success {
          .result_success {
            display: block;
            opacity: 0;
            animation: progress_icon_show 0.1s linear;
            animation-delay: 0.3s;
            animation-fill-mode: forwards;
          }
        }
      }
      @keyframes progress_icon_show {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      .progress_bg {
        width: 100%;
        background-color: rgb(240, 240, 240);
        height: 2px;
        border-radius: 4px;
        overflow: hidden;
        .progress_bar {
          height: 100%;
          background-color: #58bd2d;
          transition: width 0.2s linear;
        }
      }
    }
  }
}
</style>
