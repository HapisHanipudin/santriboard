<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
    <div v-if="loading" v-for="i in 6" class="bg-white/10 rounded-xl w-full h-40 animate-pulse"></div>
    <ClassCard v-else-if="!loading && classes.length > 0" v-for="(kelas, index) in classes" :key="index" :kelas="kelas" :index="index" />
    <div v-else-if="!loading && classes.length === 0" class="bg-[#1D1E21] rounded-xl w-full h-40 flex items-center justify-center">
      <p class="text-gray-400 text-2xl">Tidak ada kelas yang dapat dilihat</p>
    </div>
  </div>
</template>

<script setup>
const { title } = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const loading = ref(true);

const classes = ref([
  // {
  //   id: "1",
  //   name: "PLP 3",
  //   division: "Tahfizh",
  //   musyrif: "Ust Mukhlis",
  //   studentCount: 16,
  //   path: "/class/PLP3",
  // },
  // {
  //   id: "2",
  //   name: "PLP 4",
  //   division: "Tahfizh",
  //   musyrif: "Ust Ali",
  //   studentCount: 20,
  //   path: "/class/PLP4",
  // },
  // {
  //   id: "3",
  //   name: "Tajwid 1",
  //   division: "Tajwid",
  //   musyrif: "Ust Ahmad",
  //   studentCount: 18,
  //   path: "/class/Tajwid1",
  // },
  // Add more classes here as needed
]);

const getClasses = async () => {
  try {
    const response = await FetchApi(`/api/admin/teacher/class${title != "semua" ? "?kategori=" + title : ""}`);
    classes.value = response.data;
    loading.value = false;
  } catch (error) {
    console.error("Error fetching classes:", error);
  }
};

onBeforeMount(() => {
  getClasses();
});

// onMounted(() => {
//   getClasses();
// });
</script>

<style></style>
