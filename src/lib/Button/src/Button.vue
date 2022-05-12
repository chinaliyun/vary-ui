<template>
  <button
    class="v_button"
    :class="{ primary, warning, error, success, border, disabled }"
    :style="bounding"
    @click.stop="clickTrigger"
  >
    <var-scene flex center middle>
      <slot name="prefix" />
      <slot />
    </var-scene>
  </button>
</template>

<script>
import { debounce } from "../../../utils";
import Mixin from "../../Mixin";
export default {
  name: "VarButton",
  mixins: [Mixin],
  props: {
    wait: {
      type: [String, Number, Boolean],
      default: "800",
    },
    prefixIcon: {
      type: String,
      default: "",
    },
    primary: Boolean,
    warning: Boolean,
    error: Boolean,
    success: Boolean,
    border: Boolean,
    disabled: Boolean,
  },

  data() {
    return {
      realWait: 0,
      classAttrs: [],
      styleMap: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const style = {};
      const width = this.w || this.width;
      if (/^\d+$/.test(width) && width > 0) {
        style.width = width + "px";
        this.styleMap = style;
      }
      if (this.wait === false) {
        this._clickTrigger = () => {
          this.$emit("click");
        };
      } else {
        this.realWait = 1000;
        const { wait } = this.wait;
        if (/^\d+$/.test(wait) && wait > 0) {
          this.realWait = parseInt(wait);
        }
        this._clickTrigger = debounce(
          function () {
            this.$emit("click");
          },
          this.realWait,
          {
            leading: true,
            trailing: false,
          }
        );
      }
    },
    clickTrigger() {
      if (!this.disabled) {
        this._clickTrigger();
      }
    },
  },
};
</script>

<style lang="scss" >
.v_button {
  min-width: 50px;
  border: 1px solid transparent;
  border-radius: 4px;
  height: 36px;
  cursor: pointer;
  transition: background 0.1s linear;
  outline: none;
  font-size: 14px;
  background-color: rgb(243, 243, 243);
  color: #333;
  flex-shrink: 0;
  &:hover {
    background-color: darken($border-color, 4%);
  }
  .prefix_icon {
    padding-right: 4px;
  }
  &.primary,
  &.warning,
  &.error,
  &.success {
    color: white;
    border: none;
  }
  &.primary {
    background-color: $main-color;
    &:hover {
      background-color: darken($main-color, 12%);
    }
  }
  &.warning {
    background-color: $warning-color;
    &:hover {
      background-color: darken($warning-color, 12%);
    }
  }
  &.error {
    background-color: $error-color;
    &:hover {
      background-color: darken($error-color, 12%);
    }
  }
  &.success {
    background-color: $success-color;
    &:hover {
      background-color: darken($success-color, 12%);
    }
  }
  &.border {
    background-color: white;
    border-color: $border-color;
    color: $font-color;
    border-width: 1px;
    border-style: solid;
    &:hover {
      background-color: darken($border-color, 13%);
    }
    &.primary {
      border-color: $main-color;
      color: $main-color;
    }
    &.success {
      border-color: $success-color;
      color: $success-color;
    }
    &.error {
      border-color: $error-color;
      color: $error-color;
    }
    &.warning {
      border-color: $warning-color;
      color: $warning-color;
    }
  }
  &.disabled {
    cursor: not-allowed;
    background-color: $border-color2;
    color: rgb(189, 189, 189);
    &:hover {
      background-color: $border-color2;
    }
  }
}
</style>
