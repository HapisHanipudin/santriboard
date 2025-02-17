<template>
  <NuxtLoadingIndicator />
  <UApp>
    <div class="flex justify-center w-full font-sans p-4">
      <div class="container min-h-screen grid grid-cols-12 gap-6">
        <div class="col-span-3">
          <Sidenav />
        </div>
        <div class="col-span-9">
          <NuxtPage />
        </div>
      </div>
    </div>
  </UApp>
</template>
