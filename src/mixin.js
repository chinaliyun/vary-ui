export default {
  props: {
    width: [String, Number],
    w: [String, Number],
    height: [String, Number],
    h: [String, Number],
  },
  computed: {
    bounding() {
      const height = this.height || this.h;
      const width = this.width || this.w;
      const style = {};

      if (/^\d+(\.\d+)?(px|rem|em|vh|vw|%)?$/.test(width)) {
        style.width = width;
        if (/^\d+$/.test(width)) {
          style.width = width + "px";
        }
      }
      if (/^\d+(\.\d+)?(px|rem|em|vh|vw|%)?$/.test(height)) {
        style.height = height;
        if (/^\d+$/.test(height)) {
          style.height = height + "px";
        }
      }

      return style;
    },
  },
};
