<template>
  <div class="v_tree">
    <!-- <div v-for="row in data" :key="row[]">
      <TreeItem :data="row" v-bind="$attrs" />
    </div> -->
  </div>
</template>

<script>
// import TreeItem from './TreeItem';

export default {
  name: "VarTree",
  components: {
    // TreeItem,
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {},
  },
};
</script>

<style lang="scss" >
.v_tree {
  .tab_bar {
    &.border {
      border-bottom: 1px solid $border-color;
    }
    &.background {
      background-color: #f9f9f9;
      border: 1px solid #e2e2e2;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
  }
  .tab_item {
    height: 38px;
    // width: 162px;
    padding: 0 20px;
    cursor: pointer;
    text-align: center;
    .tab_text {
      border-bottom: 1px solid transparent;
      transition: all 0.2s linear;
    }
    &.active {
      color: $main-color;
      .tab_text {
        border-color: $main-color;
      }
    }
  }
}
</style>
