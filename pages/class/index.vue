<template>
  <div>
    <TabWrapper :tabs="tabTitles">
      <Tab v-for="tab in tabTitles" :title="tab.title"><ClassViews :title="tab.title" /></Tab>
    </TabWrapper>
  </div>
</template>

<script lang="ts" setup>
const session = useSessionStore();
const isAuthenticated = computed(() => session.isAuthenticated);
const tabTitles = ref([
  {
    title: "semua",
    icon: "fa:users",
    display: "Semua",
  },
  ...((isAuthenticated.value === true
    ? session.authUser?.teacher.divisions.map((division: any) => {
        return {
          title: division.id,
          icon: division.icon,
          display: division.name.charAt(0).toUpperCase() + division.name.slice(1),
        };
      })
    : []) as any),
]);

watch(isAuthenticated, () => {
  if (isAuthenticated.value === true) {
    tabTitles.value.push(
      ...session.authUser?.teacher.divisions.map((division: any) => {
        return {
          title: division.id,
          icon: division.icon,
          display: division.name.charAt(0).toUpperCase() + division.name.slice(1),
        };
      })
    );
  }
});
</script>

<style></style>
