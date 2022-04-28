<template>
  <div
    ref="v_datetime_picker"
    class="v_datetime_picker"
    :class="{ has_value: showValue }"
    :style="realStyle"
    @click="openPicker"
  >
    <div flex middle class="show_value">
      {{ showValue || placeholder }}
    </div>
    <div v-if="clearable" class="clear_icon" @click.stop="clearValue">
      <IconClear class="img" />
    </div>
    <div class="arrow_icon" :class="{ open: listVisible }">
      <IconArrow class="img" />
    </div>

    <div
      class="picker_dialog"
      :class="{
        show: listVisible,
        align_bottom: alignBottom,
        align_right: alignRight,
      }"
    >
      <div v-if="!alignBottom" class="arrow_top"></div>
      <div class="dialog_container">
        <!-- 控制按钮使用所有场景, 按钮功能根据场景设置 -->
        <div flex middle class="control_row" @click.stop="">
          <div class="prev_year point_hover" @click="prevYear">
            <IconYear class="icon" />
          </div>
          <div
            v-show="pickerType === 3"
            class="prev_month point_hover"
            @click="prevMonth"
          >
            <IconMonth class="icon" />
          </div>
          <div grow flex center class="current">
            <div @click="changePicker(1)">{{ yearValue }}年</div>
            <div @click="changePicker(2)">{{ monthValue }}月</div>
          </div>
          <div
            v-show="pickerType === 3"
            class="next_month point_hover"
            @click="nextMonth"
          >
            <IconMonth class="icon" />
          </div>
          <div class="next_year point_hover" @click="nextYear">
            <IconYear class="icon" />
          </div>
        </div>
        <div v-if="pickerType === 1" class="year_list">
          <div flex class="year_row" fill wrap>
            <div
              v-for="item in yearDict"
              :key="item.value"
              flex
              center
              middle
              class="year_item"
              :class="{ gray: item.gray, selected: item.value === yearValue }"
              @click="selectYear(item, $event)"
            >
              <div flex center middle class="text">
                {{ item.value }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="pickerType === 2" class="month_list">
          <div flex class="month_row" fill wrap>
            <div
              v-for="item in monthDict"
              :key="item.value"
              flex
              center
              middle
              class="month_item"
              :class="{
                gray: item.gray,
                selected: item.value === monthValue && yearValue === todayYear,
              }"
              @click="selectMonth(item, $event)"
            >
              <div flex center middle class="text">
                {{ item.text }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="pickerType === 3" class="date_list">
          <div flex class="week_row" fill>
            <div
              v-for="item in weekDict"
              :key="item"
              w="50"
              flex
              center
              middle
              class="week_item"
            >
              {{ item }}
            </div>
          </div>
          <div flex class="date_row" fill wrap>
            <div
              v-for="item in dateDict"
              :key="item.value"
              flex
              center
              middle
              class="date_item"
              :v="item.value"
              :class="{
                gray: item.gray,
                selected: item.value === showValue,
                today: todayDate == item.value,
                disabled: item.disabled,
              }"
              @click="selectDate(item, $event)"
            >
              <div flex center middle class="text">
                {{ item.text }}
              </div>
            </div>
          </div>
        </div>
        <!-- <div flex right middle class="submit_row">
          <div class="cancel_btn">取消</div>
          <div class="confirm_btn" @click="submitValue">确定</div>
        </div> -->
      </div>
      <div v-if="alignBottom" class="arrow_bottom"></div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import IconYear from "./icons/year";
import IconMonth from "./icons/month.vue";
import IconClear from "./icons/clear.vue";
import IconArrow from "./icons/arrow.vue";
function zero(v) {
  return v < 10 ? "0" + v : v;
}
export default {
  name: "AdmDatetimePicker",
  components: {
    IconYear,
    IconMonth,
    IconClear,
    IconArrow,
  },
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    year: {
      type: Boolean,
      default: false,
    },
    month: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [String, Number],
      default: "",
    },
    w: {
      type: [String, Number],
      default: "",
    },
    pickerOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      mode: 3,
      showValue: "", // 要展示的值
      listVisible: false, // 是否显示
      alignBottom: false,
      alignRight: false,
      yearValue: "",
      monthValue: "",
      dateValue: "",
      hourValue: "",
      minuteValue: "",
      dateDict: [], // 要显示的日期
      monthDict: [],
      weekDict: ["日", "一", "二", "三", "四", "五", "六"],
      yearDict: [],
      pickerType: 3, // picker内容, 1=年,2=月,3=日
      todayYear: "",
      todayMonth: "",
      todayDate: "",
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
    value() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const today = moment();
      this.todayYear = today.format("YYYY");
      this.todayMonth = today.format("MM");
      this.todayDate = today.format("YYYY-MM-DD");
      let now;
      if (this.value) {
        now = moment(this.value);
      } else {
        now = moment();
        this.showValue = "";
      }
      this.yearValue = now.format("YYYY") + ""; // 年份
      this.monthValue = now.format("MM"); // 月份
      this.dateValue = now.format("DD"); // 日期
      this.hourValue = now.format("HH");
      this.minuteValue = now.format("mm");
      if (this.value) {
        this.mapShowValue();
      }
    },
    changePicker(v) {
      this.pickerType = v;
      switch (v) {
        case 1:
          this.initYear();
          break;
        case 2:
          this.initMonth();
          break;
        case 3:
          this.initDate();
          break;
      }
    },
    initYear() {
      let beginYear = this.yearValue - (this.yearValue % 20);
      const list = [];
      for (let i = 0; i < 20; i++) {
        list.push({
          text: beginYear, // 显示的文字
          value: beginYear++ + "", // 样式对比
        });
      }
      this.yearDict = list;
    },
    selectYear(item, e) {
      // 选择年份
      // 如果只是选择到年, 直接关闭, 如果选择到其他, 要组织冒泡
      this.yearValue = item.value;
      if (this.mode > 1) {
        this.changePicker(2);
        e.stopPropagation();
      }
    },

    initMonth() {
      // 计算要显示的月份
      this.monthDict = [
        { text: "一月", value: "01" },
        { text: "二月", value: "02" },
        { text: "三月", value: "03" },
        { text: "四月", value: "04" },
        { text: "五月", value: "05" },
        { text: "六月", value: "06" },
        { text: "七月", value: "07" },
        { text: "八月", value: "08" },
        { text: "九月", value: "09" },
        { text: "十月", value: "10" },
        { text: "十一月", value: "11" },
        { text: "十二月", value: "12" },
      ];
    },
    selectMonth(item, e) {
      // 选择月份
      // 如果只是选择到月, 直接关闭选择器, 如果选择到日, 只需要切换pickerType
      this.monthValue = item.value;
      if (this.mode > 2) {
        this.changePicker(3);
        e.stopPropagation();
      }
    },

    initDate() {
      // 计算要显示的日期
      const date = moment();
      // 获取本月1号是周几
      const firstDate = date
        .set("year", parseInt(this.yearValue, 10))
        .month(parseInt(this.monthValue, 10) - 1)
        .set("date", 1);
      // 获取1号对应的是周几
      const firstWeek = firstDate.weekday();
      // 当前显示的日历中第一天时间戳
      let firstDateTimeStamp =
        firstDate.toDate().getTime() - firstWeek * 24 * 60 * 60 * 1000;
      const dateList = [];
      for (let i = 0; i < 42; i++) {
        const d = new Date();
        d.setTime(firstDateTimeStamp);
        const value = moment(d).format("YYYY-MM-DD"); // 对比已选中日期, 添加样式
        const text = moment(d).format("D") + ""; // 不带0
        dateList.push({
          gray:
            parseInt(d.getMonth(), 10) + 1 !== parseInt(this.monthValue, 10),
          value,
          text,
          disabled: this.pickerOptions.disabledDate
            ? this.pickerOptions.disabledDate(new Date(value))
            : false,
        });
        firstDateTimeStamp += 24 * 60 * 60 * 1000;
      }
      this.dateDict = dateList;
    },

    selectDate(item, e) {
      if (item.disabled) {
        e.stopPropagation();
        return;
      }

      // 选择日期
      this.dateValue = item.value.slice(-2);
      this.monthValue = item.value.slice(5, 7);
      this.yearValue = item.value.slice(0, 4);
      this.showValue = item.value;
      this.mapShowValue();
      if (this.mode > 3) {
        e.stopPropagation();
      }
    },
    mapShowValue() {
      this.showValue = "";
      const { mode, yearValue, monthValue, dateValue, hourValue, minuteValue } =
        this;
      let str = "";
      str = `${yearValue}`;
      if (mode >= 2) {
        str += `-${monthValue}`;
      }
      if (mode >= 3) {
        str += `-${dateValue}`;
      }
      if (mode >= 4) {
        str += `-${hourValue}`;
      }
      if (mode >= 5) {
        str += `-${minuteValue}`;
      }
      this.showValue = str;
      this.$emit("change", this.showValue);
    },
    nextMonth() {
      if (parseInt(this.monthValue, 10) === 12) {
        this.monthValue = zero(1);
        this.yearValue++;
      } else {
        this.monthValue = zero(++this.monthValue);
      }
      this.initDate();
    },
    prevMonth() {
      if (parseInt(this.monthValue) === 1) {
        this.monthValue = 12;
        this.yearValue--;
      } else {
        this.monthValue = zero(--this.monthValue);
      }
      this.initDate();
    },
    nextYear() {
      if (this.yearValue < 3000) {
        this.yearValue++;
        this.initDate();
      }
    },
    prevYear() {
      if (this.pickerType === 1) {
        // 年份选择, 一次切换20个
        this.yearValue -= 20;
      } else {
        // 非年份选择,年份减一
        this.yearValue--;
      }
      this.initDate();
    },
    clearValue() {
      this.showValue = "";
      this.$emit("change", "");
    },
    submitValue() {
      this.$emit("change", this.showValue);
    },
    closePicker() {
      this.listVisible = false;
    },
    openPicker() {
      // mode: year month date time datetime
      // year 1 直接显示年份选择器
      // month 2 显示月份选择器
      // date 3 显示日期选择器
      // time 4 显示时间选择器
      // datetime 5 日期时间选择器

      // if (this.date || this.datetime) {
      this.mode = "3";
      this.changePicker(3);
      // return;
      // }
      if (this.month) {
        this.mode = "2";
        this.changePicker(2);
        return;
      }
      if (this.year) {
        this.mode = "1";
        this.changePicker(1);
        return;
      }
      // 打开下拉窗口
      if (!this.listVisible) {
        setTimeout(() => {
          window.addEventListener("click", this.closePicker, {
            once: true,
          });
        }, 200);

        this.listVisible = true;
        // const ele = this.$refs.v_datetime_picker.getBoundingClientRect();
        // if (window.innerHeight - (ele.top + ele.height) > 200) {
        //   // 如果距离可视区域底部大于200px, 显示在输入框上方
        //   this.alignBottom = false;
        // } else {
        //   // 如果距离可视区域底部大于200px, 显示在输入框下方
        //   this.alignBottom = true;
        // }
        // if (window.innerWidth - (ele.left + ele.width) > 200) {
        //   // 如果距离可视区域右侧大于200px, 左对齐
        //   this.alignRight = false;
        // } else {
        //   // 如果距离可视区域右侧大于200px, 右对齐
        //   this.alignRight = true;
        // }
      } else {
        this.listVisible = false;
      }
    },
  },
};
</script>
<style lang="scss" >
.v_datetime_picker {
  border: 1px solid $border-color;
  background-color: white;
  border-radius: 4px;
  height: 36px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
  position: relative;
  user-select: none;
  .show_value {
    flex-grow: 1;
    display: flex;
    font-size: 14px;
    align-items: center;
    color: rgb(207, 207, 207);
  }
  .arrow_icon {
    flex-shrink: 0;
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
    padding: 0 10px;
    position: absolute;
    background-color: white;
    right: 1px;
    top: 1px;
    bottom: 1px;
    z-index: 1;
    display: none;
    .img {
      width: 16px;
      height: 16px;
    }
  }

  &.has_value {
    .show_value {
      color: rgb(80, 80, 80);
    }
    &:hover {
      .clear_icon {
        display: flex;
        align-items: center;
      }
    }
  }

  .picker_dialog {
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
    .dialog_container {
      color: rgb(114, 119, 146);
      width: 300px;
      min-width: 150px;
      background-color: white;
      border: 1px solid rgb(228, 228, 228);
      padding: 4px 0;
      border-radius: 4px;
      display: inline-block;
      vertical-align: top;
      overflow: hidden;
      .control_row {
        height: 40px;
        padding: 0 14px;
        border-bottom: 1px solid $border-color2;
        display: flex;
        align-items: center;
      }
      .year_row,
      .week_row,
      .date_row,
      .month_row {
        display: flex;
        flex-wrap: wrap;
        color: rgb(53, 53, 53);
      }
      .year_item,
      .month_item,
      .week_item,
      .date_item {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: lighter;
        .text {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        &.today {
          color: $main-color;
          font-weight: bold;
        }
      }
      .week_item,
      .date_item {
        width: 14.22222%;
        height: 34px;
        .text {
          width: 26px;
          height: 26px;
          border-radius: 20px;
          transition: all 0.2s linear;
          &:hover {
            background-color: $border-color2;
          }
        }
        &.gray {
          color: rgb(219, 219, 219);
        }
        &.selected {
          .text {
            background-color: $main-color;
            color: white;
          }
        }
      }
      .week_item {
        font-weight: bold;
      }
      .date_item {
        cursor: pointer;
        &:hover {
          color: $main-color;
        }
      }
      .date_item.disabled,
      .date_item.disabled div {
        background-color: #f5f7fa;
        cursor: not-allowed;
        color: #c0c4cc;
      }
      .year_item {
        width: 20%;
        height: 60px;
        cursor: pointer;
        color: rgb(83, 83, 83);
        .text {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          border-radius: 100px;
        }
        &.selected {
          .text {
            background-color: $main-color;
            color: white;
          }
        }
      }
      .month_item {
        width: 25%;
        height: 80px;
        cursor: pointer;
        font-weight: normal;
        .text {
          padding: 6px;
          border-radius: 100px;
        }
        &.selected {
          .text {
            background-color: $main-color;
            color: white;
          }
        }
      }
      .current {
        font-size: 16px;
        flex-grow: 1;
        display: flex;
        justify-content: center;
      }
      .svg,
      .svg_hover {
        display: block;
        width: 17px;
        height: 17px;
      }
      .svg_year {
        display: block;
        width: 14px;
        height: 14px;
      }
      .prev_year,
      .prev_month {
        transform: rotate(180deg);
      }
      .point_hover {
        cursor: pointer;
        .icon {
          display: block;
          width: 16px;
          height: 16px;
          fill: #c0c4cc;
        }
        &:hover {
          .icon {
            fill: red;
          }
        }
        // .svg_hover {
        //   display: none;
        // }
        // &:hover {
        //   .svg {
        //     display: none;
        //   }
        //   .svg_hover {
        //     display: block;
        //   }
        // }
      }

      .prev_year,
      .next_year {
        .icon {
          width: 14px;
          height: 14px;
        }
      }
    }
    .submit_row {
      padding: 10px 10px 6px 0;
      font-size: 12px;
      .cancel_btn {
        width: 40px;
        text-align: center;
        color: #666;
        margin-right: 10px;
        padding: 2px 4px;
        transition: all 0.2s linear;
        border-radius: 2px;
        &:hover {
          background-color: $border-color2;
        }
      }
      .confirm_btn {
        width: 40px;
        text-align: center;
        color: $main-color;
        border: 1px solid $main-color;
        padding: 2px 4px;
        border-radius: 2px;
        transition: all 0.2s linear;
        &:hover {
          background-color: $main-color;
          color: white;
        }
      }
    }
  }
}
</style>
