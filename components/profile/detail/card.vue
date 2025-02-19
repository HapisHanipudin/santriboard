<template>
  <div class="bg-[#1D1E21] rounded-4xl flex items-center gap-2 py-4 px-8">
    <div class="bg-[#DAFBBD] rounded-2xl p-2 flex items-center justify-center"><UIcon class="text-4xl text-[#111111]" :name="icon" /></div>
    <div class="flex flex-col w-min overflow-hidden">
      <span class="text-gray-400">{{ title }}</span>
      <span class="text-2xl font-semibold text-nowrap text-ellipsis"> {{ value }} </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { icon, title, value } = defineProps({
  icon: {
    type: String,
    default: "mdi:ab-testing",
  },
  title: {
    type: String,
    default: "Umur",
  },
  value: {
    type: String,
    default: "Testing",
  },
});
</script>

<style></style>
