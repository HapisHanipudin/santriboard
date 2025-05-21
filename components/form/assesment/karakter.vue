<template>
  <div>ini form karakter</div>
</template>

<script lang="ts" setup>
const { student } = defineProps<{
  student: {
    id: string;
    studentId: string;
    semesterId: string;
    student: {
      name: string;
      nis: string;
    };
  };
}>();
</script>

<style></style>
