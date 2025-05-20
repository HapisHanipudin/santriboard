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
const { id } = useRoute().params;

interface Student {
  nis: string;
  id: string;
  name: string;
}

interface ApiResponse {
  id: string;
  name: string;
  divisionId: string;
  teachers: { id: string; teacherId: string; semesterId: string; teacher: { name: string } }[];
  students: {
    id: string;
    studentId: string;
    semesterId: string;
    student: {
      name: string;
      nis: string;
    };
  }[];
}

const students = ref<Student[]>([]);
const student = ref<Student[]>([
  {
    nis: "222303180",
    id: "222303180",
    name: "Muhammad Rizky",
  },
]);

const getClass = async () => {
  try {
    const data = await $fetch(`/api/admin/classes/${id}/student`);
    const response = data as ApiResponse;
    students.value.push(
      ...response?.students.map((student: any) => ({
        nis: student.nis,
        id: student.id,
        name: student.name,
      }))
    );
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
