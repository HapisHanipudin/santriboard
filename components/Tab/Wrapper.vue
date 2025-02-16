<template>
  <div>
    <div class="p-2 rounded-3xl bg-zinc-700">
      <div class="w-full grid grid-cols-4 relative">
        <span @click="selectTitle(title)" v-for="(title, index) in props.titles" :key="index" class="text-center z-10 py-2">
          <span class="text-2xl capitalize">{{ title }}</span>
        </span>
        <div :style="{ transform: `translateX(${props.titles.indexOf(selectedTitle)}00%)` }" class="w-1/4 h-full bg-[#3E62FE] absolute top-0 left-0 -z-0 rounded-2xl transition-transform duration-500 ease-in-out"></div>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  titles: {
    type: Array,
    default: () => ["tahfizh", "it", "karakter", "bahasa"],
  },
});

const selectedTitle = ref(props.titles[0]);

const selectTitle = (title: any) => {
  selectedTitle.value = title;
};
</script>
