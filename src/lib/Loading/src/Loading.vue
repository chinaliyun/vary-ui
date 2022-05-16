<template>
  <div class="v_loading">
    <div>
      <svg viewBox="25 25 50 50" class="circular">
        <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
      </svg>
      <div v-if="options.text" class="v_loading_text">{{ options.text }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "VarLoading",
  data() {
    return {
      options: {
        text: "",
      },
    };
  },
  mounted() {
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";
  },
  beforeDestroy() {
    document.body.style.height = "auto";
    document.body.style.overflow = "auto";
  },
  methods: {
    init(options) {
      this.options = options;
    },
  },
};
</script>
<style lang="scss" >
.v_loading {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  .circular {
    height: 50px;
    width: 50px;
    animation: loading-rotate 2s linear infinite;
    .path {
      animation: loading-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
      stroke-width: 2;
      stroke: $loading-border-color;
      stroke-linecap: round;
    }
  }
  .v_loading_text {
    color: $loading-color;
  }
  @keyframes loading-rotate {
    100% {
      transform: rotate(1turn);
    }
  }
  @keyframes loading-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40px;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120px;
    }
  }
}
</style>
