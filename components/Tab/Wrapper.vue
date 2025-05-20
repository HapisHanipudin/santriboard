<template>
  <div class="flex flex-col gap-4">
    <div class="p-2 rounded-3xl bg-zinc-700">
      <div :style="{ 'grid-template-columns': `repeat(${props.tabs.length}, minmax(0, 1fr))` }" class="w-full grid relative">
        <button @click="selectTitle(tab.title)" v-for="(tab, index) in props.tabs" :key="index" class="flex cursor-pointer justify-center items-center gap-2 z-10 py-2">
          <UIcon v-if="tab.icon" :name="`${tab.icon}`" class="text-2xl" />
          <span class="text-xl xl:text-2xl capitalize max-md:hidden truncate">{{ tab.display }}</span>
        </button>
        <div
          :style="{ transform: `translateX(${props.tabs.findIndex((tab) => tab.title === selectedTitle)}00%)`, width: `calc(1/${props.tabs.length} * 100%)` }"
          class="h-full bg-[#3E62FE] absolute top-0 left-0 -z-0 rounded-2xl transition-transform duration-500 ease-in-out"
        ></div>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Tab {
  title: string;
  icon: string | boolean;
  display: string;
}
const props = defineProps({
  tabs: {
    type: Array as PropType<Tab[]>,
    default: () => [
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
    ],
  },
});

const selectedTitle = ref(props.tabs[0].title);

const selectTitle = (title: any) => {
  selectedTitle.value = title;
};

provide("selectedTitle", selectedTitle);
</script>
