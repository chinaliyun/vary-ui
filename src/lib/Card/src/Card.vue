<template>
  <div class="v_card" :class="{ shadow }">
    <div v-if="title !== 'Title'" class="v_card_header">
      <div class="v_card_title">{{ title }}</div>
      <div class="v_card_title_slot">
        <slot name="subtitle" />
      </div>
    </div>
    <div class="v_card_body">
      <slot name="default" />
    </div>
  </div>
</template>

<script>
export default {
  name: "VarCard",
  props: {
    title: {
      type: String,
      default: "Title",
    },
    shadow: Boolean,
  },
};
</script>

<style lang="scss" >
.v_card {
  // width: 100%;
  border-radius: 5px;
  background-color: white;
  &.shadow {
    box-shadow: 0 1px 3px rgb(216, 216, 216);
  }
  > .v_card_header {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    border-bottom: 1px solid $card-border-color;
    .v_card_title {
      font-size: 18px;
    }
    .v_card_title_slot {
      flex-grow: 1;
    }
  }
  .v_card_body {
    padding: 26px;
  }
}
</style>
