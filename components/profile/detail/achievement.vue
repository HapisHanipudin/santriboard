<template>
  <div class="flex items-center gap-3 py-3 px-6">
    <div class="bg-white p-2 rounded-2xl flex items-center justify-center">
      <UIcon class="text-4xl" name="twemoji:trophy" />
    </div>
    <div class="flex flex-col">
      <span class="text-lg font-semibold">{{ title }}</span>
      <span class="text-sm">{{ description }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { title, description } = defineProps<{
  title: string;
  description: string;
}>();
</script>

<style></style>
