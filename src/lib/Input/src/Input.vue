<template>
  <div class="v_input" :style="realStyle">
    <div
      class="v_input_body"
      :class="{
        focus,
        err,
        disabled,
        readonly,
      }"
      @click.stop=""
    >
      <div class="prefix">
        <slot name="prefix"> </slot>
      </div>
      <div class="input_wrapper">
        <input
          ref="input"
          class="input"
          :class="{
            left: left,
            center: center,
            right: right,
            mini,
          }"
          :value="realValue"
          v-bind="$attrs"
          :autofocus="autofocus"
          :readonly="readonly"
          :disabled="disabled"
          :maxlength="maxlength"
          @input="inputChange"
          @focus="onFocus"
          @blur="onBlur"
          @keyup.enter="enter"
        />
      </div>
      <div
        v-if="!disabled && !readonly && value !== '' && clearable"
        class="clearable"
        @click.stop="clearValue"
      >
        <IconClear />
      </div>
      <div ref="unit" class="suffix_column">
        <slot name="suffix"></slot>
      </div>
    </div>
    <div v-if="optionVisible && data.length > 0" class="options">
      <div class="arrow"></div>
      <div class="option_list">
        <div
          v-for="item in data"
          :key="item"
          class="option_item"
          @click="selectOption(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "../../../utils";
import IconClear from "./icons/clear";
export default {
  name: "VarInput",
  components: {
    IconClear,
  },
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    prefixIcon: {
      type: String,
      default: "",
    },
    value: {
      type: [Number, String],
      default: "",
    },
    format: {
      type: String,
      default: "",
    },
    left: {
      type: Boolean,
      default: true,
    },
    maxlength: {
      type: String,
      default: "200",
    },
    center: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
    err: {
      type: [Boolean, String],
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    mini: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    width: [String, Number], // width:
    w: [String, Number], // width
  },
  data() {
    return {
      focus: false,
      realValue: "",
      optionVisible: false,
      reg: null,
      reg2: null,
      formatType: 1,
    };
  },
  computed: {
    realStyle() {
      const style = {};
      const width = this.width || this.w;
      if (width) {
        style.width = /(%|px)$/.test(width) ? width : width + "px";
      }
      return style;
    },
  },
  watch: {
    value(v, o) {
      // console.log(v, o);
      if (v !== this.realValue) {
        this.init();
      }
    },
    // data(v, o) {
    //   console.log('data', v, o);
    //   this.onFocus();
    // },
  },
  mounted() {
    this.init();
  },
  methods: {
    enter: debounce(function (e) {
      this.$emit("enter", this.value);
    }, 800),
    updateValue() {
      //  this.$refs.input.value = realValue;
      //   this.$emit('change', realValue);
      //   this.
    },
    init() {
      let value = this.value;

      if (/^\d{1,2}$/.test(this.format)) {
        this.formatType = 2;
      }
      if (/^(\d)\.(\d)$/.test(this.format)) {
        this.formatType = 3;
      }
      if (/^\.(\d)$/.test(this.format)) {
        this.formatType = 4;
      }

      if ([2, 3, 4].includes(this.formatType)) {
        value = (this.value + "").replace(/ /g, "");
      }

      if (this.formatType === 1) {
        if (
          this.maxlength &&
          !/[a-z]{1,}('[a-z]{1,})*$/.test(value) &&
          value.length > this.maxlength
        ) {
          this.realValue = value.slice(0, this.maxlength);
          this.$emit("change", this.realValue);
        } else {
          this.realValue = value;
          this.$emit("change", value);
        }
      }
      if (this.formatType === 2) {
        value = value.replace(/^0+(\d)/, "$1");
        this.reg = new RegExp(`^\\d{1,${this.format}}$`);
        this.reg2 = new RegExp(`\\d{1,${this.format}}`);
        // 如果value包含非数字字符, 直接清空, 如果没有直接赋值
        // 否则 如果长度大于format, 截取字符串,
        //      如果长度小于format, 直接使用
        // console.log('%c' + value, 'color:red');
        if (/\D/.test(value)) {
          this.realValue = "";
          this.$emit("change", this.realValue);
        } else {
          this.realValue = value.slice(0, this.format);
          this.$emit("change", this.realValue);
        }
      }
      if (this.formatType === 3) {
        value = value
          .replace(/^0+(\d)/, "$1")
          .replace(/\.0+$/, "")
          .replace(/(\d)0+$/, "$1");
        const integer = this.format.match(/^(\d)\.(\d)$/)[1];
        const decimal = this.format.match(/^(\d)\.(\d)$/)[2];
        this.reg = new RegExp(`^\\d{1,${integer}}(\\.\\d{1,${decimal}})?$`);
        this.reg2 = new RegExp(`\\d{1,${integer}}(\\.\\d{1,${decimal}})?`);
        if (!this.reg2.test(value)) {
          this.realValue = "";
          this.$emit("change", this.realValue);
        } else {
          this.realValue = value.match(this.reg2)[0];
          this.$emit("change", this.realValue);
        }
        return;
      }
      if (this.formatType === 4) {
        value = value
          .replace(/^0+(\d)/, "$1")
          .replace(/\.0+$/, "")
          .replace(/(\d)0+$/, "$1");
        const decimal = this.format.match(/^\.(\d)$/)[1];
        this.reg = new RegExp(`^\\d+(\\.\\d{1,${decimal}})?$`);
        this.reg2 = new RegExp(`\\d+(\\.\\d{1,${decimal}})?`);
        if (!this.reg2.test(value)) {
          this.realValue = "";
          this.$emit("change", this.realValue);
        } else {
          this.realValue = value.match(this.reg2)[0];
          this.$emit("change", this.realValue);
        }
      }
    },

    onFocus() {
      if (this.readonly || this.disabled) {
        return;
      }
      this.focus = true;
      this.$emit("focus");
      this.optionVisible = true;
      if (this.data && this.data.length > 0) {
        window.addEventListener(
          "click",
          () => {
            this.optionVisible = false;
          },
          {
            once: true,
          }
        );
      }
    },
    selectOption(item) {
      this.optionVisible = false;
      this.$emit("change", item, true);
    },
    onBlur() {
      this.$emit("blur");
      // 如果是小数类型, 且输入内容最后只有一个点的时候, 应该去除点
      if ([3, 4].includes(this.formatType) && /\.$/.test(this.value)) {
        this.$emit("change", this.value.replace(/\.$/, ""));
      }
      this.focus = false;
    },
    clearValue() {
      this.$emit("change", "");
      this.realValue = "";
      this.$refs.input.value = "";
      this.$refs.input.focus();
    },
    inputChange(e) {
      this.$emit("input");
      // console.log(e.inputType, e.data, e.target.value);

      const reg = this.reg;
      let v = e.target.value;
      if ([2, 3, 4].includes(this.formatType)) {
        v = e.target.value.replace(/^0(\d)/, "$1");
      }
      if (e.inputType && !e.inputType.startsWith("insert")) {
        // 如果不是插入事件, 主要是为了解决删除字符事件
        if ([3, 4].includes(this.formatType)) {
          // 小数的时候需要特殊处理, 比如删除点后, value值不符合reg规则了, 需要进行处理
          const matchStr = v.trim().match(this.reg2);
          if (matchStr && matchStr[0]) {
            this.$emit("change", matchStr[0].replace(/^0/, ""));
          } else {
            this.$emit("change", v);
          }
        } else {
          this.$emit("change", v);
        }
        return;
      }

      if (e.inputType && e.inputType === "insertFromPaste") {
        // 粘贴事件, 需要对特殊情况进行处理
        if (this.formatType === 2) {
          const matchStr = v.trim().match(this.reg2);
          if (matchStr && matchStr[0]) {
            this.$emit("change", matchStr[0]);
          } else {
            this.$emit("change", v);
          }
        }
        if ([3, 4].includes(this.formatType)) {
          const matchStr = v.trim().match(this.reg2);
          if (matchStr && matchStr[0]) {
            this.$emit("change", matchStr[0]);
          } else {
            this.$emit("change", v);
          }
        }
        // format===''的时候,不做任何处理
        this.$emit("change", v);
        return;
      }

      if (e.inputType && e.inputType === "insertCompositionText") {
        // 中文输入法事件, 要针对情况处理
        // 数字模式下, 直接禁止输入法输入
        if ([2, 3, 4].includes(this.formatType)) {
          this.$refs.input.value = this.value;
          this.$emit("change", this.value);
          return;
        }
        // 非数字模式下,允许中文输入法
        // if (/^[a-z]{1,}('[a-z]{1,})*$/.test(e.data)) {
        //   return
        // } else {
        this.realValue = v;
        this.$emit("change", v);
        // }
        return;
      }

      if (this.formatType === 1) {
        this.$emit("change", v);
        return;
      }

      if (this.formatType === 2) {
        // 整数
        // 如果输入的不是数字,直接删掉输入的字符
        if (!/^\d$/.test(e.data) || !reg.test(v)) {
          // 如果插入的不是数字或点,或者不满足reg的条件(超出限制字符) 直接重置
          this.$refs.input.value = this.value;
          this.$emit("change", this.value);
        } else {
          this.$emit("change", v);
        }
        return;
      }
      if ([3, 4].includes(this.formatType)) {
        // 小数
        if (!/^(\d|\.)$/.test(e.data) || !reg.test(v)) {
          // 如果插入的不是数字或点,或者不满足reg的条件(超出限制字符) 直接重置
          this.$emit("change", this.value);
          this.$refs.input.value = this.value;
        } else {
          this.$emit("change", v);
        }
      }
    },
  },
};
</script>

<style lang="scss" >
.v_input {
  height: 36px;
  position: relative;
  .v_input_body {
    height: 100%;
    display: flex;
    align-items: center;
    border: 1px solid $border-color;
    border-radius: 4px;
    transition: border-color 0.2s linear;
    background-color: white;
    overflow: hidden;
    &.disabled {
      background-color: rgb(245, 245, 245);
    }

    &.err {
      border-color: $error-color;
    }
    &.focus {
      border-color: $main-color;
    }
    .prefix {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .prefix_icon {
      padding-left: 10px;
      // position: absolute;
      // bottom: 0;
      // top: 0;
      height: 100%;
      display: flex;
      align-items: center;
      &::before {
        color: gray;
        font-size: 18px;
      }
    }
    .input_wrapper {
      flex-shrink: 0;
      width: 100px;
      height: 100%;
      flex-grow: 1;
    }
    .input {
      height: 100%;
      width: 100%;
      display: block;
      padding: 0 10px;
      min-width: 30px;
      font-size: 14px;
      border: none;
      color: #333;
      transition: border-color 0.2s linear;
      border-color: transparent;
      flex-shrink: 1;
      &.mini {
        height: 22px;
      }
      &:focus {
        // border: none;
        border-color: $main-color;
        outline: none;
      }
      &:read-only {
        cursor: default;
      }
      &:disabled {
        background-color: transparent;
        cursor: default;
      }
      &::-webkit-input-placeholder {
        color: #c4c4c4;
        font-weight: 400;
        font-size: 14px;
      }

      &.center {
        text-align: center;
      }
      &.right {
        text-align: right;
      }
    }

    .clearable {
      padding-right: 10px;
      cursor: pointer;
      transition: color 0.2s linear;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        width: 20px;
        height: 20px;
        fill: rgb(212, 212, 212);
      }
      &:hover {
        svg {
          fill: #999;
        }
      }
    }
    .suffix_column {
      display: flex;
      flex-shrink: 0;
      align-items: center;
    }
  }

  .options {
    position: absolute;
    left: 0;
    // right: 0;
    top: 36px;
    // max-width: 300px;
    padding-top: 14px;
    animation: show 0.2s linear;
    z-index: 2;
    @keyframes show {
      from {
        top: 30px;
      }
      to {
        top: 36px;
      }
    }
    .arrow {
      width: 10px;
      height: 10px;
      background-color: white;
      border: 1px solid $border-color;
      border-bottom-color: transparent;
      border-right-color: transparent;
      transform: rotate(45deg);
      position: absolute;
      top: 9px;
      left: 10px;
      z-index: 2;
    }
    .option_list {
      border-radius: 4px;
      background-color: white;
      border: 1px solid $border-color;
      box-shadow: 0 0 3px rgba(94, 94, 94, 0.144);
      position: relative;
      padding-top: 6px;
      max-height: 300px;
      overflow-y: auto;
      .option_item {
        height: 36px;
        line-height: 36px;
        padding: 0 10px;
        white-space: nowrap;
        &:hover {
          background-color: rgba(214, 214, 252, 0.144);
        }
        & + .option_item {
          border-top: 1px solid $border-color2;
        }
      }
    }
  }
}
</style>

<!--

init(){
  如果format为数字模式, 对传入value的空格做处理, 一律清空(字符串模式是允许空格的)
  
  如果formatType==2, 表示纯数字
    value要移除前面的非正常0字符
    如果包含非数字, 直接重置为空字符串
    否则, 就从传入值中从左侧截取正确字符数量的字符同步给value(为什么要截取? 因为传入的值可能是纯数字, 但位数超过了需求)

  如果formatType==3, 表示有零有整
    value要移除前面和后面的非正常0字符
    如果包含非[数字点]的字符, 直接重置为空字符串
    否则, 从传入值中取出符合正则的内容,同步给value
}

-->