<template>
  <div class="v_table" :class="{ left, center, right, border }">
    <div class="v_table_container">
      <div class="v_table_row v_table_thead">
        <div
          v-for="(col, index) in columns"
          :key="col.prop"
          class="v_table_col"
          :class="{ fixed: col.fixed || false }"
          :style="{ ...colStyle(col), ...headStyle, ...(col.headStyle || {}) }"
        >
          <slot :name="col.prop + '_th'" v-bind="{ col, index, data }">
            <div class="v_table_cell">
              {{ col.label }}
            </div>
          </slot>
        </div>
      </div>
      <div
        v-for="(row, index) in data"
        :key="row.id"
        class="v_table_row v_table_trow"
      >
        <div
          v-for="col in columns"
          :key="col.prop"
          class="v_table_col"
          :style="{ ...colStyle(col), ...rowStyle, ...(col.rowStyle || {}) }"
        >
          <slot :name="[col.prop]" v-bind="{ row, index, data }">
            <div class="v_table_cell">
              {{ row[col.prop] }}
            </div>
          </slot>
        </div>
      </div>
    </div>

    <slot v-if="data.length == 0" name="v_table_empty">
      <div class="v_table_empty_data">暂无数据</div>
    </slot>
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
  data() {
    return {
      age: "张三",
    };
  },
  mounted() {},
  methods: {
    colStyle(v) {
      const res = {};
      if (v.width) {
        res.width = v.width + "px";
      }
      return res;
    },
  },
};
</script>
<style lang="scss">
.v_table {
  border-bottom: 1px solid $border-color2;
  overflow-x: auto;
  .v_table_empty_data {
    text-align: center;
    padding: 30px 0;
  }
  .v_table_container {
    display: table;
    min-width: 100%;
  }
  &.border {
    border-left: 1px solid $border-color2;
    border-right: 1px solid $border-color2;
    .v_table_col {
      border-top: 1px solid $border-color2;
    }
    .v_table_col + .v_table_col {
      border-left: 1px solid $border-color2;
    }
  }
  &.left {
    .v_table_cell {
      justify-content: flex-start;
    }
  }
  &.center {
    .v_table_cell {
      justify-content: center;
    }
  }
  &.right {
    .v_table_cell {
      justify-content: flex-end;
    }
  }

  .v_table_col {
    vertical-align: middle;
    padding: 0 10px;
    display: table-cell;
    word-break: break-all;
    &.fixed {
      flex-shrink: 0;
      flex-grow: 0;
    }
  }
  .v_table_thead {
    background-color: #fbfbfb;
    white-space: nowrap;
  }
  .v_table_row {
    display: table-row;
  }
  .v_table_trow {
    &:hover {
      background-color: rgba(223, 223, 223, 0.075);
    }
  }

  .v_table_cell {
    min-height: 46px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: rgb(105, 105, 105);
  }
  .v_table_thead {
    .v_table_col {
      border-top: 1px solid $border-color2;
      border-bottom: 1px solid $border-color2;
    }
    .v_table_cell {
      font-weight: bold;
    }
  }
  .v_table_col {
    &.center {
      .v_table_cell {
        justify-content: center;
      }
    }
    &.left {
      .v_table_cell {
        justify-content: flex-start;
      }
    }
    &.right {
      .v_table_cell {
        justify-content: flex-end;
      }
    }
  }
}
</style>
