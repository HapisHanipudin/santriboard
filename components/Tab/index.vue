<template>
  <div v-show="title === selectedTitle">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
});
const selectedTitle = inject("selectedTitle");
</script>
