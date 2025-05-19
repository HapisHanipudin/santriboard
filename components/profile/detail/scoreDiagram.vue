<template>
  <div class="bg-[#1D1E21] rounded-4xl flex items-center gap-2 py-4 px-8">
    <div class="grid grid-cols-4 w-full h-full">
      <!-- Tahfizh Graph -->
      <div class="flex justify-center items-center flex-col gap-3 h-full w-full">
        <div class="flex w-2/3 h-9/12 items-end bg-[#3EFEBB]/50 rounded-full overflow-hidden">
          <div :style="{ height: tahfizhPercentage + '%' }" class="w-full bg-[#3EFEBB]"></div>
        </div>
        <span>Tahfizh</span>
      </div>
      <!-- IT Graph -->
      <div class="flex justify-center items-center flex-col gap-3 h-full w-full">
        <div class="flex w-2/3 h-9/12 items-end bg-[#3E62FE]/50 rounded-full overflow-hidden">
          <div :style="{ height: itPercentage + '%' }" class="w-full bg-[#3E62FE]"></div>
        </div>
        <span>IT</span>
      </div>
      <!-- Karakter Graph -->
      <div class="flex justify-center items-center flex-col gap-3 h-full w-full">
        <div class="flex w-2/3 h-9/12 items-end bg-[#FE6B3E]/50 rounded-full overflow-hidden">
          <div :style="{ height: karakterPercentage + '%' }" class="w-full bg-[#FE6B3E]"></div>
        </div>
        <span>Karakter</span>
      </div>
      <!-- Bahasa Graph -->
      <div class="flex justify-center items-center flex-col gap-3 h-full w-full">
        <div class="flex w-2/3 h-9/12 items-end bg-[#FEE13E]/50 rounded-full overflow-hidden">
          <div :style="{ height: bahasaPercentage + '%' }" class="w-full bg-[#FEE13E]"></div>
        </div>
        <span>Bahasa</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const tahfizhPercentage = 80;
const itPercentage = 65;
const karakterPercentage = 75;
const bahasaPercentage = 90;
</script>

<style></style>
