<template>
  <div class="grid grid-cols-1 lg:grid-cols-5 grid-rows-12 lg:grid-rows-9 gap-4 grid-flow-row-dense">
    <ProfileStudentCard class="lg:col-span-3 row-span-2" :student="student" />
    <ProfileStudentDetail :style="{ '--detail-row': student.classes.length + 4 }" class="lg:col-span-2 row-span-(--detail-row) grid-rows-subgrid" :student="student" />
    <ProfileStudentAchievement class="lg:col-span-3 row-span-4" :student="student" />
    <ProfileStudentProject class="lg:col-span-3 row-span-3" :student="student" />
  </div>
</template>

<script lang="ts" setup>
const { student } = defineProps({
  student: {
    type: Object as PropType<Student>,
    default: {
      id: 1,
      name: "Muhammad Iqbal Mubarok",
      nickname: "Iqbal",
      image: "https://avatars.githubusercontent.com/u/57764837?v=4",
      birthdate: "2003-03-30",
      classes: [
        {
          name: "ODT 1",
          division: "IT",
        },
        {
          name: "Sisus 30 Juz",
          division: "TAHFIZH",
        },
      ],
    },
  },
});
</script>

<style></style>
