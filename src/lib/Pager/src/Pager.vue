<template>
  <div v-show="total > 0" class="v_pager">
    <div class="total">共 {{ realTotal }} 条数据</div>
    <div class="paper_num">
      <div v-if="splitLeft" class="prev_page" @click="toPrev"></div>
      <!--
      至多显示6个页码,也就是说如果数量超过6页, 增加一个扩展按钮,该按钮点击后直接跳到另一个页面
     -->
      <div
        v-if="splitLeft"
        class="page"
        :class="{ active: realPageNo === 1 }"
        @click="toggleFirst(1)"
      >
        1
      </div>
      <div v-if="splitLeft" class="page">...</div>
      <div
        v-for="item in pageLeft"
        :key="item"
        class="page"
        :class="{ active: realPageNo === item }"
        @click="togglePage(item, true)"
      >
        {{ item }}
      </div>
      <div v-if="splitRight" class="page">...</div>
      <div
        v-if="splitRight"
        class="page"
        :class="{ active: realPageNo === pageCount }"
        @click="toggleLast()"
      >
        {{ pageCount }}
      </div>
      <div v-if="splitRight" class="next_page" @click="toNext"></div>
    </div>
    <var-scene v-if="sizes.length" :pl="12">
      <var-select
        :value="pageSize"
        :data="sizes"
        :w="100"
        :clearable="false"
        @change="(v) => $emit('pageSizeChanged', Number(v))"
      ></var-select>
    </var-scene>
    <var-scene v-if="jumper" flex middle :pl="12">
      前往
      <var-scene :pl="4" :pr="4">
        <var-input
          v-model="jumpPageNo"
          format="6"
          :w="72"
          @blur="changePage"
          @enter="changePage"
        ></var-input>
      </var-scene>
      页
    </var-scene>
  </div>
</template>
<script>
export default {
  name: "VarPager",
  props: {
    pageSize: {
      type: Number,
      default: 10,
    },
    pageNo: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
      required: true,
    },
    pageSizes: {
      type: Array,
      default: () => [],
    },
    jumper: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      realPageSize: 10,
      realPageNo: 1,
      realTotal: 0,
      jumpPageNo: "",
      page: [],
      pageLeft: [],
      pageCount: 0,
      sizes: [],
      splitLeft: false,
      splitRight: false,
    };
  },
  watch: {
    total() {
      this.init();
    },
    pageSize() {
      this.init();
    },
    pageNo(v) {
      if (v !== this.realPageNo) {
        this.togglePage(v);
      }
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.realPageSize = this.pageSize;
      this.realPageNo = this.pageNo;
      this.realTotal = this.total;
      const count = Math.ceil(this.realTotal / this.realPageSize);
      this.pageCount = count;
      let num = 1;
      this.splitLeft = false;
      const page = [];
      while (num <= count) {
        page.push(num++);
      }
      this.page = page;
      if (page.length > 6) {
        this.pageLeft = page.slice(0, 5);
        this.splitRight = true;
      } else {
        this.pageLeft = page;
        this.splitRight = false;
      }
      if (Array.isArray(this.pageSizes)) {
        this.sizes = this.pageSizes.map((v) => {
          return {
            id: v,
            name: `${v}条/页`,
          };
        });
      }
    },
    togglePage(data, isTrust = false) {
      if (data === this.realPageNo) {
        return;
      }
      this.realPageNo = data;
      if (isTrust) {
        this.$emit("pageNoChanged", data);
      }
      if (this.pageCount <= 6) {
        return;
      }
      if (data > 4 && data < this.pageCount - 3) {
        this.pageLeft = this.page.slice(data - 3, data + 2);
        this.splitLeft = true;
        this.splitRight = true;
      } else if (data <= 4) {
        this.pageLeft = this.page.slice(0, 5);
        this.splitLeft = false;
        this.splitRight = true;
      } else if (data >= this.pageCount - 3) {
        this.pageLeft = this.page.slice(-5);
        this.splitRight = false;
        this.splitLeft = true;
      }
    },
    toPrev() {
      if (this.realPageNo === 1) {
        return;
      }
      const nextNo = this.realPageNo - 1;
      this.togglePage(nextNo, true);
    },
    toNext() {
      const nextNo = this.realPageNo + 1;
      if (nextNo > this.pageCount) {
        return;
      }
      this.togglePage(nextNo, true);
    },
    toggleFirst() {
      this.togglePage(1, true);
    },
    toggleLast() {
      this.togglePage(this.page.length, true);
    },
    changePage() {
      if (this.jumpPageNo === "") {
        return;
      }
      if (this.jumpPageNo < 1) {
        this.jumpPageNo = 1;
      }
      if (this.jumpPageNo > this.pageCount) {
        this.jumpPageNo = this.pageCount;
      }
      this.realPageNo = Number(this.jumpPageNo);
      this.$emit("pageNoChanged", this.realPageNo);
    },
  },
};
</script>
<style scoped lang="scss">
.v_pager {
  display: flex;
  align-items: center;
  user-select: none;
  .paper_num {
    display: flex;
    align-items: center;
    user-select: none;
  }
  .paper_num > div {
    cursor: pointer;
    width: 36px;
    height: 36px;
    border-radius: 4px;
    border: 1px solid $border-color;
  }
  .total {
    width: auto;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  .prev_page,
  .next_page,
  .page {
    background-position: center;
    background-color: white;
    background-repeat: no-repeat;
    margin: 0 2px;
    text-align: center;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s linear;
    &:hover {
      color: red;
    }
    &.active {
      color: white;
      background-color: #ff6f17;
      border-color: #ff6f17;
    }
  }
  .prev_page {
    transform: rotate(180deg);
    background-image: url("./arrow.svg");
    &:hover {
      background-image: url("./arrow-hover.svg");
    }
  }
  .next_page {
    background-image: url("./arrow.svg");
    &:hover {
      background-image: url("./arrow-hover.svg");
    }
  }
}
</style>
