<template>
  <div class="flex flex-col gap-4">
    <div class="grid max-md:grid-cols-1 max-md:grid-rows-3 justify-center md:grid-cols-3 gap-8 pb-16 px-12">
      <div
        v-for="student in leaderboard.slice(0, 3)"
        :class="{
          'md:scale-110 md:col-start-2 md:translate-y-10': getIndexInLeaderboard(student) === 0,
          'md:translate-y-16': getIndexInLeaderboard(student) > 0,
          'md:col-start-1 md:row-start-1': getIndexInLeaderboard(student) === 1,
          'md:col-start-3 md:row-start-1': getIndexInLeaderboard(student) === 2,
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
          <img class="w-12" v-if="getIndexInLeaderboard(student) === 0" src="~/assets/images/leaderboard/gold.png" alt="" />
          <img class="w-12" v-else-if="getIndexInLeaderboard(student) === 1" src="~/assets/images/leaderboard/silver.png" alt="" />
          <img class="w-12" v-else src="~/assets/images/leaderboard/bronze.png" alt="" />
          <span
            :class="{
              'text-[#FFC02E]': getIndexInLeaderboard(student) === 0,
              'text-[#B5B7BB]': getIndexInLeaderboard(student) === 1,
              'text-[#CD7F32]': getIndexInLeaderboard(student) === 2,
            }"
            class="text-6xl font-semibold truncate max-w-full px-8"
          >
            {{ student.averageScore }}</span
          >
          <span class="text-lg">Nilai</span>
        </div>
      </div>
    </div>
    <div class="w-full overflow-x-auto px-4 rounded-[15px] overflow-hidden">
      <table class="w-full table-auto overflow-hidden">
        <thead class="">
          <tr>
            <th class="bg-[#1D1E21] px-4 py-4 text-center rounded-s-full">Posisi</th>
            <th class="bg-[#1D1E21] px-4 py-4 text-center">Nama Santri</th>
            <th class="bg-[#1D1E21] px-4 py-4 text-center max-sm:hidden">Kelas</th>
            <!-- <th v-if="props.title === 'tahfizh' || props.title === 'keseluruhan'" class="bg-[#1D1E21] px-4 py-4 text-center max-sm:hidden">Halaqah</th>
            <th v-if="props.title === 'it' || props.title === 'keseluruhan'" class="bg-[#1D1E21] px-4 py-4 text-center max-sm:hidden">IT</th> -->
            <th class="bg-[#1D1E21] px-4 py-4 text-center rounded-e-full">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in leaderboard.slice(3)" class="">
            <td class="px-4 py-3 text-center">
              <!-- <UIcon name="fa-caret-up" class="text-green-500 mr-3" /> -->
              {{ getIndexInLeaderboard(student) + 1 }}
            </td>
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <UAvatar :src="`https://app.dreamapps.id/storage/students/photo/${student.photo}`" :alt="student.name" />
                <!-- <img class="rounded-full object-cover object-top w-8 aspect-square mr-3" :src="`https://app.dreamapps.id/storage/students/photo/${student.photo}`" :alt="`Profile picture of ${student.name}`" /> -->
                <span class="truncate max-w-fit">{{ student.name }}</span>
              </div>
            </td>
            <td class="px-4 py-3 text-center max-sm:hidden">{{ student.pondok }}</td>
            <!-- <td v-if="props.title === 'tahfizh' || props.title === 'keseluruhan'" class="px-4 py-3 text-center max-sm:hidden">{{ student.halaqah }}</td>
            <td v-if="props.title === 'keseluruhan' || props.title === 'it'" class="px-4 py-3 text-center max-sm:hidden">{{ student.it }}</td> -->
            <td class="px-4 py-3 text-center">
              <button class="bg-blue-500 text-white px-4 py-1 rounded-[25px] truncate max-w-full">{{ student.averageScore }}</button>
            </td>
          </tr>
          <!-- <tr class="bg-gray-800">
            <td class="px-4 py-2 text-center"><i class="fas fa-caret-down text-red-500 mr-2"></i>5</td>
            <td class="px-4 py-2 text-center">
              <div class="flex items-center justify-center">
                <img class="rounded-full w-8 h-8 mr-2" src="https://storage.googleapis.com/a1aa/image/XTa432WZNGUQ5MMWpGGP9HFuepDIv7PApYvDsFMdeJ0.jpg" alt="Profile picture of the fifth place holder" />Nama Santri
              </div>
            </td>
            <td class="px-4 py-2 text-center">3 QBS</td>
            <td class="px-4 py-2 text-center">Ust Husain</td>
            <td class="px-4 py-2 text-center">Programming</td>
            <td class="px-4 py-2 text-center"><button class="bg-blue-500 text-white px-4 py-1 rounded-[25px]">8452</button></td>
          </tr> -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface studentLeaderboard {
  studentId: string;
  name: string;
  photo: string;
  pondok: number;
  averageScore: number;
}

const getIndexInLeaderboard = (object: any) => {
  return leaderboard.value.findIndex((student) => student.name === object.name);
};

const props = defineProps({
  title: {
    type: String,
    default: "keseluruhan",
  },
});

const getLeaderboard = async () => {
  try {
    const data = await $fetch(`/api/student/leaderboard?kategori=${props.title != "keseluruhan" ? props.title : ""}`, {
      method: "GET",
    });
    const leaderboardData = data as studentLeaderboard[];
    if (data) {
      leaderboard.value = leaderboardData;
    }
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
  }
};

onMounted(() => {
  getLeaderboard();
});

const leaderboard = ref<studentLeaderboard[]>([
  // {
  //   name: "Muhammad Hafizh Hanifuddin",
  //   photo: "https://app.dreamapps.id/storage/students/photo/222303192.webp",
  //   pondok: "3 QBS",
  //   // halaqah: "Ust Husain",
  //   // it: "ODT",
  //   averageScore: 100,
  // },
]);
</script>

<style></style>
