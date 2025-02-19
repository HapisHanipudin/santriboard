<template>
  <div>
    <div class="flex w-full">
      <UForm :state="newTeacher" @submit="submit" class="flex flex-col w-full gap-4">
        <UFormField label="Nama" class="w-full">
          <UInput class="w-full" v-model="newTeacher.name" />
        </UFormField>
        <div>
          <UButton @click="addDivisions">Tambah Divisi</UButton>
        </div>
        <div class="flex flex-col w-full gap-4" v-for="(division, index) in newTeacher.divisions" :key="index">
          <UFormField class="w-full" label="Divisi">
            <UInputMenu class="w-full" v-model="division.divisionId" value-key="value" :items="divisions" />
          </UFormField>
          <UFormField class="w-full" label="Role">
            <UInputMenu class="w-full" v-model="division.role" value-key="value" :items="roles" />
          </UFormField>
        </div>
      </UForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
const newTeacher = ref({
  name: "",
  divisions: [] as { divisionId: Field; role: teacherRole }[],
});

const roles = ref([
  { value: "ASATIDZ", label: "Asatidz" },
  { value: "KADIV", label: "Kadiv" },
] as { value: teacherRole; label: string }[]);

const divisions = ref([
  { value: "TAHFIZH", label: "Tahfizh" },
  { value: "IT", label: "IT" },
  { value: "KARAKTER", label: "Karakter" },
  { value: "BAHASA", label: "Bahasa" },
] as { value: Field; label: string }[]);

const submit = () => {
  console.log(newTeacher.value);
};

const addDivisions = () => {
  newTeacher.value.divisions.push({
    divisionId: "TAHFIZH",
    role: "ASATIDZ",
  });
};
</script>

<style></style>
