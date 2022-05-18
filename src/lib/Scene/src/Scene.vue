<template>
  <div
    class="v_scene"
    :class="[attachClass]"
    :style="{ ...realStyle, ...bounding }"
    v-on="$listeners"
  >
    <slot></slot>
  </div>
</template>
<script>
import Mixin from "../../../mixin";
export default {
  name: "VarScene",
  mixins: [Mixin],
  props: {
    flex: Boolean, // display:flex
    row: Boolean, // display:flex
    column: Boolean, // flex-direction: column
    wrap: Boolean, // flex-wrap:wrap
    grow: [Boolean, String], // flex-grow: 1
    shrink: Boolean, // flex-shrink: 1
    fixed: Boolean, // flex-grow: 0,  flex-shrink: 0
    fill: Boolean, // 让所有子元素 flex-grow: 1
    left: Boolean, // justify-content: flex-start
    right: Boolean, // justify-content: flex-end
    center: Boolean, // justify-content: center
    between: Boolean, // justify-content: space-between
    around: Boolean, // justify-content: space-around
    evenly: Boolean, // justify-content: space-evenly
    top: Boolean, // align-content: flex-start
    bottom: Boolean, // align-content: flex-end
    middle: Boolean, // align-content: center
    p: [String, Number],
    pl: [String, Number],
    pr: [String, Number],
    pt: [String, Number],
    pb: [String, Number],
    xs: [String, Number],
    md: [String, Number],
    sm: [String, Number],
    lg: [String, Number],
  },
  computed: {
    realStyle() {
      const style = {};
      if (this.p) {
        style.padding = this.p + "px";
      }
      if (this.pl) {
        style.paddingLeft = this.pl + "px";
      }
      if (this.pr) {
        style.paddingRight = this.pr + "px";
      }
      if (this.pt) {
        style.paddingTop = this.pt + "px";
      }
      if (this.pb) {
        style.paddingBottom = this.pb + "px";
      }
      if (this.grow && /\d/.test(this.grow)) {
        style.flexGrow = this.grow;
      }

      return style;
    },
    attachClass() {
      let str = "";
      const ks = [
        "block",
        "row",
        "flex",
        "column",
        "wrap",
        "grow",
        "shrink",
        "fixed",
        "fill",
        "left",
        "center",
        "right",
        "top",
        "middle",
        "bottom",
        "around",
        "between",
        "evenly",
      ];
      for (const key in this.$props) {
        if (this.$props[key] && ks.includes(key)) {
          str += `${key} `;
        }

        const value = this.$props[key];
        if (/^(xs|sm|md|lg)$/.test(key) && /^[1-6]$/.test(value)) {
          str += `${key}-${value} `;
        }
      }
      return str;
    },
  },
  mounted() {},
};
</script>
<style lang="scss" >
.v_scene {
  &.block {
    display: block;
  }
  &.top:not(.flex) {
    align-self: flex-start;
  }
  &.middle:not(.flex) {
    align-self: center;
  }
  &.bottom:not(.flex) {
    align-self: flex-end;
  }
  &.row:not(.flex) {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }
  &.grow {
    flex-grow: 1;
  }
  &.shrink {
    flex-shrink: 1;
  }
  &.fixed {
    flex-grow: 0;
    flex-shrink: 0;
  }
  &.flex {
    display: flex;
    &.fill {
      > * {
        flex-grow: 1;
      }
      > .v_space {
        flex-grow: 0;
        flex-shrink: 0;
      }
      > .fixed {
        flex-grow: 0;
      }
    }
    &.column {
      flex-direction: column;
    }
    &.wrap {
      flex-wrap: wrap;
    }
    &.center {
      justify-content: center;
    }
    &.left {
      justify-content: flex-start;
    }
    &.right {
      justify-content: flex-end;
    }
    &.around {
      justify-content: space-around;
    }
    &.between {
      justify-content: space-between;
    }
    &.evenly {
      justify-content: space-evenly;
    }
    &.top {
      align-content: flex-start;
    }
    &.middle {
      align-content: center;
      align-items: center;
    }
    &.bottom {
      align-content: flex-end;
    }
  }

  &[class*="lg-"],
  &[class*="md-"],
  &[class*="sm-"],
  &[class*="xs-"] {
    width: 100%;
    flex-shrink: 0;
  }
  &.xs-1 {
    @media screen and (min-width: 768px) {
      width: 16.66666%;
    }
  }
  &.xs-2 {
    @media screen and (min-width: 768px) {
      width: 33.333333%;
    }
  }
  &.xs-3 {
    @media screen and (min-width: 768px) {
      width: 50%;
    }
  }
  &.xs-4 {
    @media screen and (min-width: 768px) {
      width: 66.66666%;
    }
  }
  &.xs-5 {
    @media screen and (min-width: 768px) {
      width: 83.333333%;
    }
  }
  &.xs-6 {
    @media screen and (min-width: 768px) {
      width: 100%;
    }
  }
  &.sm-1 {
    @media screen and (min-width: 992px) {
      width: 16.66666%;
    }
  }
  &.sm-2 {
    @media screen and (min-width: 992px) {
      width: 33.333333%;
    }
  }
  &.sm-3 {
    @media screen and (min-width: 992px) {
      width: 50%;
    }
  }
  &.sm-4 {
    @media screen and (min-width: 992px) {
      width: 66.66666%;
    }
  }
  &.sm-5 {
    @media screen and (min-width: 992px) {
      width: 83.333333%;
    }
  }
  &.sm-6 {
    @media screen and (min-width: 992px) {
      width: 100%;
    }
  }
  &.md-1 {
    @media screen and (min-width: 1190px) {
      width: 16.66666%;
    }
  }
  &.md-2 {
    @media screen and (min-width: 1190px) {
      width: 33.333333%;
    }
  }
  &.md-3 {
    @media screen and (min-width: 1190px) {
      width: 50%;
    }
  }
  &.md-4 {
    @media screen and (min-width: 1190px) {
      width: 66.66666%;
    }
  }
  &.md-5 {
    @media screen and (min-width: 1190px) {
      width: 83.333333%;
    }
  }
  &.md-6 {
    @media screen and (min-width: 1190px) {
      width: 100%;
    }
  }
  &.lg-1 {
    @media screen and (min-width: 1440px) {
      width: 16.66666%;
    }
  }
  &.lg-2 {
    @media screen and (min-width: 1440px) {
      width: 33.333333%;
    }
  }
  &.lg-3 {
    @media screen and (min-width: 1440px) {
      width: 50%;
    }
  }
  &.lg-4 {
    @media screen and (min-width: 1440px) {
      width: 66.66666%;
    }
  }
  &.lg-5 {
    @media screen and (min-width: 1440px) {
      width: 83.333333%;
    }
  }
  &.lg-6 {
    @media screen and (min-width: 1440px) {
      width: 100%;
    }
  }
}
</style>
