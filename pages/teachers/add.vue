<template>
  <div>
    <div>
      <UForm :state="newTeacher" @submit="submit">
        <UFormField label="Nama">
          <UInput v-model="newTeacher.name" />
        </UFormField>
        <div>
          <UButton @click="addDivisions">Tambah Divisi</UButton>
        </div>
        <div v-for="(division, index) in newTeacher.divisions" :key="index">
          <UFormField label="Divisi">
            <USelect v-model="division.divisionId">
              <option value="TAHFIZH">Tahfizh</option>
              <option value="IT">IT</option>
              <option value="KARAKTER">Karakter</option>
              <option value="BAHASA">Bahasa</option>
            </USelect>
          </UFormField>
          <UFormField label="Role">
            <USelect v-model="division.role">
              <option value="KADIV">Kadiv</option>
              <option value="ASATIDZ">Asatidz</option>
            </USelect>
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
