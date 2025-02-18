<template>
  <div class="grid grid-cols-1 lg:grid-cols-5 grid-rows-9 gap-4">
    <ProfileStudentCard class="col-span-3 row-span-2" :student="student" />
    <ProfileStudentAchievement class="col-span-3 row-span-4" :student="student" />
    <ProfileStudentDetail class="col-span-2 row-span-6 grid-rows-subgrid lg:col-start-4 lg:row-start-1" :student="student" />
    <ProfileStudentProject class="col-span-3 row-span-3" :student="student" />
  </div>
</template>

<script lang="ts" setup>
interface Student {
  id: number;
  name: string;
  nickname: string;
  image: string;
  birthdate: string;
}

const { student } = defineProps({
  student: {
    type: Object as PropType<Student>,
    default: {
      id: 1,
      name: "Muhammad Iqbal Mubarok",
      nickname: "Iqbal",
      image: "https://avatars.githubusercontent.com/u/57764837?v=4",
      birthdate: "2003-03-30",
    },
  },
});
</script>

<style></style>
