<template>
  <div class="v_tabs">
    <var-scene
      flex
      class="tab_bar"
      :class="{ border, background }"
      :style="realStyle"
    >
      <var-scene
        v-for="row in data"
        :key="'tabbar_' + row.name"
        flex
        center
        class="tab_item"
        :class="{ active: activeTabName == row.name }"
        :style="labelStyle"
        @click="selectTab(row.name)"
      >
        <var-scene flex middle center class="tab_text">
          {{ row.label }}
        </var-scene>
      </var-scene>
    </var-scene>
    <div v-for="row in data" :key="'tab_content_' + row.name">
      <slot v-if="activeTabName == row.name" :name="row.name" />
    </div>
  </div>
</template>

<script>
export default {
  name: "VarTabs",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    defaultName: {
      type: String,
      default: "",
    },
    labelWidth: {
      type: [String, Number],
      default: "",
    },
    border: {
      type: Boolean,
      default: false,
    },
    background: {
      type: Boolean,
      default: false,
    },
    height: [String, Number],
    h: [String, Number],
  },
  data() {
    return {
      activeTabName: this.data[0].name,
      labelStyle: {},
    };
  },
  computed: {
    realStyle() {
      const style = {};
      const height = this.height || this.h;
      if (height) {
        style.height = /(%|px)$/.test(height) ? height : height + "px";
      }
      return style;
    },
  },
  watch: {
    defaultName() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.activeTabName = this.defaultName || this.data[0].name;
      if (this.labelWidth) {
        const style = {};
        if (/^\d+$/.test(this.labelWidth)) {
          style.width = this.labelWidth + "px";
        } else if (/^\d+%$/.test(this.labelWidth)) {
          style.width = this.labelWidth;
        } else {
          style.width = "auto";
        }
        this.labelStyle = style;
      }
    },
    selectTab(name) {
      if (!this.$listeners.change) {
        this.activeTabName = name;
      }
      this.$emit("change", name);
    },
  },
};
</script>

<style lang="scss" >
.v_tabs {
  .tab_bar {
    height: 36px;
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
    padding: 0 20px;
    cursor: pointer;
    text-align: center;
    .tab_text {
      border-bottom: 2px solid transparent;
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
