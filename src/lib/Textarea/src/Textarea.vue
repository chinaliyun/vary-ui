<template>
  <div
    class="v_textarea"
    :class="{ focus: focus }"
    :style="{ width: bounding.width }"
  >
    <div v-if="$slots.prefix" class="prefix">
      <slot name="prefix"></slot>
    </div>
    <textarea
      ref="input"
      class="input"
      v-bind="$attrs"
      :value="realValue"
      :style="{ height: bounding.height }"
      @input="inputChange"
      @focus="inputFocus"
      @blur="inputBlur"
      @keyup.enter="$emit('enter', value)"
    >
    </textarea>

    <div v-if="$slots.suffix" class="suffix">
      <slot name="suffix"> </slot>
    </div>
  </div>
</template>

<script>
import Mixin from "../../../mixin";
export default {
  name: "VarTextarea",
  mixins: [Mixin],
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    height: {
      type: Number,
      default: 0,
    },
    h: {
      type: [Number, String],
      default: 150,
    },
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      realValue: "",
      focus: false,
    };
  },
  watch: {
    value(v) {
      this.realValue = v;
    },
  },
  mounted() {
    this.realValue = this.value;
  },
  methods: {
    inputChange(e) {
      if (e.inputType === "insertText") {
        this.$emit(
          "change",
          this.$refs.input.value.replace(/(^\s)|(\s$)/g, "")
        );
        return;
      }
      const value = this.$refs.input.value.replace(/(^\s)|(\s$)/g, "");
      this.$emit("change", value);
    },
    inputFocus() {
      this.$emit("focus");
      this.focus = true;
    },
    inputBlur() {
      this.$emit("blur");
      this.focus = false;
      this.$emit("change", this.$refs.input.value.replace(/(^\s)|(\s$)/g, ""));
    },
  },
};
</script>

<style lang="scss" >
.v_textarea {
  position: relative;
  border: 1px solid $border-color;
  background-color: white;
  border-radius: 4px;
  transition: all 0.2s linear;
  overflow: hidden;
  &.focus {
    border-color: $main-color;
  }
  &.has_msg {
    padding-bottom: 40px;
  }
  .input {
    width: 100%;
    display: block;
    resize: none;
    padding: 10px;
    border: none;
    outline: none;
    line-height: 1.5em;
    &::-webkit-input-placeholder {
      color: rgb(204, 204, 204);
      font-weight: 400;
      font-size: 14px;
    }
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background-color: #eeeeee;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #d1d1d1;
      border-radius: 100px;
    }
  }
  .prefix,
  .suffix {
    padding: 10px;
  }
  .msg {
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    text-align: right;
    color: #999;
    font-size: 12px;
  }
}
</style>
