<template>
  <div class="comps_root" @mouseup="mouseup">
    <div class="close_row" @click.stop="close">
      <IconClose class="icon_close" />
    </div>
    <div ref="wrapper" class="wrapper">
      <div ref="img" class="preview_img_wrapper">
        <img
          v-if="src"
          ref="img"
          :src="src"
          alt=""
          @load="imgLoad"
          @error="imgError"
        />
      </div>
      <IconArrow
        class="icon_arrow icon_arrow_left"
        @click.stop="changeIndex(current - 1)"
      />
      <IconArrow class="icon_arrow" @click.stop="changeIndex(current + 1)" />
    </div>
    <div class="thumb_row" @mouseup.stop="">
      <div ref="scrollWrapper" class="thumb_item_wrapper">
        <div ref="scroll" class="thumb_scroll">
          <div
            v-for="(item, index) in thumbs"
            :key="index"
            class="thumb_item"
            :class="{ active: current === index, error: item.error === 1 }"
            @click="changeIndex(index)"
          >
            <img :src="item.src" alt="" @error="thumbLoadError(item)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { throttle } from "../../../utils";
import Message from "../../Message";

let beginMove = 0;
let ele = null;
let wrapperEle = null;
let wrapperWidth = 0;
let wrapperHeight = 0;
let zoom = 1; // 缩放值
let originRect = null;
let imgLoaded = 0;
let scrollEle = null;
let scrollWrapperRect = null;

function getEleTransformProperty() {
  const transformProperty = window.getComputedStyle(ele).transform;
  // console.log('getEleTransformProperty', transformProperty);
  return transformProperty.match(/-?\d+(\.\d+)?/g).map((item) => item * 1);
}

import IconArrow from "./icons/arrow.vue";
import IconClose from "./icons/close.vue";

const imgError = require("./images/img_error.svg");

export default {
  name: "VarPreview",
  components: {
    IconArrow,
    IconClose,
  },
  data() {
    return {
      urls: [],
      thumbs: [],
      current: -1,
      src: "",
      maxZoom: 5,
    };
  },
  mounted() {
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";
  },
  beforeDestroy() {
    document.body.style.height = "auto";
    document.body.style.overflow = "auto";
    window.removeEventListener("mouseup", this.mouseup);
    window.removeEventListener("keyup", this.keyup);
    window.removeEventListener("resize", this.resize);
  },

  methods: {
    init({ urls, current = 0, maxZoom = 5 }) {
      this.urls = urls.filter((item) => {
        if (item.includes("base64")) {
          return item;
        }
        return /\.(jpg|jpeg|png|gif)/i.test(item);
      });
      this.thumbs = this.urls.map((item) => {
        {
          return {
            src: item,
            error: 0,
          };
        }
      });
      this.maxZoom = maxZoom;
      this.$nextTick(() => {
        this.resize();
        window.addEventListener("resize", this.resize);
        window.addEventListener("keyup", this.keyup);
        this.changeIndex(current > urls.length - 1 ? 0 : current);

        ele = this.$refs.img;
        // imgEle = this.$refs.img;
        this._scrollEvent = throttle(this.scroll, 1000);
        ele.addEventListener("mousedown", this.mousedown);
        ele.addEventListener("mousemove", this.mousemove);
        ele.addEventListener("mouseup", this.mouseup);
        window.addEventListener("mouseup", this.mouseup);
        window.addEventListener("keyup", this.keyup);
        wrapperEle.addEventListener("mousewheel", this.mousewheel);

        this._throttleMouseUp = throttle(this.mouseup);
      });
    },
    close() {
      this.destory();
    },
    changeIndex(index) {
      console.log("changeIndex", index);
      if (index === this.current) {
        return;
      }
      if (index < 0) {
        console.log("index 超出范围");
        Message.warning("已经是第一张");
        return;
      }
      if (index > this.urls.length - 1) {
        Message.warning("已经是最后一张");
        return;
      }
      this.current = index;
      this.src = this.urls[index];
      zoom = 1;

      // 设置scrol的位置
      const itemLeft = index * 120;
      const itemRight = (this.urls.length - index - 1) * 120;
      const scrollWidth = this.urls.length * 120;
      console.log(`左侧距离${itemLeft} 右侧距离${itemRight}`, scrollWidth);
      if (itemLeft < (scrollWrapperRect.width - 120) / 2) {
        console.log("左边缘位置");
        scrollEle.style.transform = `translateX(0)`;
        return;
      }
      if (itemRight < (scrollWrapperRect.width - 120) / 2) {
        console.log("右边缘位置", scrollWrapperRect.width);
        scrollEle.style.transform = `translateX(${
          scrollWrapperRect.width - scrollWidth
        }px)`;
        return;
      }
      console.log("调整到居中位置");
      scrollEle.style.transform = `translateX(-${
        itemLeft + 50 - scrollWrapperRect.width / 2
      }px)`;
    },
    resize() {
      wrapperEle = this.$refs.wrapper;
      wrapperWidth = wrapperEle.getBoundingClientRect().width;
      wrapperHeight = wrapperEle.getBoundingClientRect().height;
      scrollEle = this.$refs.scroll;
      scrollWrapperRect = scrollEle.parentNode.getBoundingClientRect();
    },
    keyup(e) {
      if (e.which === 37) {
        this.changeIndex(this.current - 1);
      }
      if (e.which === 39) {
        this.changeIndex(this.current + 1);
      }
    },
    imgLoad() {
      if (this.src === imgError) {
        return;
      }
      console.log("imgLoad");
      imgLoaded = 1;

      // 记录初始化的图片尺寸
      originRect = ele.getBoundingClientRect();
      ele.style.transform = `translate(0, 0) scale(1,1)`;
    },
    imgError() {
      console.log("img load error");
      imgLoaded = 0;
      this.src = imgError;
    },
    thumbLoadError(item) {
      console.log("thumbLoadError", item);
      this.thumbs = this.thumbs.map((thumb) => {
        if (thumb.src === item.src) {
          thumb.src = imgError;
          thumb.error = 1;
        }
        return thumb;
      });
      // item.src = imgError;
    },
    mousedown(e) {
      console.log("mousedown", e);
      if (e.button === 2 && beginMove) {
        this.mouseup(e);
        return;
      }
      if (imgLoaded) {
        beginMove = 1;
        ele.style.transition = "none";
      }
    },
    mousemove(e) {
      // console.log(beginMove);
      if (beginMove && e.button === 0) {
        const transformValue = getEleTransformProperty();
        console.log("mousemove", transformValue);
        const translateX = e.movementX;
        const translateY = e.movementY;
        // const rect = ele.getBoundingClientRect();
        // console.log('mousemove', e.movementX, e.movementY, rect.left, rect.top);
        // console.log(
        //   'mousemove',
        //   transformValue[4] + translateX,
        //   transformValue[5] + translateY
        // );
        const transformTarget = `translate(${
          transformValue[4] + translateX
        }px,${transformValue[5] + translateY}px) scale(${zoom}, ${zoom})`;
        console.log(transformTarget);
        ele.style.transform = transformTarget;
        const transformValue2 = getEleTransformProperty();
        console.log("mousemove", transformValue2);
      }
    },
    mouseup(e) {
      console.log("mouseup");
      e.stopPropagation();
      if (!imgLoaded) {
        return;
      }
      // if(e.button !== 0){
      //   t
      //   return
      // }
      ele.style.transition = `transform 0.1s linear`;
      beginMove = 0;
      const rect = ele.getBoundingClientRect();
      const transformProperty = getEleTransformProperty();
      console.log(
        "mouseup",
        rect,
        transformProperty,
        wrapperHeight,
        wrapperWidth
      );

      const translateY = (rect.height - originRect.height) / 2 - originRect.top;
      const translateX = (rect.width - originRect.width) / 2 - originRect.left;
      if (rect.width <= wrapperWidth && rect.height <= wrapperHeight) {
        // 小于图框尺寸
        if (rect.width <= originRect.width) {
          // 小于原图, 自动恢复到原始尺寸/位置
          ele.style.transform = `translate(0px,0px) scale(1,1)`;
        } else {
          // 大于原图, 保持尺寸, 居中
          ele.style.transform = `translate(${0}px,${0}px) scale(${zoom},${zoom})`;
        }
      }
      if (rect.width > wrapperWidth && rect.height > wrapperHeight) {
        // 如果两边都超过了窗口尺寸, 根据重心偏移位置, 决定哪一边对齐
        console.log("宽高都超过窗口尺寸");
        if (rect.left > 0) {
          if (rect.top > 0) {
            console.log("左上空白");
            ele.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoom}, ${zoom})`;
            return;
          }
          if (rect.bottom > wrapperHeight) {
            console.log("左空白");
            ele.style.transform = `translate(${translateX}px, ${transformProperty[5]}px) scale(${zoom}, ${zoom})`;
            return;
          }
          if (rect.bottom < wrapperHeight) {
            console.log("左下空白");
            ele.style.transform = `translate(${translateX}px, -${translateY}px) scale(${zoom}, ${zoom})`;
            return;
          }
        }
        if (rect.right < wrapperWidth) {
          if (rect.top > 0) {
            console.log("右上空白");
            ele.style.transform = `translate(-${translateX}px, ${translateY}px) scale(${zoom}, ${zoom})`;
            return;
          }
          if (rect.bottom > wrapperHeight) {
            console.log("右空白");
            ele.style.transform = `translate(-${translateX}px, ${transformProperty[5]}px) scale(${zoom}, ${zoom})`;
            return;
          }
          if (rect.bottom < wrapperHeight) {
            console.log("右下空白");
            ele.style.transform = `translate(-${translateX}px, -${translateY}px) scale(${zoom}, ${zoom})`;
            return;
          }
        }
        if (rect.top > 0) {
          console.log("上空白");
          ele.style.transform = `translate(${transformProperty[4]}px, ${translateY}px) scale(${zoom}, ${zoom})`;
          return;
        }
        if (rect.bottom < wrapperHeight) {
          console.log("下空白");
          ele.style.transform = `translate(${transformProperty[4]}px, -${translateY}px) scale(${zoom}, ${zoom})`;
          return;
        }
        return;
      }
      // 任何一边的尺寸超过了窗口尺寸, 先确定哪一边超过了
      console.log("宽高任意一边超过窗口尺寸");
      if (rect.width > wrapperWidth) {
        console.log("宽度超过窗口尺寸");
        if (rect.left > 0) {
          console.log("左侧空白");
          ele.style.transform = `translate(${translateX}px,0) scale(${zoom}, ${zoom})`;
          return;
        }
        if (rect.right < wrapperWidth) {
          console.log("右侧空白");
          ele.style.transform = `translate(-${translateX}px,0) scale(${zoom}, ${zoom})`;
        }
      }
      if (rect.height > wrapperHeight) {
        console.log("高度超过窗口尺寸");
        if (rect.top > 0) {
          console.log("上空白");
          ele.style.transform = `translate(0, ${translateY}px) scale(${zoom}, ${zoom})`;
          return;
        }
        if (rect.bottom < wrapperHeight) {
          console.log("下空白");
          ele.style.transform = `translate(0, -${translateY}px) scale(${zoom}, ${zoom})`;
        }
      }
    },
    mousewheel(e) {
      if (!imgLoaded) {
        return;
      }
      if (e.deltaY < 0) {
        this.zoomout();
      } else {
        this.zoomin();
      }
    },
    zoomout() {
      // 放大
      if (zoom >= this.maxZoom) {
        return;
      }
      zoom = (zoom + 0.2).toFixed(1) * 1;
      const transformTarget = `scale(${zoom},${zoom})`;
      console.log("zoomout", transformTarget);
      ele.style.transform = transformTarget;
      // this._throttleMouseUp();
      // this.$nextTick(() => {
      //   console.log(ele.offsetLeft);
      //   console.log(ele.getBoundingClientRect());
      //   console.log(ele.getBoundingClientRect());
      // });
    },
    zoomin() {
      // 缩小
      if (zoom <= 1) {
        ele.style.transform = `translate(0,0) scale(1,1)`;
        return;
      }
      const transformValue = getEleTransformProperty();
      zoom -= 0.2;
      const transformTarget = `translate(${transformValue[4]}px,${transformValue[5]}px)  scale(${zoom},${zoom})`;
      console.log(transformTarget);
      ele.style.transform = transformTarget;
      // this._throttleMouseUp();
    },
  },
};
/*

鼠标上滚时,放大图片, 最多放到原图的2倍大小,
  如果正在自动贴合边缘, return
  如果超过原图2倍, return
  每次放大0.2原图大小, 记录缩放后的尺寸
滚轮下滚时,缩小图片, 不能小于原图大小,
  如果正在自动贴合边缘, return
  如果当前尺寸是原图尺寸, 什么都不做
  每次缩小0.2原图大小
  如果图片边缘在图框边缘内部 自动贴合
鼠标按下移动的时候,
  如果正在自动贴合边缘, return
  如果图片尺寸小于图框, return
  要跟随鼠标移动图片  transform:translate()
鼠标松开时,
  如果图片是原图尺寸, 自动回到居中的状态
  如果图片处于放大状态, 且图片边缘没有贴合图框边缘, 要自动回到贴合边缘的位置
  如果放大后的图片, 依然小于图框尺寸, 自动回到居中的位置
  否则, 如果

判断图片是否贴合
*/
</script>
<style lang="scss">
.comps_root {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 500;
  background-color: rgba(0, 0, 0, 0.986);
  animation: show 0.2s linear;
  animation-fill-mode: forwards;
  opacity: 0;
  transition: opacity 2s linear;
  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes hide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  .close_row {
    position: absolute;
    top: -50px;
    right: -50px;
    z-index: 2;
    background-color: rgb(233, 85, 27);
    width: 100px;
    border-radius: 1000px;
    height: 100px;
    opacity: 0.4;
    transition: opacity 0.1s linear;
    cursor: pointer;
    .icon_close {
      display: block;
      width: 40px;
      height: 40px;
      margin-top: 50px;
      margin-left: 10px;
    }
    &:hover {
      opacity: 1;
    }
  }
  .wrapper {
    height: calc(100vh - 140px);
    display: flex;
    justify-content: center;
    align-items: center;
    // overflow: hidden;
    position: relative;
    .icon_arrow {
      position: absolute;
      right: 30px;
      top: 50%;
      width: 80px;
      height: 80px;
      margin-top: -40px;
      opacity: 0.2;
      transition: opacity 0.1s linear;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }
  }
  .icon_arrow_left {
    right: auto;
    left: 30px;
    transform: rotate(180deg);
  }
  .thumb_row {
    display: flex;
    justify-content: center;
    padding: 20px 0;
    position: relative;
    z-index: 10;
    .thumb_item_wrapper {
      max-width: 60vw;
      // background-color: red;
      // border: 1px solid red;
      overflow: hidden;
      .thumb_scroll {
        display: flex;
        transition: transform 0.1s linear;
      }
    }
    .thumb_item {
      flex-shrink: 0;
      width: 100px;
      height: 100px;
      border: 2px solid rgb(255, 255, 255);
      margin: 0 10px;
      background-color: black;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.2;
      transition: opacity 0.1s linear;
      img {
        display: block;
        max-width: 100%;
        max-height: 100%;
      }
      &:hover {
        opacity: 1;
      }
      &.active {
        opacity: 1;
      }
      &.error {
        img {
          max-width: 50%;
          max-height: 50%;
        }
      }
    }
  }
  .preview_img_wrapper {
    transform: translate(0, 0) scale(1);
    img {
      display: block;
      max-width: 60vw;
      max-height: calc(100vh - 200px);
      transform: scale(1);
      user-select: none;
      -webkit-user-drag: none;
    }
  }
}
</style>
