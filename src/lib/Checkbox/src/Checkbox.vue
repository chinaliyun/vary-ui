<template>
  <div class="v_checkbox">
    <div
      class="v_body"
      :class="{
        checkbox_selected: realValue,
        checkbox_uncertain: realUncertain,
        checkbox_disabled: disabled,
        checkbox_readonly: readonly,
      }"
      @click="changeCheckboxStatus"
    >
      <div class="real_checkbox"></div>
      <div class="label_text">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { isBoolean } from "../../../utils";
let isEmitEvent = false;
export default {
  name: "VarCheckbox",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: [Boolean, Array],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    label: {
      type: [String, Number, Boolean],
      default: "",
    },
    uncertain: {
      // 不确定的
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      realValue: false,
      realUncertain: false,
    };
  },
  watch: {
    value() {
      this.valuePropChanged();
    },
    uncertain: {
      handler() {
        this.uncertainPropChanged();
      },
    },
  },
  mounted() {
    if (!isBoolean(this.value) && !Array.isArray(this.value)) {
      throw new Error("The v-model bind value must be array or boolean");
    }
    if (Array.isArray(this.value) && !this.label) {
      throw new Error(
        "The prop label can not be empty when v-model bind array "
      );
    }
    this.init();
  },
  methods: {
    init() {
      if (this.uncertain) {
        this.uncertainPropChanged();
        return;
      }
      this.valuePropChanged();
    },
    uncertainPropChanged() {
      console.log("uncertainPropChanged", this.uncertain, this.value);
      this.realUncertain = this.uncertain;
      // 理论上来说, 只要uncertain的值变了, 都会把value改为false,
      // 但是value的最终值,要根据val
    },
    valuePropChanged() {
      console.log(
        "valuePropChanged",
        "isEmitEvent:",
        isEmitEvent,
        "this.value:",
        this.value,
        isBoolean(this.value)
      );
      if (isEmitEvent) {
        isEmitEvent = false;
        return;
      }
      this.realUncertain = false;
      if (isBoolean(this.value)) {
        this.realValue = this.value;
      } else if (this.value.includes(this.label)) {
        this.realValue = true;
      } else {
        this.realValue = false;
      }
    },
    changeCheckboxStatus() {
      console.log("changeCheckboxStatus");
      if (this.disabled || this.readonly) {
        return;
      }
      this.realValue = this.realUncertain ? true : !this.realValue;
      console.log("changeCheckboxStatus", this.realValue);

      if (isBoolean(this.value)) {
        this.$emit("change", this.realValue);
      } else if (this.realValue) {
        const res = [...this.value, this.label];
        this.$emit("change", res);
      } else {
        const res = this.value.filter((item) => item !== this.label);
        this.$emit("change", res);
      }
      this.realUncertain = false;
    },
  },
};
</script>

<style lang="scss" >
.v_checkbox {
  display: inline-block;
  vertical-align: middle;
  user-select: none;
  .v_body {
    display: flex;
    align-items: center;
    height: 22px;
    .real_checkbox {
      width: 14px;
      height: 14px;
      border-radius: 2px;
      background-color: white;
      border: 1px solid $checkbox-color;
      transition: background-color 0.2s linear, border-color 0.2s linear;
      margin-right: 4px;
    }
    &.checkbox_selected {
      .real_checkbox {
        background: url("./images/selected.svg") no-repeat center/80%;
        background-color: $checkbox-selected-color;
        border-color: $checkbox-selected-color;
      }
      .label_text {
        color: $checkbox-selected-color;
      }
    }
    &.checkbox_uncertain {
      .real_checkbox {
        background-image: url("./images/uncertain.svg");
        background-color: $main-color;
        border-color: $main-color;
        background-size: contain;
      }
    }
    &.checkbox_disabled {
      .real_checkbox {
        background-color: rgb(233, 233, 233);
        border-color: $border-color;
      }
      .label_text {
        color: #999;
      }
    }
  }
}
</style>
