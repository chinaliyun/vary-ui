<template>
  <var-scene class="v_steps" flex middle :style="{ background }">
    <var-scene
      v-for="(item, index) in data"
      :key="item"
      class="step_item"
      :style="realStyle"
      :class="{ active: active > index }"
    >
      <div class="step">
        <div class="step_line"></div>
        <var-scene
          class="step_text_bg"
          flex
          middle
          center
          :style="{ background }"
        >
          <var-scene
            class="step_text"
            flex
            middle
            center
            @click="selectStep(index)"
          >
            {{ index + 1 }}
          </var-scene>
        </var-scene>
      </div>
      <var-scene class="step_title" :pt="8" @click="selectStep(index)">
        {{ item }}
      </var-scene>
    </var-scene>
  </var-scene>
</template>
<script>
export default {
  name: "VarSteps",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    active: {
      type: [Number, String],
      default: 1,
    },
    background: {
      type: String,
      default: "#fff",
    },
  },
  data() {
    return {
      activeIndex: 1,
    };
  },
  computed: {
    realStyle() {
      const style = {};
      if (this.data.length > 0) {
        style.flexBasis = 100 / this.data.length + "%";
      }
      return style;
    },
  },
  watch: {
    active() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.activeIndex = Number(this.active) || 1;
    },
    selectStep(index) {
      if (!this.$listeners.change) {
        this.activeIndex = index;
      }
      this.$emit("change", index);
    },
  },
};
</script>
<style lang="scss" >
.v_steps {
  .step_item {
    text-align: center;
    .step {
      position: relative;
      min-height: 40px;
      overflow: hidden;
      .step_line {
        position: absolute;
        left: 0;
        top: 19px;
        width: 100%;
        height: 2px;
        background-color: #f2f3f5;
      }
      .step_text_bg {
        width: 40px;
        height: 40px;
        background-color: #fff;
        position: absolute;
        left: 50%;
        margin-left: -20px;
        border-radius: 50%;
      }
      .step_text {
        width: 24px;
        height: 24px;
        background-color: #c8c9cc;
        border-radius: 50%;
        font-size: 14px;
        color: #ffffff;
      }
    }
    .step_title {
      color: #969799;
    }
    &.active {
      .step_line,
      .step_text {
        background-color: $main-color;
      }
      .step_title {
        color: #323233;
      }
    }
  }
  .step_item:first-child {
    .step_line {
      left: 50%;
    }
  }
  .step_item:last-child {
    .step_line {
      left: -50%;
    }
  }
}
</style>