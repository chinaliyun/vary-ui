<template>
  <div class="v_message" :style="style">
    <div
      class="v_message_body"
      :class="{ [type]: type, message_open: open, message_close: close }"
    >
      <div class="icon"></div>
      <div class="v_message_content">{{ msg }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AdmMessage",
  data() {
    return {
      msg: "",
      type: "default",
      open: false,
      close: false,
      style: {},
    };
  },
  beforeDestroy() {},
  methods: {
    init(type, msg, index) {
      this.renderStyle(index);
      this.type = type;
      this.msg = msg;
      this.open = true;
      setTimeout(() => {
        this.open = false;
        this.close = true;
      }, 3000);
    },
    renderStyle(index) {
      const top = 30 + (index - 1) * 50 + "px";
      this.style = {
        top,
      };
    },
  },
};
</script>
<style lang="scss" >
.v_message {
  position: fixed;
  top: -30px;
  left: 50%;
  z-index: 1000;
  transform: translateX(-50%);
  transition: all 0.2s linear;
  .v_message_body {
    min-width: 300px;
    min-height: 40px;
    align-items: center;
    padding: 0 20px;
    border-radius: 4px;
    display: flex;
    .icon {
      flex-shrink: 0;
      display: block;
      width: 20px;
      height: 20px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100%;
      margin-right: 10px;
    }
    .v_message_content {
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 600px;
      overflow: hidden;
    }
    &.message_open {
      animation: show 0.1s linear;
      animation-fill-mode: forwards;
    }
    @keyframes show {
      from {
        top: 0px;
        transform: translate(-50%, -30px);
        opacity: 0;
      }
      to {
        transform: translate(-50%, 0px);
        opacity: 1;
      }
    }

    &.message_close {
      animation: hide 0.1s linear;
      animation-fill-mode: forwards;
    }
    @keyframes hide {
      from {
        transform: translate(-50%, 0px);
        opacity: 1;
      }
      to {
        transform: translate(-50%, -30px);
        opacity: 0;
      }
    }
    &.success {
      background-color: #edf8e8;
      color: #67c23a;
      .icon {
        background-image: url("./images/success.svg");
      }
    }
    &.warning {
      background-color: #fdf5e9;
      color: #e29835;
      .icon {
        background-image: url("./images/warning.svg");
      }
    }
    &.error {
      background-color: #feeeee;
      color: #ff1f00;
      .icon {
        background-image: url("./images/error.svg");
      }
    }
    &.tips {
      background-color: #f2f2f3;
      color: #b7b7b7;
      .icon {
        background-image: url("./images/tips.svg");
      }
    }
  }
}
</style>
