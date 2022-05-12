<template>
  <var-card title="标题" shadow>
    卡片内容
    <template #subtitle="">
      <div class="subtitle">副标题</div>
    </template>
  </var-card>
</template>
<script>
export default {
  name: "CardSubTitle",
};
</script>
<style lang="scss" scoped>
.subtitle {
  text-align: right;
  color: rgb(34, 164, 197);
}
</style>