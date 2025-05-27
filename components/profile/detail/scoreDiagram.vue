<template>
  <div class="bg-[#1D1E21] rounded-4xl flex items-center gap-2 py-4 px-8">
    <div class="grid grid-cols-4 w-full h-full">
      <!-- Tahfizh Graph -->
      <div class="flex justify-center items-center flex-col gap-3 h-full w-full">
        <div class="flex w-2/3 h-9/12 items-end bg-theme-tahfizh/50 rounded-full overflow-hidden">
          <div :style="{ height: tahfizhPercentage + '%' }" class="w-full bg-theme-tahfizh"></div>
        </div>
        <span>Tahfizh</span>
      </div>
      <!-- IT Graph -->
      <div class="flex justify-center items-center flex-col gap-3 h-full w-full">
        <div class="flex w-2/3 h-9/12 items-end bg-theme-it/50 rounded-full overflow-hidden">
          <div :style="{ height: itPercentage + '%' }" class="w-full bg-theme-it"></div>
        </div>
        <span>IT</span>
      </div>
      <!-- Karakter Graph -->
      <div class="flex justify-center items-center flex-col gap-3 h-full w-full">
        <div class="flex w-2/3 h-9/12 items-end bg-theme-karakter/50 rounded-full overflow-hidden">
          <div :style="{ height: karakterPercentage + '%' }" class="w-full bg-theme-karakter"></div>
        </div>
        <span>Karakter</span>
      </div>
      <!-- Bahasa Graph -->
      <div class="flex justify-center items-center flex-col gap-3 h-full w-full">
        <div class="flex w-2/3 h-9/12 items-end bg-theme-bahasa/50 rounded-full overflow-hidden">
          <div :style="{ height: bahasaPercentage + '%' }" class="w-full bg-theme-bahasa"></div>
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
