<template>
  <div class="p-3">
    <UBreadcrumb :items="items" />

    <div>
      <h1 class="text-3xl font-bold">PLP 3</h1>
      <p class="text-gray-400">Ust. Mukhlis</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from "@nuxt/ui";

const items = ref<BreadcrumbItem[]>([
  {
    label: "Home",
    icon: "solar:home-2-bold",
  },
  {
    label: "Classes",
    icon: "streamline:class-lesson-solid",
    to: "/class",
  },
  {
    label: "PLP 3",
    to: "/class/3",
  },
]);
</script>

<style></style>
