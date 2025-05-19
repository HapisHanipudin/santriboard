<template>
  <div class="p-3 flex flex-col gap-4">
    <div>
      <h1 class="text-3xl font-bold">PLP 3</h1>
      <p class="text-gray-400">Ust. Mukhlis</p>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <ClassStudentCard v-for="student in students" :key="student.id" :student="student" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const students = ref([
  {
    nis: "222303180",
    id: "222303180",
    name: "Muhammad Rizky",
  },
  {
    nis: "222303181",
    id: "222303181",
    name: "Muhammad Rizal",
  },
  {
    nis: "222303182",
    id: "222303182",
    name: "Muhammad Rizqi",
  },
  {
    nis: "222303183",
    id: "222303183",
    name: "Muhammad Rizqi",
  },
  {
    nis: "222303184",
    id: "222303184",
    name: "Muhammad Rizqi",
  },
  {
    nis: "222303185",
    id: "222303185",
    name: "Muhammad Rizqi",
  },
  {
    nis: "222303186",
    id: "222303186",
    name: "Muhammad Rizqi",
  },
  {
    nis: "222303187",
    id: "222303187",
    name: "Muhammad Rizqi",
  },
  {
    nis: "222303188",
    id: "222303188",
    name: "Muhammad Rizqi",
  },
  {
    nis: "222303189",
    id: "222303189",
    name: "Muhammad Rizqi",
  },
  {
    nis: "222303190",
    id: "222303190",
    name: "Muhammad Rizqi",
  },
  {
    nis: "222303191",
    id: "222303191",
    name: "Muhammad Rizqi",
  },
  {
    nis: "222303192",
    id: "222303192",
    name: "Muhammad Rizqi",
  },
  {
    nis: "222303193",
    id: "222303193",
    name: "Muhammad Rizqi",
  },
  {
    nis: "222303194",
    id: "222303194",
    name: "Muhammad Rizqi",
  },
  {
    nis: "222303195",
    id: "222303195",
    name: "Muhammad Rizqi",
  },
]);
</script>

<style></style>
