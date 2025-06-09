<script setup lang="ts">
const classId = useRoute().params.id as string;
const toast = useToast();
const emit = defineEmits(["close"]);

const { data: users, status } = useFetch("/api/admin/students/", {
  key: "typicode-users",
  transform: (data: {
    students: {
      id: string;
      name: string;
      nick: string;
      nis: string;
      photo: string;
      gender: string;
    }[];
  }) => {
    return data?.students?.map((student) => ({
      label: student.name,
      value: String(student.id),
      avatar: {
        ui: { image: "object-top" },
        alt: student.nick,
        src: `https://app.dreamapps.id/storage/students/photo/${student.photo}`,
      },
    }));
  },
  lazy: true,
});

const onSubmit = async () => {
  const selectedUsers = value.value.map((user) => user.value);

  try {
    const response = await $fetch(`/api/admin/classes/${classId}/student`, {
      method: "POST",
      body: { students: selectedUsers },
    });
    // Handle successful response
    console.log("Students added successfully:", response);
    toast.add({ title: "Success", description: "Students added successfully", color: "success" });
    emit("close"); // Emit close event
  } catch (error) {
    // Handle error
    console.error("Error adding students:", error);
    toast.add({ title: "Error", description: "Error adding students : " + error, color: "error" }); // Adjust error response
  }
};

const value = ref<{ label: string; value: string; avatar: { ui: { image: string }; alt: string; src: string } }[]>([]);
</script>

<template>
  <UForm :state="value" class="w-full flex flex-col py-4 px-6" @submit="onSubmit">
    <UInputMenu class="w-full" v-model="value" :items="users" :loading="status === 'pending'" icon="i-lucide-user" placeholder="Select students" multiple />
    <!-- BEGIN: Submit Button -->
    <div class="flex justify-end">
      <UButton type="submit" class="mt-2">Submit</UButton>
    </div>
    <!-- END: Submit Button -->
  </UForm>
</template>
