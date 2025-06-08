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
    <UTabs :ui="{ trigger: 'data-[state=active]:text-white ' }" :items="tabTitles">
      <template #santri>
        <ClassStudentViews :students="data?.students || []" :kelas="kelas" />
      </template>
      <template #asatidz> ini asatidz </template>
    </UTabs>
  </div>
</template>

<script lang="ts" setup>
const loading = ref(true);

const { id } = useRoute().params;

const tabTitles = [
  {
    label: "Santri",
    description: "Dafttar siswa di kelas ini.",
    icon: "i-lucide-user",
    slot: "santri" as const,
  },
  {
    label: "Asatidz",
    description: "Daftar guru di kelas ini.",
    icon: "i-lucide-book", // Icon related to teacher
    slot: "asatidz" as const,
  },
];

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
    loading.value = false;
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
