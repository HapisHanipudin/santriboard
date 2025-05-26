<template>
  <div class="flex flex-col gap-4 max-w-full">
    <!-- Top 3 Leaderboard -->
    <div class="grid max-md:grid-cols-1 max-md:grid-rows-3 justify-center md:grid-cols-3 gap-8 pb-16 px-12">
      <div
        v-for="student in data?.slice(0, 3)"
        :key="student.studentId"
        :class="{
          'md:scale-110 md:col-start-2 md:translate-y-10': getPositionInLeaderboard(student) === 1,
          'md:translate-y-16': getPositionInLeaderboard(student) > 1,
          'md:col-start-1 md:row-start-1': getPositionInLeaderboard(student) === 2,
          'md:col-start-3 md:row-start-1': getPositionInLeaderboard(student) === 3,
        }"
        class="flex md:flex-col items-center max-sm:gap-4 gap-3 justify-center"
      >
        <div class="flex flex-col items-center gap-2 max-md:w-1/3">
          <div class="max-w-36 aspect-square rounded-4xl bg-[#3E62FE] overflow-hidden">
            <img class="w-full h-auto object-cover object-top rounded-4xl" :src="`https://app.dreamapps.id/storage/students/photo/${student.photo}`" :alt="student.name" />
          </div>
          <div class="flex flex-col items-center w-full">
            <span class="text-lg font-bold text-center w-full max-sm:truncate">{{ student.name }}</span>
            <span class="text-lg text-gray-400 text-center max-sm:truncate">Kelas {{ student.pondok }}</span>
          </div>
        </div>
        <div
          class="flex items-center justify-center flex-col sm:bg-gradient-to-tr to-[#191B2A] from-[#111111] from-10% via-85% to-95% md:rounded-t-4xl max-md:rounded-r-4xl max-md:rounded-l-lg md:rounded-b-lg w-44 md:w-48 lg:w-44 xl:w-60 aspect-square"
        >
          <img class="w-12" v-if="getPositionInLeaderboard(student) === 1" src="~/assets/images/leaderboard/gold.png" alt="Gold" />
          <img class="w-12" v-else-if="getPositionInLeaderboard(student) === 2" src="~/assets/images/leaderboard/silver.png" alt="Silver" />
          <img class="w-12" v-else src="~/assets/images/leaderboard/bronze.png" alt="Bronze" />
          <span
            :class="{
              'text-[#FFC02E]': getPositionInLeaderboard(student) === 1,
              'text-[#B5B7BB]': getPositionInLeaderboard(student) === 2,
              'text-[#CD7F32]': getPositionInLeaderboard(student) === 3,
            }"
            class="text-6xl font-semibold max-w-full"
          >
            {{ student.averageScore.toFixed(2) }}
          </span>
          <span class="text-lg">Nilai</span>
        </div>
      </div>
    </div>

    <!-- Full Leaderboard -->
    <div class="w-full px-4 rounded-[15px]">
      <div class="max-w-full overflow-x-auto">
        <div class="min-w-[700px]">
          <UTable :columns="columns" :data="data?.slice(3)" :loading="pending" loading-color="primary" loading-animation="carousel" class="border-gray-600 border-[0.5px] rounded-lg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui";

const UAvatar = resolveComponent("UAvatar");

const props = defineProps({
  title: {
    type: String,
    default: "keseluruhan",
  },
});

interface StudentLeaderboard {
  studentId: string;
  name: string;
  photo: string;
  pondok: number;
  averageScore: number;
}

const { data, pending, error, refresh } = await useFetch<StudentLeaderboard[]>(`/api/student/leaderboard?kategori=${props.title !== "keseluruhan" ? props.title : ""}`);

// Mendapatkan posisi santri berdasarkan ID
const getPositionInLeaderboard = (student: StudentLeaderboard, studentId?: string) => {
  const index = studentId ? data.value?.findIndex((s) => s.studentId === studentId) : data.value?.findIndex((s) => s.studentId === student.studentId);
  return index !== undefined && index >= 0 ? index + 1 : -1;
};

// Kolom tabel bawah
const columns: TableColumn<StudentLeaderboard>[] = [
  {
    accessorKey: "studentId",
    header: "Position",
    cell: ({ row }) => `#${getPositionInLeaderboard({} as StudentLeaderboard, row.getValue("studentId"))}`,
  },
  {
    accessorKey: "photo",
    header: "Santri",
    cell: ({ row }) => {
      return h("div", { class: "flex items-center gap-3" }, [
        h(UAvatar, { src: `https://app.dreamapps.id/storage/students/photo/${row.getValue("photo")}`, alt: row.original.name, size: "lg", ui: { image: "object-top" } }),
        h("div", undefined, h("p", { class: "font-medium text-highlighted" }, row.original.name)),
      ]);
    },
  },
  {
    accessorKey: "pondok",
    header: "Kelas",
    cell: ({ row }) => `Kelas ${row.getValue("pondok")}`,
  },
  {
    accessorKey: "averageScore",
    header: "Nilai Rata-Rata",
    cell: ({ row }) => h("span", { class: "font-semibold py-1 px-3 rounded-full bg-blue-500 text-white" }, row.getValue("averageScore").toFixed(2)),
  },
];
</script>
