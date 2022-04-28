<template>
  <div class="v_checkbox">
    <div
      class="v_body"
      :class="{
        checkbox_selected: realValue,
        checkbox_disabled: disabled,
        checkbox_readonly: readonly,
      }"
      @click="changeCheckboxStatus"
    >
      <div class="real_radiobox">
        <div v-if="realValue" class="circle"></div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import { isBoolean } from "@/utils";
export default {
  name: "VarRadio",
  model: {
    prop: "name",
    event: "change",
  },
  props: {
    name: {
      type: [String, Number],
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      realValue: false, // 它的作用仅仅是为了判断是否让控件被选中
    };
  },
  watch: {
    name(v) {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (isBoolean(this.name)) {
        this.realValue = this.name;
      } else if (this.value && this.name === this.value) {
        this.realValue = true;
      } else {
        this.realValue = false;
      }
    },
    changeCheckboxStatus() {
      if (!this.disabled && !this.readonly) {
        this.realValue = true;
        if (isBoolean(this.value)) {
          this.$emit("change", true);
        } else {
          this.$emit("change", this.value || "");
        }
      }
    },
  },
};
</script>

<style lang="scss" >
.v_checkbox {
  user-select: none;
  display: inline-block;
  vertical-align: middle;
  .v_body {
    height: 22px;
    display: flex;
    align-items: center;
    .real_radiobox {
      width: 14px;
      height: 14px;
      border-radius: 100px;
      background-color: white;
      border: 1px solid $border-color;
      transition: background-color 0.2s linear, border-color 0.2s linear;
      margin-right: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .circle {
      width: 4px;
      height: 4px;
      border-radius: 4px;
      background-color: white;
    }
    &.checkbox_selected {
      .real_radiobox {
        background-color: $main-color;
        border-color: $main-color;
      }
    }
  }
}
</style>
