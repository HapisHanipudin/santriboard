<template>
  <UForm :validate="validate" class="p-4 flex flex-col gap-4 w-full" @submit="session.login(state)" :state="state">
    <UFormField label="Username" name="username">
      <UInput v-model="state.username" class="w-full" size="xl" icon="solar:user-outline" placeholder="Enter your Username" />
    </UFormField>
    <UFormField label="Password" name="password">
      <UInput class="w-full" size="xl" icon="akar-icons:key" v-model="state.password" placeholder="Password" :type="show ? 'text' : 'password'" :ui="{ trailing: 'pe-1' }">
        <template #trailing>
          <UButton color="neutral" variant="link" size="sm" :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'" :aria-label="show ? 'Hide password' : 'Show password'" :aria-pressed="show" aria-controls="password" @click="show = !show" />
        </template>
      </UInput>
    </UFormField>
    <div class="flex justify-center">
      <UButton size="xl" type="submit"> Login </UButton>
    </div>
  </UForm>
</template>

<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from "@nuxt/ui";
const session = useSessionStore();

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.username) errors.push({ name: "username", message: "Required" });
  if (!state.password) errors.push({ name: "password", message: "Required" });
  return errors;
};
const toast = useToast();

const onSubmit = () => {};

const state = reactive({
  username: "",
  password: "",
});

const show = ref(false);
</script>

<style></style>
