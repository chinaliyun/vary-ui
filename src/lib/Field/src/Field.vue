<template>
  <div class="v_field" :class="{ vertical, top }">
    <div
      v-if="label"
      class="v_field_label"
      :class="{ vertical, left, center, right }"
      :style="labelStyle"
    >
      <!-- v_field_label 要用来定义label的宽度, label_name用来添加幸好 -->
      <div class="label_name" :class="{ required }">
        {{ label }}
      </div>
    </div>
    <div class="v_field_body" :class="{ vertical: vertical || (!msg && !err) }">
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
    top: Boolean,
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
  &.top {
    align-items: flex-start;
  }
  .v_field_label {
    flex-shrink: 0;
    padding-right: 10px;
    position: relative;
    display: flex;
    &.left {
      justify-content: flex-start;
    }
    &.center {
      justify-content: center;
    }
    &.right {
      justify-content: flex-end;
    }
    &.vertical {
      padding: 6px 0;
      .inline_star {
        top: 8px;
      }
    }
    .label_name {
      position: relative;
      &.required::before {
        content: "*";
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
      color: $field-tips-color;
    }
    .err {
      color: $field-error-color;
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
