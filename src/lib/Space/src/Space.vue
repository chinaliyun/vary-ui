<template>
  <div class="v_space" :style="bounding"></div>
</template>

<script>
import Mixin from "../../../mixin";
export default {
  name: "VarSpace",
  mixins: [Mixin],
};
</script>

<style lang="scss" >
.v_space {
  flex-grow: 0;
  flex-shrink: 0;
}
</style>
