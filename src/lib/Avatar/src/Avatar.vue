<template>
  <div class="v_avatar" :style="sizing">
    <img
      v-if="realSrc"
      class="img"
      :style="sizing"
      :src="realSrc"
      @error="loadError"
      :alt="alt"
    />
  </div>
</template>

<script>
let loadStatus = 1;
export default {
  name: "VarAvatar",
  props: {
    src: {
      type: String,
      default: "",
    },
    // 默认图片, 用于src加载失败的替换品
    default: {
      type: String,
      default: "",
    },
    size: {
      type: [String, Number],
      default: 80,
    },
    alt: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      realSrc: this.src,
      style: {},
    };
  },
  computed: {
    sizing() {
      let style = {};
      const size = this.size;

      if (/^\d+(\.\d+)?(px|rem|em|vh|vw|%)?$/.test(size)) {
        style.width = size;
        style.height = size;
        if (/^\d+$/.test(size)) {
          style.width = size + "px";
          style.height = size + "px";
        }
      }

      return style;
    },
  },
  created() {},
  mounted() {},
  methods: {
    loadError() {
      if (loadStatus === 1 && this.default) {
        this.realSrc = this.default;
        loadStatus = 2;
      } else {
        this.realSrc = "";
      }
    },
  },
};
</script>

<style lang="scss" >
.v_avatar {
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  .img {
    display: block;
    // max-width: 100%;
    // max-height: 100%;
  }
}
</style>
<!--

loadError(){
  laodStatus==1, 说明是用户指定的src图片加载失败了,
  此时如果default有值, 就加载default的图片, 把loadStatus设为2, 
    否则, 直接置为空, 且要有警告
  如果default的图片加载失败了, 同样要去掉realSrc的值
}

-->