<template>
  <div class="p-3 flex flex-col gap-4">
    <div>
      <h1 class="text-3xl font-bold capitalize">{{ kelas.name }}</h1>
      <span class="text-gray-400"
        >Kelas <span :class="kelas.divisionId != 'it' ? 'capitalize' : 'uppercase'"> {{ kelas.divisionId }}</span>
      </span>
      <p class="text-lg">
        <span v-for="(teacher, index) in data?.teachers" class="text-gray-400">{{ index >= 1 ? ", " : "" }} {{ teacher.teacher.name }}</span>
      </p>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <ClassStudentCard v-for="student in data?.students" :kelas="kelas" :key="student.id" :student="student" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { capitalize } from "vue";

const { id } = useRoute().params;

interface Student {
  id: string;
  studentId: string;
  semesterId: string;
  student: {
    name: string;
    nis: string;
    photo: string;
  };
}

interface Teacher {
  id: string;
  teacherId: string;
  semesterId: string;
  teacher: { name: string };
}

interface ApiResponse {
  id: string;
  name: string;
  divisionId: string;
  teachers: Teacher[];
  students: Student[];
}

const data = ref<ApiResponse | null>(null);

const kelas = ref({
  id: "",
  name: "",
  divisionId: "",
  teachers: [] as Teacher[],
});

const getClass = async () => {
  try {
    const res = await $fetch(`/api/admin/classes/${id}/student`);
    const response = res as ApiResponse;
    data.value = response;
    kelas.value = { id: response.id, name: response.name, divisionId: response.divisionId, teachers: response.teachers };
  } catch (error) {
    console.error(error);
    // Handle the error here
  }
};

onMounted(() => {
  getClass();
});
</script>

<style></style>
