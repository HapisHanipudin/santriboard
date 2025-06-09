<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between gap-2">
      <h1 class="text-2xl font-medium capitalize">Asatidz {{ kelas.name }}</h1>
      <!-- BEGIN: Changed 'Santri' to 'Asatidz' -->
      <div>
        <UModal v-model:open="addAsatidz" class="w-full max-w-md text-white">
          <!-- BEGIN: Changed 'addSantri' to 'addAsatidz' -->
          <UButton icon="i-lucide-plus">Tambah Asatidz</UButton>
          <template #content>
            <FormAddTeacher :kelas="kelas" @close="addAsatidz = false" @success="addAsatidz = false" />
            <!-- BEGIN: Changed 'addSantri' to 'addAsatidz' -->
          </template>
        </UModal>
      </div>
    </div>
    <!-- <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <ClassStudentCard v-for="student in students" :kelas="kelas" :key="student.id" :student="student" />
    </div> -->
  </div>
</template>

<script lang="ts" setup>
const addAsatidz = ref(false); // BEGIN: Changed 'addSantri' to 'addAsatidz'

const session = useSessionStore();

const { kelas } = defineProps<{
  kelas: {
    id: string;
    name: string;
    divisionId: string;
  };
}>();
</script>

<style></style>
