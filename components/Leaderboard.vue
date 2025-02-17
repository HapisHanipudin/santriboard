<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-3 gap-8 pb-16 px-12">
      <div
        v-for="student in [leaderboard[1], leaderboard[0], leaderboard[2]]"
        :class="{ 'scale-110': getIndexInLeaderboard(student) === 0, 'translate-y-16': getIndexInLeaderboard(student) > 0, 'translate-y-10': getIndexInLeaderboard(student) === 0 }"
        class="flex flex-col items-center gap-3"
      >
        <div class="flex flex-col items-center gap-2">
          <div class="w-36 h-36 rounded-4xl bg-[#3E62FE]">
            <img class="w-full h-full object-cover object-top rounded-4xl" :src="student.image" :alt="student.nama" />
          </div>
          <span class="text-lg font-bold">{{ student.nama }}</span>
        </div>
        <div
          :class="{
            'to-[#3d2e08]': getIndexInLeaderboard(student) === 0,
            'to-[#38393a]': getIndexInLeaderboard(student) === 1,
            'to-[#35200c]': getIndexInLeaderboard(student) === 2,
          }"
          class="flex items-center justify-center flex-col bg-gradient-to-tr via-[#191B2A] from-[#111111] from-10% via-85% to-95% rounded-t-4xl rounded-b-sm w-3/4 aspect-square"
        >
          <span class="text-lg text-gray-400">{{ student.kelas }} | {{ student.halaqah }}</span>
          <span
            :class="{
              'text-[#FFC02E]': getIndexInLeaderboard(student) === 0,
              'text-[#B5B7BB]': getIndexInLeaderboard(student) === 1,
              'text-[#CD7F32]': getIndexInLeaderboard(student) === 2,
            }"
            class="text-6xl"
          >
            {{ student.nilai }}</span
          >
          <span class="text-lg">Nilai</span>
        </div>
      </div>
    </div>
    <div class="w-full overflow-x-auto px-4 rounded-[15px] overflow-hidden">
      <table class="w-full table-auto rounded-[15px] overflow-hidden">
        <thead>
          <tr class="bg-[#1D1E21] rounded-full">
            <th class="px-4 py-4 text-center">Posisi</th>
            <th class="px-4 py-4 text-center">Nama Santri</th>
            <th class="px-4 py-4 text-center">Kelas</th>
            <th v-if="props.title === 'tahfizh'" class="px-4 py-4 text-center">Halaqah</th>
            <th v-if="props.title === 'it'" class="px-4 py-4 text-center">IT</th>
            <th class="px-4 py-4 text-center">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr class="">
            <td class="px-4 py-2 text-center"><i class="fas fa-caret-up text-green-500 mr-2"></i>4</td>
            <td class="px-4 py-2 text-center">
              <div class="flex items-center justify-center">
                <img class="rounded-full w-8 h-8 mr-2" src="https://storage.googleapis.com/a1aa/image/zWku6vPRBxNksw5MobRrWxyMsAx0E3a7jtSLbUTzl_g.jpg" alt="Profile picture of the fourth place holder" />Nama Santri
              </div>
            </td>
            <td class="px-4 py-2 text-center">3 QBS</td>
            <td class="px-4 py-2 text-center">Ust Husain</td>
            <td class="px-4 py-2 text-center"><button class="bg-blue-500 text-white px-4 py-1 rounded-[25px]">8452</button></td>
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
const getIndexInLeaderboard = (object: any) => {
  return leaderboard.value.findIndex((student) => student.nama === object.nama);
};

const props = defineProps({
  title: {
    type: String,
    default: "tahfizh",
  },
});
const leaderboard = ref([
  {
    nama: "Muhammad",
    image: "https://app.dreamapps.id/storage/students/photo/222303182.webp",
    kelas: "3 QBS",
    halaqah: "Ust Husain",
    nilai: 100,
  },
  {
    nama: "Ahmad",
    image: "https://app.dreamapps.id/storage/students/photo/222303182.webp",
    kelas: "3 QBS",
    halaqah: "Ust Husain",
    nilai: 90,
  },
  {
    nama: "Ali",
    image: "https://app.dreamapps.id/storage/students/photo/222303182.webp",
    kelas: "3 QBS",
    halaqah: "Ust Husain",
    nilai: 80,
  },
  {
    nama: "Umar",
    image: "https://app.dreamapps.id/storage/students/photo/222303182.webp",
    kelas: "3 QBS",
    halaqah: "Ust Husain",
    nilai: 70,
  },
  {
    nama: "Utsman",
    image: "https://app.dreamapps.id/storage/students/photo/222303182.webp",
    kelas: "3 QBS",
    halaqah: "Ust Husain",
    nilai: 60,
  },
]);
</script>

<style></style>
