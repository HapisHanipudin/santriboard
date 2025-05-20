<template>
  <div class="bg-[#1D1E21] px-3 py-5 rounded-2xl flex items-center flex-col gap-2 border-[0.5px] border-[#3E3E40]">
    <div class="rounded-lg w-32 h-auto aspect-square overflow-hidden">
      <img :src="`https://app.dreamapps.id/storage/students/photo/${student.nis}.webp`" class="object-cover object-top" alt="" />
    </div>
    <div class="flex flex-col items-center gap-2">
      <p class="font-semibold text-center truncate">{{ student.name }}</p>
    </div>
    <div class="flex gap-3">
      <button class="py-2 px-5 rounded-lg bg-white flex items-center justify-center"><UIcon name="gravity-ui:pencil-to-line" class="text-[#3E62FE]" size="25" /></button>
      <button class="py-2 px-5 rounded-lg bg-[#3E62FE] flex items-center justify-center"><UIcon name="majesticons:file-plus" class="" size="25" /></button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { student } = defineProps<{
  student: {
    nis: string;
    id: string;
    name: string;
  };
}>();
</script>

<style></style>
