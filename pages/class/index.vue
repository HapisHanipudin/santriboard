<template>
  <div>
    <div class="flex w-full">
      <UForm :state="newClass" @submit="submit" class="flex flex-col w-full gap-4">
        <UFormField label="Nama" class="w-full">
          <UInput class="w-full" v-model="newClass.name" />
        </UFormField>

        <UFormField class="w-full" label="Divisi">
          <UInputMenu class="w-full" v-model="newClass.division" value-key="value" :items="divisions" />
        </UFormField>
      </UForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
const newClass = ref({
  name: "",
  division: "TAHFIZH",
} as { name: string; division: Field });

const divisions = ref([
  { value: "TAHFIZH", label: "Tahfizh" },
  { value: "IT", label: "IT" },
  { value: "KARAKTER", label: "Karakter" },
  { value: "BAHASA", label: "Bahasa" },
] as { value: Field; label: string }[]);

const submit = () => {
  console.log(newClass.value);
};
</script>

<style></style>
