<template>
  <div
    class="v_table"
    :class="{ left, center, right, border }"
    @mouseleave="hoverLineIndex = -1"
  >
    <div class="v_table_wrapper">
      <div class="v_table_conainer">
        <table class="v_table_left v_table_node">
          <tr class="v_table_row v_table_thead" ref="row">
            <template v-for="(col, colIndex) in copyColumns">
              <th
                :key="col.prop"
                class="v_table_cell"
                :data-fixed="col.fixed"
                v-if="col.fixed === 'left'"
                :style="{ width: col.computedWidth }"
              >
                <slot
                  :name="col.prop + '_th'"
                  v-bind="{ col, index: colIndex, data }"
                >
                  <div
                    class="v_default_cell"
                    :style="{ ...headStyle, ...(col.headStyle || {}) }"
                  >
                    {{ col.label }}
                  </div>
                </slot>
              </th>
            </template>
          </tr>
          <tr
            v-for="(row, rowIndex) in data"
            :key="row.id"
            class="v_table_row v_table_trow"
            :class="{ hover: rowIndex === hoverLineIndex }"
            ref="row"
            @mouseenter="mouseenterLine(rowIndex)"
          >
            <template v-for="col in copyColumns">
              <td
                :key="col.prop"
                class="v_table_cell"
                v-if="col.fixed === 'left'"
                :style="{
                  width: col.computedWidth,
                  height: rowsHeight[rowIndex],
                }"
              >
                <slot
                  :name="[col.prop]"
                  v-bind="{ row, index: rowIndex, data }"
                >
                  <div
                    class="v_default_cell"
                    :style="{ ...rowStyle, ...(col.rowStyle || {}) }"
                  >
                    {{ row[col.prop] }}
                  </div>
                </slot>
              </td>
            </template>
          </tr>
        </table>
        <table class="v_table_right v_table_node">
          <tr class="v_table_row v_table_thead" ref="row">
            <template v-for="(col, colIndex) in copyColumns">
              <th
                :key="col.prop"
                class="v_table_cell"
                :data-fixed="col.fixed"
                v-if="col.fixed === 'right'"
              >
                <slot
                  :name="col.prop + '_th'"
                  v-bind="{ col, index: colIndex, data }"
                >
                  <div
                    class="v_default_cell"
                    :style="{ ...headStyle, ...(col.headStyle || {}) }"
                  >
                    {{ col.label }}
                  </div>
                </slot>
              </th>
            </template>
          </tr>
          <tr
            v-for="(row, rowIndex) in data"
            :key="row.id"
            class="v_table_row v_table_trow"
            :class="{ hover: rowIndex === hoverLineIndex }"
            ref="row"
            @mouseenter="mouseenterLine(rowIndex)"
          >
            <template v-for="col in copyColumns">
              <td
                :key="col.prop"
                class="v_table_cell"
                v-if="col.fixed === 'right'"
                :style="{
                  width: col.computedWidth,
                  height: rowsHeight[rowIndex],
                }"
              >
                <slot
                  :name="[col.prop]"
                  v-bind="{ row, index: rowIndex, data }"
                >
                  <div
                    class="v_default_cell"
                    :style="{ ...rowStyle, ...(col.rowStyle || {}) }"
                  >
                    {{ row[col.prop] }}
                  </div>
                </slot>
              </td>
            </template>
          </tr>
        </table>
        <table class="v_table_middle v_table_node" ref="table">
          <tr class="v_table_row v_table_thead" ref="row">
            <th
              v-for="(col, colIndex) in allColumns"
              :key="col.prop"
              class="v_table_cell"
              ref="col"
              :style="{ ...headStyle, ...(col.headStyle || {}) }"
            >
              <slot
                :name="col.prop + '_th'"
                v-bind="{ col, index: colIndex, data }"
              >
                <div class="v_default_cell">
                  {{ col.label }}
                </div>
              </slot>
            </th>
          </tr>
          <tr
            v-for="(row, rowIndex) in data"
            :key="row.id"
            class="v_table_row v_table_trow"
            :class="{ hover: rowIndex === hoverLineIndex }"
            ref="row"
            @mouseenter="mouseenterLine(rowIndex)"
          >
            <td
              v-for="col in allColumns"
              :key="col.prop"
              class="v_table_cell"
              :style="{ ...colStyle(col) }"
            >
              <slot :name="[col.prop]" v-bind="{ row, index: rowIndex, data }">
                <div
                  class="v_default_cell"
                  :style="{ ...rowStyle, ...(col.rowStyle || {}) }"
                >
                  {{ row[col.prop] }}
                </div>
              </slot>
            </td>
          </tr>
        </table>
      </div>

      <slot v-if="data.length == 0" name="v_table_empty">
        <div class="v_table_empty_data">暂无数据</div>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "VarTable",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    center: Boolean,
    left: Boolean,
    right: Boolean,
    border: {
      type: Boolean,
      default: false,
    },
    headStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    rowStyle: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    data(v) {
      if (v && Array.isArray(v) && v.length) {
        this.init();
      }
    },
    columns(v) {
      if (v && Array.isArray(v) && v.length) {
        this.init();
      }
    },
  },
  data() {
    return {
      age: "张三",
      allColumns: [],
      copyColumns: [],
      rowsHeight: [],
      hoverLineIndex: -1,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    mouseenterLine(v) {
      this.hoverLineIndex = v;
    },
    init() {
      // 整理列数据
      const leftColumns = [];
      const rightColumns = [];
      const middleColumns = [];
      this.columns.forEach((item) => {
        if (item.fixed === "left") {
          leftColumns.push(item);
        } else if (item.fixed === "right") {
          rightColumns.push(item);
        } else {
          middleColumns.push(item);
        }
      });
      this.allColumns = [...leftColumns, ...middleColumns, ...rightColumns];
      const copyColumns = this.allColumns;
      this.$nextTick(() => {
        // 获取每一行, 每一列的宽度和高度
        // console.log(this.$refs);
        this.rowsHeight = [];
        this.leftColumnsWidth = [];
        this.rightColumnsWidth = [];
        this.$refs.row.forEach((item) => {
          const height = window.getComputedStyle(item).height;
          this.rowsHeight.push(height);
        });

        this.$refs.col.forEach((item, index) => {
          const width = window.getComputedStyle(item).width;
          copyColumns[index].computedWidth = width;
        });
        this.copyColumns = copyColumns;
      });
    },
    colStyle(v) {
      const res = {};
      if (v.width) {
        res.minWidth = /^\d+$/.test(v.width) ? v.width + "px" : v.width;
      }
      return res;
    },
  },
};
</script>
<style lang="scss">
.v_table {
  .v_table_empty_data {
    text-align: center;
    padding: 30px 0;
  }
  .v_table_wrapper {
    position: relative;
    overflow: hidden;
  }
  .v_table_conainer {
    overflow: auto;
    // padding-bottom: 20px;
    .v_table_node {
      margin: 0;
      background-color: white;
      display: table;
      &.v_table_middle {
        min-width: 100%;
      }

      &.v_table_left {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        box-shadow: 2px 0 4px rgb(233, 233, 233);
      }
      &.v_table_right {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 10;
        box-shadow: -2px 0 4px rgb(233, 233, 233);
      }
      .v_table_thead {
        background-color: $table-head-background-color;
        white-space: nowrap;
        .v_default_cell {
          font-weight: bold;
        }
      }
      .v_table_row {
        .v_table_col {
          vertical-align: middle;
          padding: 0 10px;
          word-break: break-all;
        }
      }
      .v_table_trow {
        &:nth-child(2n) {
          background-color: $table-even-background-color;
        }
        &.hover {
          background-color: $table-row-hover-background-color;
        }
      }
    }
    .v_table_cell {
      padding: 0;
      border: 1px solid $table-border-color;
      border-left-color: transparent;
      border-right-color: transparent;
      color: $table-cell-color;
    }

    .v_default_cell {
      min-height: $table-row-min-height;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
  &.border {
    .v_table_cell {
      border-left-color: $table-border-color;
      border-right-color: $table-border-color;
    }
  }
  &.left {
    .v_default_cell {
      justify-content: flex-start;
    }
  }
  &.center {
    .v_default_cell {
      justify-content: center;
    }
  }
  &.right {
    .v_default_cell {
      justify-content: flex-end;
    }
  }
}
</style>