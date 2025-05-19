<template>
  <NuxtLink :key="index" :to="`/class/${kelas.id}`" class="shadow-md bg-[#1D1E21] rounded-xl p-4 flex gap-4 justify-between items-center hover:shadow-lg transition-shadow duration-300">
    <div class="flex flex-col justify-between">
      <div>
        <span class="text-sm text-gray-400">Kelas {{ kelas.division }}</span>
        <p class="text-3xl font-semibold truncate">{{ kelas.name }}</p>
      </div>
      <div>
        <span class="text-sm text-gray-400">Pengajar</span>
        <p class="text-3xl font-semibold truncate">{{ kelas.musyrif }}</p>
      </div>
    </div>
    <div class="bg-[#3E62FE] rounded-xl h-full p-3 flex flex-col items-center gap-4 justify-between">
      <div class="p-3 bg-white rounded-xl flex items-center"><UIcon name="mingcute:group-fill" class="text-[#3E62FE]" size="30" /></div>
      <p class="text-3xl font-semibold">{{ kelas.studentCount }}</p>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
const { kelas, index } = defineProps<{
  index: number;
  kelas: {
    id: number;
    name: string;
    division: string;
    musyrif: string;
    studentCount: number;
  };
}>();
</script>

<style></style>
