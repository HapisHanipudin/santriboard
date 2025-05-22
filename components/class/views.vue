<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
    <ClassCard v-for="(kelas, index) in classes" :key="index" :kelas="kelas" :index="index" />
  </div>
</template>

<script setup>
const { title } = defineProps({
  title: {
    type: String,
    required: true,
  },
});

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
