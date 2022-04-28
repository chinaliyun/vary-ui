<template>
  <div
    class="v_link"
    :class="{ primary, warning, error, success, border }"
    @click.stop="clickTrigger"
  >
    <div class="v_link_body">
      <div v-if="prefixIcon" class="prefix_icon" :class="[prefixIcon]"></div>
      <slot />
    </div>
  </div>
</template>

<script>
import { debounce } from "../../../utils";
export default {
  name: "AdmLink",
  props: {
    wait: {
      type: [String, Number, Boolean],
      default: false,
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
  },

  data() {
    return {
      realWait: 0,
      classAttrs: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (Object.prototype.hasOwnProperty.call(this.$props, "wait")) {
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
      } else {
        this._clickTrigger = () => {
          this.$emit("click");
        };
      }
    },
    clickTrigger() {
      this._clickTrigger();
    },
  },
};
</script>

<style lang="scss" >
.v_link {
  display: inline-block;
  cursor: pointer;
  padding: 0 2px;
  .v_link_body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
  }
  .prefix_icon {
    padding-right: 4px;
  }
  &.primary {
    color: $link-color;
  }
  &.warning {
    color: $warning-color;
  }
  &.error {
    color: $error-color;
  }
  &.success {
    color: $success-color;
  }
  &.border {
    border: 1px solid $border-color;
    border-radius: 4px;
    color: $font-color2;
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
}
</style>
