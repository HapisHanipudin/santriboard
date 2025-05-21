<template>
  <div class="bg-[#1D1E21] px-3 py-5 rounded-2xl flex items-center flex-col gap-2 border-[0.5px] border-[#3E3E40]">
    <div class="rounded-lg w-32 h-auto aspect-square overflow-hidden">
      <img :src="`https://app.dreamapps.id/storage/students/photo/${student.student.nis}.webp`" class="object-cover object-top" alt="" />
    </div>
    <div class="flex flex-col items-center gap-2">
      <p class="font-semibold text-center truncate">{{ student.student.name }}</p>
    </div>
    <div class="flex gap-3">
      <UModal>
        <UButton icon="gravity-ui:pencil-to-line" class="px-5 text-[#3E62FE]" size="xl" color="neutral" variant="solid" />

        <template #content> <FormNote :kelas="kelas" :student="student" /> </template>
      </UModal>
      <UModal v-model:open="isOpen">
        <UButton icon="majesticons:file-plus" class="px-5 text-white" size="xl" color="primary" variant="solid" />

        <template #content>
          <FormAssesmentTahfizh @close-modal="isOpen = false" :kelas="kelas" :student="student" v-if="kelas.divisionId == 'tahfizh'" />
          <FormAssesmentIt @close-modal="isOpen = false" :kelas="kelas" :student="student" v-else-if="kelas.divisionId == 'it'" />
          <FormAssesmentKarakter @close-modal="isOpen = false" :kelas="kelas" :student="student" v-else-if="kelas.divisionId == 'karakter'" />
          <FormAssesmentBahasa @close-modal="isOpen = false" :kelas="kelas" :student="student" v-else-if="kelas.divisionId == 'bahasa'" />
        </template>
      </UModal>
      <!-- <button class="py-2 px-5 rounded-lg bg-white flex items-center justify-center"><UIcon name="gravity-ui:pencil-to-line" class="text-[#3E62FE]" size="25" /></button>
      <button class="py-2 px-5 rounded-lg bg-[#3E62FE] flex items-center justify-center"><UIcon name="majesticons:file-plus" class="" size="25" /></button> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
const isOpen = ref(false);

const { student, kelas } = defineProps<{
  student: {
    id: string;
    studentId: string;
    semesterId: string;
    student: {
      name: string;
      nis: string;
    };
  };
  kelas: {
    id: string;
    name: string;
    divisionId: string;
  };
}>();
</script>

<style></style>
