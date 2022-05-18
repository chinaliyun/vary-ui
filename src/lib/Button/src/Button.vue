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
import Mixin from "../../../mixin";
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
  background-color: $button-background-color;
  color: $button-color;
  flex-shrink: 0;
  &:hover {
    background-color: darken($button-background-color, 4%);
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
    background-color: $button-primary-background-color;
    color: $button-primary-color;
    &:hover {
      background-color: darken($button-primary-background-color, 12%);
    }
  }
  &.warning {
    background-color: $button-warning-background-color;
    color: $button-warning-color;
    &:hover {
      background-color: darken($button-warning-background-color, 12%);
    }
  }
  &.error {
    background-color: $button-error-background-color;
    color: $button-error-color;
    &:hover {
      background-color: darken($button-error-background-color, 12%);
    }
  }
  &.success {
    background-color: $button-success-background-color;
    color: $button-success-color;
    &:hover {
      background-color: darken($button-success-color, 12%);
    }
  }
  &.border {
    background-color: white;
    border-color: $button-color;
    color: $button-color;
    border-width: 1px;
    border-style: solid;
    &:hover {
      background-color: $button-color;
      border-color: $button-color;
      color: white;
    }
    &.primary {
      border-color: $button-primary-background-color;
      color: $button-primary-background-color;
      &:hover {
        background-color: $button-primary-background-color;
        border-color: $button-primary-background-color;
        color: white;
      }
    }
    &.success {
      border-color: $button-success-background-color;
      color: $button-success-background-color;
      &:hover {
        background-color: $button-success-background-color;
        border-color: $button-success-background-color;
        color: white;
      }
    }
    &.error {
      border-color: $button-error-background-color;
      color: $button-error-background-color;
      &:hover {
        background-color: $button-error-background-color;
        border-color: $button-error-background-color;
        color: white;
      }
    }
    &.warning {
      border-color: $button-warning-background-color;
      color: $button-warning-background-color;
      &:hover {
        background-color: $button-warning-background-color;
        border-color: $button-warning-background-color;
        color: white;
      }
    }
  }
  &.disabled {
    cursor: not-allowed;
    background-color: $button-disabled-background-color;
    color: rgb(189, 189, 189);
    &:hover {
      background-color: $button-disabled-background-color;
    }
  }
}
</style>
