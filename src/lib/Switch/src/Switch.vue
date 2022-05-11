<template>
  <div class="comp_root_switch">
    <div
      class="switch_core"
      :style="style"
      :class="[{ active: value }, { disabled }]"
      @click="change"
    ></div>
  </div>
</template>

<script>
export default {
  name: "VarSwitch",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    // 背景色
    activeColor: {
      type: String,
      default: "rgb(19, 206, 102)",
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 元素宽度
    width: {
      type: String,
      default: "40px",
    },
  },
  data() {
    return {
      style: null,
      defaultColor: "rgb(220, 223, 230)",
    };
  },
  watch: {
    value: {
      handler(val) {
        this.style = {
          ...this.style,
          borderColor: val ? this.activeColor : this.defaultColor,
          backgroundColor: val ? this.activeColor : this.defaultColor,
        };
      },
      immediate: true,
    },
  },
  created() {
    this.style.width = this.width;
  },
  methods: {
    change() {
      if (this.disabled) {
        return;
      }
      this.$emit("change", !this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.comp_root_switch {
  .switch_core {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    box-sizing: border-box;
    cursor: pointer;
    vertical-align: middle;
    margin: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(220, 223, 230);
    border-image: initial;
    outline: none;
    border-radius: 10px;
    background: rgb(220, 223, 230);
    transition: border-color 0.3s ease 0s, background-color 0.3s ease 0s;

    &.disabled {
      cursor: not-allowed;
    }

    &.active {
      &::after {
        left: 100%;
        margin-left: -17px;
      }
    }

    &::after {
      content: "";
      position: absolute;
      top: 1px;
      left: 1px;
      width: 16px;
      height: 16px;
      background-color: rgb(255, 255, 255);
      border-radius: 100%;
      transition: all 0.3s ease 0s;
    }
  }
}
</style>
