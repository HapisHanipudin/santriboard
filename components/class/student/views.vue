<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between gap-2">
      <h1 class="text-2xl font-medium capitalize">Santri {{ kelas.name }}</h1>
      <div>
        <UModal v-model:open="addSantri" class="w-full max-w-md text-white">
          <UButton icon="i-lucide-plus">Tambah Santri</UButton>
          <template #content>
            <FormAddStudent :kelas="kelas" @close="addSantri = false" @success="addSantri = false" />
          </template>
        </UModal>
      </div>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <ClassStudentCard v-for="student in students" :kelas="kelas" :key="student.id" :student="student" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const addSantri = ref(false);

const session = useSessionStore();

const { students, kelas } = defineProps<{
  students: {
    id: string;
    studentId: string;
    semesterId: string;
    student: {
      name: string;
      nis: string;
      photo: string;
    };
  }[];
  kelas: {
    id: string;
    name: string;
    divisionId: string;
  };
}>();
</script>

<style></style>
