<template>
  <NuxtLoadingIndicator />
  <Head>
    <Link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
  </Head>
  <UApp>
    <div class="flex justify-center w-full font-sans p-4">
      <div class="container min-h-screen grid lg:grid-cols-12 gap-6">
        <button @click="changeCanvas()" class="lg:hidden z-40 p-4 rounded-r-full bg-[#3E62FE] fixed bottom-0 left-0 flex items-center justify-center -translate-y-8"><UIcon name="solar:hamburger-menu-bold" size="30" /></button>
        <div :class="{ 'max-lg:-translate-x-full': mobileCanvas === false }" class="col-span-3 max-lg:fixed transition-transform duration-150 ease-in-out max-lg:top-0 max-lg:left-0 max-lg:h-dvh z-50">
          <Sidenav @click.stop="" class="z-50" />
        </div>
        <div @click="changeCanvas" :class="{ hidden: mobileCanvas === false }" class="z-40 top-0 left-0 fixed w-screen h-dvh bg-black/60 lg:hidden"></div>
        <div class="col-span-9">
          <NuxtPage />
        </div>
      </div>
    </div>
  </UApp>
</template>

<script setup>
const session = useSessionStore();

const changeCanvas = () => {
  mobileCanvas.value = !mobileCanvas.value;
};
const mobileCanvas = ref(false);

onBeforeMount(() => {
  // Add your onMounted logic here
  session.initAuth();
});
</script>
