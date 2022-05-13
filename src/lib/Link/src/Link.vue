<template>
  <div
    class="v_link"
    :class="{ primary, warning, error, success, disabled }"
    @click.stop="clickTrigger"
  >
    <var-scene flex center middle>
      <slot name="prefix" />
      <slot />
    </var-scene>
  </div>
</template>

<script>
import { debounce } from "../../../utils";
export default {
  name: "VarLink",
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
.v_link {
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  color: $link-color;
  flex-shrink: 0;
  &:hover {
    color: darken($link-color, 4%);
  }
  .prefix_icon {
    padding-right: 4px;
  }
  &.primary,
  &.warning,
  &.error,
  &.success {
    border: none;
  }
  &.primary {
    color: $link-primary-color;
    &:hover {
      color: darken($link-primary-color, 12%);
    }
  }
  &.warning {
    color: $link-warning-color;
    &:hover {
      color: darken($link-warning-color, 12%);
    }
  }
  &.error {
    color: $link-error-color;
    &:hover {
      color: darken($link-error-color, 12%);
    }
  }
  &.success {
    color: $link-success-color;
    &:hover {
      color: darken($link-success-color, 12%);
    }
  }
  &.disabled {
    cursor: not-allowed;
    color: $link-disabled-color;
    &:hover {
      color: $link-disabled-color;
    }
  }
}
</style>
