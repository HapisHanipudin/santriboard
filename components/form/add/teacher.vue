<script setup lang="ts">
const classId = useRoute().params.id as string;
const toast = useToast();
const emit = defineEmits(["close"]);

const { data: teachers, status } = useFetch("/api/admin/teacher", {
  key: "teacher-list",
  transform: (data: {
    teachers: {
      id: string;
      name: string;
      user: { username: string };
    }[];
  }) => {
    return data?.teachers?.map((teacher) => ({
      label: teacher.name,
      value: String(teacher.id),
      avatar: {
        ui: { image: "object-top" },
        alt: teacher.user.username,
        src: `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=random`,
      },
    }));
  },
  lazy: true,
});

const value = ref<
  {
    label: string;
    value: string;
    avatar: { ui: { image: string }; alt: string; src: string };
  }[]
>([]);

const onSubmit = async () => {
  const selectedTeachers = value.value.map((teacher) => teacher.value);

  try {
    const response = await $fetch(`/api/admin/classes/${classId}/teacher`, {
      method: "POST",
      body: { teachers: selectedTeachers },
    });
    console.log("Teachers added successfully:", response);
    toast.add({ title: "Success", description: "Teachers added successfully", color: "success" });
    emit("close");
  } catch (error) {
    console.error("Error adding teachers:", error);
    toast.add({ title: "Error", description: "Error adding teachers : " + error, color: "error" });
  }
};
</script>
<template>
  <UForm :state="value" class="w-full flex flex-col py-4 px-6" @submit="onSubmit">
    <UInputMenu class="w-full" v-model="value" :items="teachers" :loading="status === 'pending'" icon="i-lucide-user" placeholder="Select teachers" multiple />
    <div class="flex justify-end">
      <UButton type="submit" class="mt-2">Submit</UButton>
    </div>
  </UForm>
</template>
