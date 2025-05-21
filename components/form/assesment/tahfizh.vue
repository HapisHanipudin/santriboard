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
          <UFormField name="pageCount" label="Jumlah setoran">
            <UInputNumber
              :format-options="{
                minimumFractionDigits: 1,
              }"
              step="0.5"
              v-model="state.pageCount"
              class="w-full rounded-xl"
              size="xl"
              placeholder="Jumlah Setoran"
            />
          </UFormField>
          <UFormField name="page" label="Halaman">
            <UInput v-model="state.page" class="w-full rounded-xl" size="xl" placeholder="Halaman yang disetorkan" />
          </UFormField>
          <UFormField name="frequency" label="Frekuensi">
            <USelect v-model="state.frequency" class="w-full rounded-xl" size="xl" trailing-icon="gravity-ui:pencil-to-square" :items="frequencies" />
          </UFormField>
        </div>
        <div class="flex flex-col gap-3">
          <UFormField name="mistakeCount" label="Jumlah Kesalahan">
            <UInputNumber v-model="state.mistakeCount" class="w-full rounded-xl" size="xl" placeholder="Jumlah Kesalahan" />
          </UFormField>
          <UFormField name="repeatedCount" label="Jumlah Dikasih Tau">
            <UInputNumber v-model="state.repeatedCount" class="w-full rounded-xl" size="xl" placeholder="Jumlah Dikasih Tau" />
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
    const data = await $fetch("/api/admin/teacher/penilaian/tahfizh", {
      method: "POST",
      body: input,
    });
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
  if (!state.page) errors.push({ name: "page", message: "Required" });
  if (!(state.pageCount > 0)) errors.push({ name: "pageCount", message: "Required" });
  return errors;
};

const state = reactive({
  studentClassesId: student.id,
  pageCount: 0,
  page: "",
  frequency: "HARIAN",
  type: "TAHFIZH",
  mistakeCount: 0,
  repeatedCount: 0,
  note: "",
});

const frequencies = ref([
  { label: "Harian", value: "HARIAN" },
  { label: "Mingguan", value: "MINGGUAN" },
  { label: "Bulanan", value: "BULANAN" },
]);
</script>

<style></style>
