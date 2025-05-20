<template>
  <UModal v-if="!session.isAuthenticated">
    <UButton icon="majesticons:login" class="" label="Login" size="xl" variant="subtle" />

    <template #content>
      <div class="h-96 m-4 flex flex-col lg:grid lg:grid-cols-2 gap-4 p-4">
        <div class="flex flex-col justify-center">
          <span class="text-blue-600 font-light text-xl">Welcome To</span>
          <span class="text-4xl font-semibold">SantriBoard</span>
        </div>
        <div class="bg-neutral-800 flex items-center rounded-3xl">
          <AuthForm />
        </div>
      </div>
    </template>
  </UModal>
  <UButton @click="session.logout()" v-else icon="solar:logout-2-bold" class="" label="Logout" size="xl" variant="subtle" />
</template>

<script lang="ts" setup>
const session = useSessionStore();
</script>

<style></style>
