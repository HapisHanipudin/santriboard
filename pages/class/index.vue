<template>
  <div>
    <TabWrapper :tabs="tabTitles">
      <Tab title="tahfizh"><ClassViews title="tahfizh" /></Tab>
      <Tab title="it"><ClassViews title="it" /></Tab>
      <Tab title="karakter"><ClassViews title="karakter" /></Tab>
      <Tab title="bahasa"><ClassViews title="bahasa" /></Tab>
    </TabWrapper>
  </div>
</template>

<script lang="ts" setup>
const tabTitles = ref([
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
