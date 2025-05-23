<template>
  <div class="p-6 h-(--container-2xl) rounded-2xl flex flex-col items-center justify-center gap-4">
    <div class="flex flex-col items-center">
      <h3 class="text-2xl font-semibold">{{ student.student.name }}</h3>
      <p class="text-gray-500 text-lg">{{ kelas.name }}</p>
    </div>
    <UForm
      :validate="validate"
      :state="state"
      @submit.prevent="
        onSubmit(state);
        emit('close-modal');
      "
      class="w-full max-w-2xl flex flex-col gap-2"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="flex flex-col gap-3">
          <UFormField name="karakterAspect" label="Aspek Pembelajaran">
            <UInput v-model="state.karakterAspect" class="w-full rounded-xl" size="xl" placeholder="Aspek pembelajaran" />
          </UFormField>

          <UFormField name="frequency" label="Jenis Nilai">
            <USelect v-model="state.frequency" class="w-full rounded-xl" size="xl" trailing-icon="gravity-ui:pencil-to-square" :items="frequencies" />
          </UFormField>
        </div>
        <div class="flex flex-col gap-3">
          <UFormField name="errorCount" label="Jumlah Kesalahan">
            <UInputNumber v-model="state.errorCount" class="w-full rounded-xl" size="xl" placeholder="Jumlah Dikasih Tau" />
          </UFormField>
          <UFormField name="repetitionCount" label="Jumlah Tidak Lancar">
            <UInputNumber v-model="state.repetitionCount" class="w-full rounded-xl" size="xl" placeholder="Jumlah Tidak Lancar" />
          </UFormField>
          <UFormField label="Tanggal Setoran">
            <UPopover>
              <UButton class="w-full rounded-xl" size="xl" color="neutral" variant="subtle" icon="i-lucide-calendar">
                {{ modelValue ? df.format(modelValue.toDate(getLocalTimeZone())) : "Select a date" }}
              </UButton>

              <template #content>
                <UCalendar v-model="modelValue" class="p-2" />
              </template>
            </UPopover>
          </UFormField>
        </div>
        <UFormField name="note" label="Catatan" class="md:col-span-2">
          <UTextarea v-model="state.note" class="w-full rounded-xl" size="xl" placeholder="Catatan" />
        </UFormField>
      </div>
      <div class="flex justify-end gap-2">
        <UButton color="neutral" @click="emit('close-modal')" variant="subtle" size="xl" class="w-full rounded-xl py-3 px-5 max-w-[200px]"> Cancel </UButton>
        <UButton icon="mage:file-upload-fill" color="primary" type="submit" size="xl" class="w-full rounded-xl py-3 px-5 max-w-[200px] text-white"> Upload </UButton>
      </div>
    </UForm>
  </div>
</template>

<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from "@nuxt/ui";
import { CalendarDate, DateFormatter, getLocalTimeZone } from "@internationalized/date";

const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});

const emit = defineEmits(["close-modal"]);

const toast = useToast();

const onSubmit = async (input: any) => {
  try {
    const data = await $fetch("/api/admin/teacher/penilaian/karakter", {
      method: "POST",
      body: input,
    });
    console.log(data);
    if (data.statusCode == 200) {
      toast.add({ title: "Success", description: data.message, color: "success" });
    }
  } catch (error: any) {
    toast.add({ title: "Failed", description: "Failed: " + error?.message, color: "error" });
  }
};

const now = new Date();
const modelValue = shallowRef(new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate()));
const { student, kelas } = defineProps<{
  student: {
    id: string;
    studentId: string;
    semesterId: string;
    student: {
      name: string;
      nis: string;
    };
  };
  kelas: {
    id: string;
    name: string;
    divisionId: string;
  };
}>();

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.karakterAspect) errors.push({ name: "karakterAspect", message: "Required" });
  return errors;
};

const state = reactive({
  studentClassesId: student.id,
  type: "KARAKTER",
  frequency: "HARIAN",
  karakterAspect: "",
  errorCount: 0,
  repetitionCount: 0,
  note: "",
});

const frequencies = ref([
  { label: "Harian", value: "HARIAN" },
  { label: "Mingguan", value: "MINGGUAN" },
  { label: "Bulanan", value: "BULANAN" },
]);
</script>

<style></style>
