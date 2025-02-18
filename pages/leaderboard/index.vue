<template>
  <div>
    <TabWrapper :tabs="tabTitles">
      <Tab title="allRounded"><Leaderboard /></Tab>
      <Tab title="tahfizh"><Leaderboard title="tahfizh" /></Tab>
      <Tab title="it"><Leaderboard title="it" /></Tab>
      <Tab title="karakter"><Leaderboard title="karakter" /></Tab>
      <Tab title="bahasa"><Leaderboard title="bahasa" /></Tab>
    </TabWrapper>
  </div>
</template>

<script lang="ts" setup>
const tabTitles = ref([
  {
    title: "allRounded",
    icon: "fa:users",
    display: "All Rounded",
  },
  {
    title: "tahfizh",
    icon: "el:book",
    display: "Tahfizh",
  },
  {
    title: "it",
    icon: "mynaui:desktop-solid",
    display: "IT",
  },
  {
    title: "karakter",
    icon: "streamline:brain-cognitive-solid",
    display: "Karakter",
  },
  {
    title: "bahasa",
    icon: "fa6-solid:language",
    display: "Bahasa",
  },
]);
</script>

<style></style>
