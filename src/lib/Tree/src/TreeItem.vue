<template>
  <div class="v_treeitem">
    <div class="self_conent" @click="toggleChidrenVisible">
      <img
        v-if="hasChildren()"
        class="treeitem_arrow"
        src="./arrow.svg"
        alt=""
      />
      <div>{{ data[labelNode] }}</div>
    </div>
    <!-- :style="{height:childrenVisible?totalHeight:'0px'}" -->
    <div v-if="hasChildren(data[childrenNode])" class="child_list">
      <div v-for="child in data[childrenNode]" :key="child[keyNode]">
        <AdmTreeItem
          :data="child"
          @click-node="(v) => $emit('click-node', v)"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "VarTreeItem",
  props: {
    data: {
      type: Object,
      default() {
        return {};
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
  },
  data() {
    return {
      childrenVisible: false,
      totalHeight: "0px",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.hasChildren()) {
        this.totalHeight = this.data.children.length * 30 + "px";
      } else {
        this.totalHeight = "0px";
      }
    },
    hasChildren() {
      const t = this.data.children;
      return Array.isArray(t) && t.length > 0;
    },
    toggleChidrenVisible() {
      this.$emit("click-node", this.data);
      if (this.hasChildren()) {
        this.childrenVisible = !this.childrenVisible;
        this.$emit("");
      }
    },
  },
};
</script>

<style lang="scss" >
.v_treeitem {
  .self_conent {
    display: flex;
    height: 30px;
    align-items: center;
    .treeitem_arrow {
      display: block;
      width: 14px;
    }
  }
  .child_list {
    padding-left: 10px;
    overflow: hidden;
    transition: height 0.1s linear;
  }
}
</style>
