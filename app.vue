<template>
  <NuxtLoadingIndicator />
  <UApp>
    <div class="flex justify-center w-full font-sans p-4">
      <div class="container min-h-screen grid lg:grid-cols-12 gap-6">
        <div class="col-span-3 max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:h-screen z-50">
          <Sidenav />
        </div>
        <div class="col-span-9">
          <NuxtPage />
        </div>
      </div>
    </div>
  </UApp>
</template>
