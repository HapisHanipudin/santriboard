<template>
  <div class="bg-[#1D1E21] rounded-4xl flex items-center gap-4 w-full h-full p-6">
    <div class="rounded-full w-40 h-40 overflow-hidden">
      <img :src="student.image" class="object-cover object-top" alt="" />
    </div>
    <div class="flex flex-col gap-2">
      <div class="flex-col flex">
        <span class="text-gray-400">Nama</span>
        <span class="text-2xl font-medium">{{ student.name }}</span>
      </div>
      <div class="flex-col flex">
        <span class="text-gray-400">Panggilan</span>
        <span class="text-2xl font-medium">{{ student.nickname }}</span>
      </div>
      <div class="flex-col flex">
        <span class="text-gray-400">Umur</span>
        <span class="text-2xl font-medium">{{ calculateAge(student.birthdate) }} tahun</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Student {
  id: number;
  name: string;
  nickname: string;
  image: string;
  birthdate: string;
}

const calculateAge = (birthdate: string): number => {
  const today = new Date();
  const birthdateParts = birthdate.split("-");
  const birthYear = parseInt(birthdateParts[0]);
  const birthMonth = parseInt(birthdateParts[1]);
  const birthDay = parseInt(birthdateParts[2]);

  let age = today.getFullYear() - birthYear;

  if (today.getMonth() < birthMonth || (today.getMonth() === birthMonth && today.getDate() < birthDay)) {
    age--;
  }

  return age;
};

const { student } = defineProps({
  student: {
    type: Object as PropType<Student>,
    default: {
      id: 1,
      name: "Muhammad Iqbal Mubarok",
      nickname: "Iqbal",
      image: "https://avatars.githubusercontent.com/u/57764837?v=4",
      birthdate: "2003-03-30",
    },
  },
});
</script>

<style></style>
