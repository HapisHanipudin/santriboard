<template>
  <div class="flex flex-col gap-2 max-h-fit">
    <h2 class="text-2xl font-semibold">Pencapaian</h2>
    <div class="bg-[#1D1E21] rounded-4xl h-full max-h-[500px] overflow-clip overflow-y-auto">
      <div class="overflow-hidden">
        <ProfileDetailAchievement v-for="i in 17" title="Juara 1 Lomba Cerdas Cermat" description="Juara 1 Lomba Cerdas Cermat tingkat sekolah" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
