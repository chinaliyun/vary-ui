<template>
  <div class="v_field">
    <div v-if="vertical" class="top_label">
      <div v-if="required" class="star">
        <span>*</span>
      </div>
      <div>
        {{ label }}
      </div>
    </div>
    <div class="inline_row">
      <div
        v-if="inline"
        class="inline_lable_wrapper"
        :class="{ left, center, right, top }"
        :style="labelStyle"
      >
        <div class="inline_label">
          <div v-if="required" class="star inline_star">
            <span>*</span>
          </div>
          {{ label }}
        </div>
      </div>
      <div class="v_field_body">
        <div><slot /></div>
        <div v-if="inline" :class="{ msg, err }">{{ err ? err : msg }}</div>
      </div>
    </div>
    <div v-if="!inline && !vertical && required" class="star outer_star">
      <span>*</span>
    </div>
    <div v-if="!inline" :class="{ msg, err }">{{ err ? err : msg }}</div>
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
    inline: {
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
  // width: 100%;
  position: relative;
  .v_field_body {
    flex-grow: 1;
  }
  .top_label {
    display: flex;
    align-items: center;
    padding-bottom: 4px;
  }
  .star {
    width: 17px;
    color: red;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .inline_row {
    display: flex;
    .inline_lable_wrapper {
      flex-shrink: 0;
      padding-right: 10px;
      display: flex;
      align-items: center;
      // height: 40px;
      // line-height: 40px;
      &.left {
        justify-content: flex-start;
      }
      &.center {
        justify-content: center;
      }
      &.right {
        justify-content: flex-end;
      }
      &.top {
        align-self: flex-start;
      }
      .inline_label {
        position: relative;
      }
      .inline_star {
        position: absolute;
        left: -14px;
        top: 0;
      }
    }
  }
  .outer_star {
    position: absolute;
    right: -14px;
    top: 0;
    bottom: 0;
    height: 38px;
    margin-left: 7px;
  }
  .msg {
    margin-top: 4px;
    font-size: 12px;
    color: $warning-color;
  }
  .err {
    margin-top: 4px;
    color: red;
    font-size: 12px;
    animation: show 0.5s linear;
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
