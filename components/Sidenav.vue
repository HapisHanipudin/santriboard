<template>
  <div class="bg-[#3E62FE] py-6 lg:rounded-4xl rounded-r-4xl px-4 max-lg:h-dvh">
    <div>
      <h1 class="text-3xl text-center p-4 my-6">SI Board</h1>
    </div>
    <div class="flex flex-col px-2 gap-2 relative">
      <NuxtLink to="/" class="p-4 flex items-center gap-4 z-10"> <UIcon name="solar:home-2-bold" size="30" /> <span class="text-xl truncate">Home</span> </NuxtLink>
      <NuxtLink to="/leaderboard" class="p-4 flex items-center gap-4 z-10"> <UIcon name="ph:ranking-fill" size="30" /> <span class="text-xl truncate">Leaderboard</span> </NuxtLink>
      <NuxtLink to="/class" class="p-4 flex items-center gap-4 z-10"> <UIcon name="streamline:class-lesson-solid" size="30" /> <span class="text-xl truncate">Classes</span> </NuxtLink>
      <NuxtLink to="/profile" class="p-4 flex items-center gap-4 z-10"> <UIcon name="solar:notebook-bold" size="30" /> <span class="text-xl truncate">Profile</span> </NuxtLink>
      <NuxtLink to="/settings" class="p-4 flex items-center gap-4 z-10"> <UIcon name="solar:settings-bold" size="30" /> <span class="text-xl truncate">Settings</span> </NuxtLink>

      <div
        :class="{
          'translate-y-[calc((62px+8px))]': $route.path === '/leaderboard',
          'translate-y-[calc((62px+8px)*2)]': $route.path === '/profile',
          'translate-y-[calc((62px+8px)*3)]': $route.path === '/settings',
          'translate-y-[calc((62px+8px)*4)]': $route.path === '/settings',
        }"
        class="absolute transition-transform duration-500 ease-in-out -top-0.5 -right-4 w-[105%] rounded-s-full h-16 bg-[#18181B] -z-0"
      >
        <span class="w-4 h-4 bg-[#18181B] absolute -bottom-4 right-0">
          <div class="w-full h-full rounded-tr-full bg-[#3E62FE]"></div>
        </span>
        <span class="w-4 h-4 bg-[#18181B] absolute -top-4 right-0">
          <div class="w-full h-full rounded-br-full bg-[#3E62FE]"></div>
        </span>
      </div>
    </div>
    <div class="px-2">
      <div class="w-full border my-4"></div>
    </div>
    <div class="flex justify-center">
      <UModal v-if="!session.isAuthenticated">
        <UButton icon="majesticons:login" class="" label="Login" size="xl" color="blue" variant="subtle" />

        <template #content>
          <div class="h-96 m-4 flex flex-col lg:grid lg:grid-cols-2 gap-4 p-4">
            <div class="flex flex-col justify-center">
              <span class="text-blue-600 font-light text-xl">Welcome To</span>
              <span class="text-4xl font-semibold">SantriBoard</span>
            </div>
            <div class="bg-neutral-800 rounded-3xl">
              <LoginForm />
            </div>
          </div>
        </template>
      </UModal>
      <UButton @click="session.logout()" v-else icon="solar:logout-2-bold" class="" label="Logout" size="xl" color="blue" variant="subtle" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const session = useSessionStore();
</script>

<style></style>
