<script setup lang="ts">
defineProps<{
  link: string;
}>();
</script>

<template>
  <router-link :to="link" class="settings-link">
    <span class="settings-item">
      <i><slot name="icon"></slot></i>
      <span><slot name="heading"></slot></span>
      <i><slot></slot></i>
    </span>
  </router-link>
</template>

<style lang="scss" scoped>
@use "@/styles/type";
@use "@/styles/variables";

.settings-link {
  display: block;
  margin-bottom: variables.$grid;

  &:last-of-type {
    margin-bottom: 0;
  }
}

.settings-item {
  align-items: center;
  display: flex;

  i {
    &:first-of-type {
      margin-right: variables.$grid;
    }

    &:last-of-type {
      margin-left: variables.$grid;
    }
  }

  span {
    @extend %type-body;

    display: block;
    flex: 1;
    overflow: hidden;
  }
}
</style>
