<template>
  <div class="v_field" :class="{ vertical }">
    <div
      v-if="label"
      class="v_field_label"
      :class="{ vertical, left, center, right }"
      :style="labelStyle"
    >
      <div v-if="required" class="star inline_star">
        <span>*</span>
      </div>
      <div>
        {{ label }}
      </div>
    </div>
    <div class="v_field_body" :class="{ vertical }">
      <slot />
      <div :class="{ msg, err }">{{ err ? err : msg }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VarField",
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: String,
    required: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    labelWidth: {
      type: [String, Number],
      default: 0,
    },
    left: Boolean,
    right: Boolean,
    center: Boolean,
    err: String,
    msg: String,
  },
  data() {
    return {
      labelStyle: {},
    };
  },
  computed: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.inline && this.vertical) {
        throw new Error(
          "The inline and vertical attributes cannot be set at the same time"
        );
      }
      const { labelWidth } = this;
      if (labelWidth) {
        const style = {};
        if (/^\d+$/.test(labelWidth) && labelWidth > 0) {
          style.width = labelWidth + "px";
        }

        if (/^\d+%$/.test(labelWidth) && labelWidth > 0) {
          style.width = labelWidth;
        }
        this.labelStyle = style;
      }
    },
  },
};
</script>

<style lang="scss" >
.v_field {
  display: flex;
  align-items: center;
  &.vertical {
    display: block;
  }
  .v_field_label {
    flex-shrink: 0;
    padding-right: 10px;
    position: relative;
    &.left {
      text-align: left;
    }
    &.center {
      text-align: center;
    }
    &.right {
      text-align: right;
    }
    &.vertical {
      padding: 6px 0;
      .inline_star {
        top: 8px;
      }
    }
    .inline_star {
      position: absolute;
      left: -14px;
      top: 0;
      width: 17px;
      color: red;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .v_field_body {
    flex-grow: 1;
    display: flex;
    align-items: center;
    .msg,
    .err {
      font-size: 12px;
      padding: 0 10px;
      animation: show 0.5s linear;
      flex-shrink: 0;
    }
    .msg {
      color: $message-color;
    }
    .err {
      color: $error-color;
    }
    &.vertical {
      display: block;
      .msg,
      .err {
        padding: 6px 0;
      }
    }
  }
  @keyframes show {
    0% {
      opacity: 0;
      top: -20px;
    }
    100% {
      opacity: 1;
      top: 0px;
    }
  }
}
</style>
