<template>
  <NuxtLink :key="index" :to="`/class/${kelas.id}`" class="shadow-md bg-[#1D1E21] rounded-xl p-4 grid grid-cols-4 gap-1 items-center hover:shadow-lg transition-shadow duration-300">
    <div class="flex flex-col justify-between max-w-full col-span-3">
      <div class="w-full">
        <span class="text-sm text-gray-400">Kelas {{ kelas.division }}</span>
        <p :title="kelas.name" class="text-3xl font-semibold truncate max-w-full">{{ kelas.name }}</p>
      </div>
      <div class="w-full">
        <span class="text-sm text-gray-400">Pengajar</span>
        <p :title="kelas.teacher" class="text-3xl font-semibold truncate max-w-full">{{ kelas.teacher }}</p>
      </div>
    </div>
    <div class="bg-[#3E62FE] rounded-xl h-full p-3 flex flex-col items-center gap-4 justify-between col-span-1">
      <div class="p-3 bg-white rounded-xl flex items-center justify-center w-full"><UIcon name="mingcute:group-fill" class="text-[#3E62FE]" size="30" /></div>
      <p class="text-3xl font-semibold">{{ kelas.studentCount }}</p>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
const { kelas, index } = defineProps<{
  index: number;
  kelas: {
    id: string;
    name: string;
    division: string;
    teacher: string;
    studentCount: number;
  };
}>();
</script>

<style></style>
