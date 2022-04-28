<template>
  <div class="v_select" :style="realStyle">
    <div
      ref="v_select_trigger"
      class="v_select_trigger"
      :class="{ has_value: showValue.length > 0, disabled }"
      @click="openList"
    >
      <div class="real_value">
        {{ showValue.length == 0 ? placeholder : showValue.join(" / ") }}
      </div>
      <div class="control_column">
        <div v-if="clearable" class="clear_icon" @click.stop="clearValue">
          <IconClear class="img" />
        </div>
        <div class="arrow_icon" :class="{ open: listVisible }">
          <IconArrow class="img" />
        </div>
      </div>
    </div>
    <div
      class="select_list"
      :class="{
        show: listVisible,
        align_bottom: alignBottom,
        align_right: alignRight,
      }"
    >
      <div v-if="!alignBottom" class="arrow_top"></div>
      <div
        v-for="(group, groupIndex) in treeDict"
        :key="groupIndex"
        class="list_body"
      >
        <div class="list_scroll">
          <div
            v-for="item in group"
            :key="item[keyNode]"
            class="select_item"
            :class="{
              selected: showValue.includes(item[labelNode]),
              disabled: item.disabled,
            }"
            @click="selectItem(item, $event)"
            @mouseenter="showNextLevel(item, groupIndex)"
          >
            <div class="label">{{ item[labelNode] }}</div>
            <IconArrow v-if="isArray(item[childrenNode])" class="arrow_icon" />
          </div>
        </div>
      </div>
      <div v-if="alignBottom" class="arrow_bottom"></div>
    </div>
  </div>
</template>
<script>
import IconClear from "./icons/clear";
import IconArrow from "./icons/arrow.vue";
export default {
  name: "AdmSelect",
  model: {
    prop: "value",
    event: "change",
  },
  components: {
    IconClear,
    IconArrow,
  },
  props: {
    value: {
      type: [String, Number, Array],
      default: "",
    },
    data: {
      type: Array,
      default() {
        return [
          {
            name: "无数据",
            id: "",
          },
        ];
      },
    },
    labelNode: {
      type: String,
      default: "name",
    },
    keyNode: {
      type: String,
      default: "id",
    },
    valueNode: {
      type: String,
      default: "id",
    },
    childrenNode: {
      type: String,
      default: "children",
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    range: {
      type: [String, Number],
      default: "",
    },
    width: [String, Number], // width:
    w: [String, Number], // width
  },
  data() {
    return {
      showValue: [],
      listVisible: false,
      selectValue: [],
      treeDict: [],
      positionStyle: {},
      alignBottom: false,
      alignRight: false,
    };
  },
  computed: {
    realRange() {
      if (/^\d+$/.test(this.range)) {
        return this.range;
      } else {
        return false;
      }
    },
    realStyle() {
      const style = {};
      const width = this.width || this.w;
      if (width) {
        style.width = /(%|px)$/.test(width) ? width : width + "px";
      }
      return style;
    },
    isSingleData() {
      // 原始类型数据
      return (
        Object.prototype.toString
          .call(this.data[0])
          .toLowerCase()
          .slice(-7, -1) !== "object"
      );
    },
  },
  watch: {
    data(v, o) {
      if (v && v.length) {
        this.init();
      }
    },
    value() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    initShowValue(list) {
      const findItem = list.find((row) =>
        this.value.includes(row[this.valueNode] + "")
      );
      // 如果没有children,直接返回label
      // 如果有children, 递归查找
      if (findItem) {
        this.showValue.push(findItem[this.labelNode]);
        this.selectValue.push(findItem);
        if (this.isArray(findItem[this.childrenNode])) {
          this.initShowValue(findItem[this.childrenNode]);
        }
      }
    },
    init() {
      this.selectValue = [];
      if (!this.value) {
        this.showValue = "";
        this.selectedValue = [];
        this.treeDict = [];
        return;
      }
      if (Array.isArray(this.value) && this.value.length > 0) {
        this.showValue = [];
        this.initShowValue(this.data);
      } else {
        if (!this.data.length) {
          return;
        }
        const findItem = this.data.find(
          (row) => row[this.valueNode] + "" === this.value + ""
        );
        if (findItem) {
          this.showValue = [findItem[this.labelNode]];
          this.selectValue.push(findItem);
        } else {
          this.showValue = [];
          this.selectValue = [];
          this.$emit("change", "", []);
        }
      }
    },
    getFullValue() {
      return this.selectValue;
    },
    clearValue() {
      this.selectValue = [];
      this.showValue = [];
      this.$emit("change", "", []);
    },
    selectItem(row, e) {
      // 如果选项disabled为true, 不进行下一步操作
      if (row.disabled) {
        return false;
      }
      if (this.realRange && this.selectValue.length < this.realRange) {
        e.stopPropagation();
        return;
      }
      this.showValue = this.selectValue.map((row) => row[this.labelNode]);
      this.listVisible = false;
      const value = this.selectValue.map((row) => String(row[this.valueNode]));
      if (value.length > 1) {
        this.$emit("change", value, this.selectValue);
      } else {
        this.$emit("change", value[0], this.selectValue);
      }
    },
    openList() {
      if (this.disabled) {
        return;
      }
      if (this.isSingleData) {
        this.treeDict = [
          this.data.map((item) => {
            return {
              name: item,
              id: item,
            };
          }),
        ];
      } else {
        this.treeDict = [this.data];
      }
      if (!this.listVisible) {
        const handler = () => {
          if (this.listVisible) {
            this.listVisible = false;
          }
        };
        setTimeout(() => {
          window.addEventListener("click", handler, {
            once: true,
          });
        }, 200);
        this.listVisible = true;
        const ele = this.$refs.v_select_trigger.getBoundingClientRect();
        if (window.innerHeight - (ele.top + ele.height) > 200) {
          // 如果距离可视区域底部大于200px, 显示在输入框上方
          this.alignBottom = false;
        } else {
          // 如果距离可视区域底部大于200px, 显示在输入框下方
          this.alignBottom = true;
        }
        if (window.innerWidth - (ele.left + ele.width) > 200) {
          // 如果距离可视区域右侧大于200px, 左对齐
          this.alignRight = false;
        } else {
          // 如果距离可视区域右侧大于200px, 右对齐
          this.alignRight = true;
        }
      } else {
        this.listVisible = false;
      }
    },
    isArray(item) {
      return item && Array.isArray(item) && item.length > 0;
    },
    showNextLevel(row, index) {
      // 鼠标经过选项时
      // 如果该选项disabled, 无任何操作
      if (row.disabled) {
        return false;
      }
      // 只要disabled不为true, 都不影响把该项放进缓存值
      let selectValue = [...this.selectValue];
      selectValue[index] = { ...row };
      selectValue = selectValue.slice(0, index + 1);
      this.selectValue = selectValue;
      // 如果选项有子菜单, 添加新的选项列表
      if (
        this.isArray(row[this.childrenNode]) &&
        row[this.childrenNode].length
      ) {
        let treeDict = [...this.treeDict];
        treeDict[index + 1] = row[this.childrenNode];
        treeDict = treeDict.slice(0, index + 2);
        this.treeDict = treeDict;
      } else {
        let treeDict = [...this.treeDict];
        treeDict = treeDict.slice(0, index + 1);
        this.treeDict = treeDict;
      }
    },
  },
};
</script>
<style lang="scss" >
$border-color: rgb(228, 228, 228);
.v_select {
  user-select: none;
  position: relative;
  height: 36px;
  .v_select_trigger {
    border: 1px solid $border-color;
    background-color: white;
    border-radius: 4px;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 10px;
    cursor: pointer;
    .real_value {
      flex-grow: 1;
      color: rgb(207, 207, 207);
      font-size: 14px;
    }
    .control_column {
      width: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .arrow_icon {
      flex-shrink: 0;
      width: 20px;
      transform: rotate(90deg) scale(0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.1s linear;
      &.open {
        transform: rotate(-90deg) scale(0.8);
      }
    }
    .clear_icon {
      // width: 20px;
      // padding: 0 10px;
      // background-color: white;
      display: none;
      align-items: center;
      justify-content: center;
      .img {
        display: block;
        width: 16px;
        height: 16px;
      }
    }
    &.has_value {
      .real_value {
        color: rgb(80, 80, 80);
      }
      &:hover {
        .clear_icon {
          display: flex;
          align-items: center;
        }
        .arrow_icon {
          display: none;
        }
      }
    }
    &.disabled {
      background-color: $border-color2;
      cursor: not-allowed;
      .arrow_icon {
        display: none;
      }
      .clear_icon {
        display: none;
      }
      &:hover {
        .arrow_icon {
          display: none;
        }
        .clear_icon {
          display: none;
        }
      }
    }
  }
  .select_list {
    display: none;
    position: absolute;
    left: 0;
    top: 40px;
    z-index: 10;
    min-width: 100%;
    padding: 10px 0;
    transform-origin: top;
    &.show {
      display: block;
      animation: show 0.08s linear;
    }
    // &.align_right {
    //   right: 0;
    //   left: auto;
    // }
    &.align_bottom {
      top: auto;
      bottom: 40px;
      transform-origin: bottom;
    }
    @keyframes show {
      0% {
        opacity: 0;
        transform: scaleY(0.8);
      }
      100% {
        opacity: 1;
        transform: scaleY(1);
      }
    }
    .arrow_top {
      position: absolute;
      left: 20px;
      top: 6px;
      z-index: 1;
      width: 8px;
      height: 8px;
      transform: rotate(45deg);
      background-color: white;
      border-left: 1px solid $border-color;
      border-top: 1px solid $border-color;
      border-right: none;
      border-bottom: none;
    }
    .arrow_bottom {
      position: absolute;
      left: 20px;
      bottom: 6px;
      z-index: 1;
      width: 8px;
      height: 8px;
      transform: rotate(45deg);
      background-color: white;
      border-right: 1px solid $border-color;
      border-bottom: 1px solid $border-color;
      border-left: none;
      border-top: none;
    }
    white-space: nowrap;
    .list_body {
      min-width: 150px;
      background-color: white;
      border: 1px solid $border-color;
      padding: 4px 0;
      border-radius: 4px;
      display: inline-block;
      vertical-align: top;
      overflow: hidden;
    }
    .list_scroll {
      max-height: 200px;
      overflow-y: auto;
    }
    .list_group {
      display: inline-block;
      width: 100%;
      flex-shrink: 0;
    }
    .select_item {
      height: 40px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      transition: all 0.2s linear;
      cursor: pointer;
      display: flex;
      .label {
        // width: 160px;
        flex-grow: 1;
        margin-right: 10px;
      }
      &:hover {
        background-color: rgb(243, 243, 243);
      }
      &.selected {
        color: rgb(25, 119, 207);
        background-color: rgba(25, 119, 207, 0.068);
      }
      &.disabled {
        color: rgb(201, 201, 201);
        cursor: not-allowed;
      }
    }
  }
}
</style>
