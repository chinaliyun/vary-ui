<template>
  <div
    class="v_alert"
    :style="style"
    :class="{ message_open: open, message_close: close }"
    @click="clickRoot($event)"
  >
    <div
      class="v_alert_container"
      :class="{ [type]: type, message_open: open, message_close: close }"
    >
      <div class="v_alert_header">
        <div v-if="type" class="icon"></div>
        <div class="v_alert_header_container">
          <div class="alert_title">{{ options.title }}</div>
          <div class="alert_content">{{ options.content }}</div>
        </div>
        <div class="close_icon" @click="closeAlert()"><IconClose /></div>
      </div>
      <div class="alert_btns">
        <button class="confirm_btn" auto primary @click="clickConfirmBtn">
          {{ options.confirmText || "确定" }}
        </button>
        <div v-if="options.cancelText" flex>
          <button class="cancel_btn" auto border @click="clickCancelBtn">
            {{ options.cancelText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconClose from "./icons/close.vue";
export default {
  name: "VarAlert",
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
  computed: {},
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
    clickRoot(e) {
      if (e.target.isEqualNode(e.currentTarget)) {
        this.closeAlert();
      }
    },

    closeAlert(reason = "close") {
      this.close = true;
      this.reject({
        [reason]: true,
      });
    },
    clickConfirmBtn() {
      this.resolve();
      this.close = true;
    },
    clickCancelBtn() {
      this.closeAlert("cancel");
    },
  },
};
</script>
<style lang="scss">
.v_alert {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  transition: all 0.1s linear;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $alert-cover-color;
  &.message_open {
    animation: rootShow 0.1s linear;
  }
  @keyframes rootShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  &.message_close {
    animation: rootHide 0.1s linear;
    animation-fill-mode: forwards;
  }
  @keyframes rootHide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  .v_alert_container {
    width: 424px;
    // display: flex;
    // align-items: center;
    padding: 20px;
    border-radius: 4px;
    background-color: $alert-background-color;
    .v_alert_header {
      display: flex;
      align-items: flex-start;
      .v_alert_header_container {
        flex-grow: 1;
      }

      .icon {
        display: block;
        width: 20px;
        height: 22px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100%;
        margin-right: 10px;
      }
      .alert_title {
        font-size: 18px;
        color: $alert-title-color;
        margin-right: 12px;
      }
      .alert_content {
        padding: 10px 0;
        color: $alert-content-color;
        text-align: justify;
      }
    }
    .alert_btns {
      display: flex;
      justify-content: flex-end;
      padding-top: 20px;
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
        background-color: $alert-confirm-background-color;
        color: $alert-confirm-color;
        &:hover {
          background-color: darken($alert-confirm-background-color, 12%);
        }
      }
      .cancel_btn {
        min-width: 80px;
        height: 36px;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 10px;
        background-color: $alert-cancel-background-color;
        border-color: $alert-border-color;
        color: $alert-cancel-color;
        border-width: 1px;
        border-style: solid;
        &:hover {
          background-color: darken($alert-cancel-background-color, 3%);
        }
      }
    }
    .close_icon {
      transform: rotate(45deg);
      // font-size: 40px;
      width: 24px;
      height: 24px;
      font-weight: lighter;
      color: $alert-close-color;
      cursor: pointer;
      fill: $alert-close-color;
      transition: all 0.1s linear;
      &:hover {
        fill: $alert-close-hover-color;
      }
    }
    &.message_open {
      display: block;
      animation: show 0.1s linear;
      animation-fill-mode: forwards;
    }
    @keyframes show {
      from {
        top: 0px;
        transform: translate(0%, 50px) scale(0.8);
        opacity: 0;
      }
      to {
        transform: translate(0%, 0px) scale(1);
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
        transform: translate(0%, -50px);
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
