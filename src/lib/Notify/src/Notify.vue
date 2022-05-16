<template>
  <div class="v_notify" :style="style">
    <div
      class="v_notify_container"
      :class="{ [type]: type, message_open: open, message_close: close }"
    >
      <div class="icon"></div>
      <div class="notify_body">
        <div class="notify_title">{{ options.title }}</div>
        <div class="notify_content">{{ options.content }}</div>
        <div
          class="notify_btns"
          :class="{
            show: buttonVisible,
          }"
        >
          <button class="confirm_btn" @click="clickBtn">
            {{ options.buttonText }}
          </button>
        </div>
      </div>
      <div class="close_icon" @click="closeNotify">
        <IconClose />
      </div>
    </div>
  </div>
</template>
<script>
import IconClose from "./icons/close.vue";
export default {
  name: "VarNotify",
  components: {
    IconClose,
  },
  data() {
    return {
      type: "default",
      open: false,
      close: false,
      style: {},
      title: "",
      content: "",
      options: {},
    };
  },
  computed: {
    buttonVisible() {
      const { buttonText, buttonCallback } = this.options;
      return (
        buttonText &&
        buttonCallback &&
        Object.prototype.toString
          .call(buttonCallback)
          .slice(-9, -1)
          .toLowerCase() === "function"
      );
    },
  },
  methods: {
    init(type, options) {
      this.options = options;
      this.type = type;
      this.style = {
        top: options.top + "px",
      };
    },
    show() {
      this.open = true;
    },
    renderStyle(height) {
      const top = parseInt(this.style.top) - height;
      this.style = {
        top: top + "px",
      };
    },
    clickBtn() {
      this.options.buttonCallback(this.options.meta);
      this.closeNotify();
    },
    closeNotify() {
      this.close = true;
      setTimeout(() => {
        this.options.remove();
      }, 200);
    },
  },
};
</script>
<style lang="scss" >
.v_notify {
  position: fixed;
  top: -300px;
  right: 26px;
  z-index: 99;
  //   transform: translateX(-50%);
  transition: all 0.2s linear;
  user-select: none;
  .v_notify_container {
    width: 424px;
    align-items: center;
    padding: 20px;
    border-radius: 4px;
    background-color: $notiy-background-color;
    box-shadow: 0 0 4px rgb(228, 228, 228);
    display: flex;
    align-items: flex-start;
    .icon {
      display: block;
      width: 24px;
      height: 24px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100%;
      margin-right: 10px;
    }
    .notify_title {
      font-size: 18px;
      color: $notify-title-color;
      margin-right: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .notify_content {
      color: $notify-content-color;
      text-align: justify;
      font-size: 14px;
      word-break: break-all;
      line-height: 20px;
      max-height: 100px;
      overflow: hidden;
    }
    .notify_body {
      flex-grow: 1;
    }
    .notify_btns {
      display: none;
      &.show {
        display: flex;
        justify-content: flex-end;
      }

      .confirm_btn {
        min-width: 80px;
        border: 1px solid transparent;
        border-radius: 4px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.1s linear;
        outline: none;
        font-size: 14px;
        background-color: $notify-confirm-background-color;
        color: $notify-confirm-color;
        &:hover {
          background-color: lighten($notify-confirm-background-color, 12%);
        }
      }
    }
    .close_icon {
      transform: rotate(45deg);
      // font-size: 40px;
      width: 24px;
      height: 24px;
      font-weight: lighter;
      color: $notify-close-color;
      cursor: pointer;
      fill: $notify-close-color;
      transition: all 0.2s linear;
      &:hover {
        fill: $notify-close-hover-color;
      }
    }
    &.message_open {
      animation: show 0.1s linear;
      animation-fill-mode: forwards;
    }
    @keyframes show {
      from {
        top: 0px;
        transform: translate(0%, 50px);
        opacity: 0;
      }
      to {
        transform: translate(0%, 0px);
        opacity: 1;
      }
    }

    &.message_close {
      animation: hide 0.1s linear;
      animation-fill-mode: forwards;
    }
    @keyframes hide {
      from {
        transform: translate(0, 0px);
        opacity: 1;
      }
      to {
        transform: translate(100%, 0px);
        opacity: 0;
      }
    }
    &.success {
      .icon {
        background-image: url("./images/success.svg");
      }
    }
    &.warning {
      .icon {
        background-image: url("./images/warning.svg");
      }
    }
    &.error {
      .icon {
        background-image: url("./images/error.svg");
      }
    }
    &.tips {
      .icon {
        background-image: url("./images/tips.svg");
      }
    }
  }
}
</style>
