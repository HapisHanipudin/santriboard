<template>
  <div>
    <ProfileStudent :student="student" />
  </div>
</template>

<script lang="ts" setup>
const student = ref({
  id: 1,
  name: "Muhammad Hafizh Hanifuddin",
  nickname: "Hanifuddin",
  image: "https://app.dreamapps.id/storage/students/photo/222303192.webp",
  birthdate: "2007-02-28",
});
</script>

<style></style>
