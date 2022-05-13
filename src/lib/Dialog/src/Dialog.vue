<template>
  <div
    class="v_dialog"
    :class="{ dialog_show: visible }"
    @click="closeDialogOnMask"
  >
    <div class="v_dialog_container" @click.stop="">
      <div class="v_dialog_header">
        <slot name="header">
          <div class="header_slot">
            <div class="title">{{ title }}</div>
            <div class="close" @click.stop="closeDialog">+</div>
          </div>
        </slot>
      </div>

      <div class="v_dialog_body">
        <slot name="default"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "VarDialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    closeOnMask: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  watch: {
    visible(v) {
      if (v) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
  },
  methods: {
    closeDialog(e) {
      this.$emit("update:visible", false);
      this.$emit("close");
    },
    closeDialogOnMask() {
      if (this.closeOnMask) {
        this.closeDialog();
      }
    },
  },
};
</script>
<style lang="scss" >
.v_dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 90;
  background-color: rgba(0, 0, 0, 0.582);
  display: none;
  justify-content: center;
  min-height: 700px;
  // overflow-y: scroll;
  &.dialog_show {
    display: flex;
    align-items: center;
    .v_dialog_container {
      animation: show 0.1s linear;
      animation-fill-mode: forwards;
      transform-origin: center;
    }
    @keyframes show {
      from {
        transform: scale(0.8) translateY(-30px);
      }
      to {
        transform: scale(1) translateY(-40px);
      }
    }
  }
  .v_dialog_container {
    background-color: white;
    border-radius: 4px;
    min-width: 500px;
    min-height: 100px;

    .header_slot {
      display: flex;
      align-items: center;
      padding: 10px 10px 10px 30px;
      border-bottom: 1px solid $dialog-border-color;
      .title {
        flex-grow: 1;
        font-size: 18px;
      }
      .close {
        color: #999;
        font-size: 28px;
        transform: rotate((45deg));
        cursor: pointer;
        margin-right: 10px;
        flex-shrink: 0;
        &:hover {
          color: $dialog-color;
        }
      }
    }
  }
  .v_dialog_body {
    padding: 20px 30px;
  }
}
</style>
