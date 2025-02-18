<template>
  <div class="font-sans max-w-4xl mx-auto p-6">
    <div class="flex items-center space-x-4">
      <div class="w-20 h-20 rounded-full overflow-hidden relative">
        <img :src="profilePicUrl" alt="Profile picture" class="w-full h-full object-cover">
        <input type="file" class="absolute inset-0 opacity-0 cursor-pointer" @change="loadFile">
      </div>
      <div class="flex-grow">
        <h1 class="text-2xl font-semibold">Azzam Hudiya
          <span class="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">TOP #1</span>
        </h1>
        <p class="text-gray-600"><i class="fas fa-envelope"></i> hudiya777@gmail.com</p>
      </div>
    </div>

    <div class="mt-6 border-b border-gray-200">
      <nav class="flex space-x-4">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="py-4 px-1 text-gray-300 hover:text-gray-500 cursor-pointer"
          :class="{ 'active-tab text-indigo-600 border-indigo-600': activeTab === tab.id }"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <div class="mt-6" v-if="activeTab === 'details'">
      <div class="space-y-6">
        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-300">Nickname</label>
          <div class="relative">
            <input type="text" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-[15px] shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-user text-gray-400"></i>
            </div>
          </div>
        </div>
        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-300">Email</label>
          <div class="relative">
            <input type="text" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-[15px] shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-envelope text-gray-400"></i>
            </div>
          </div>
        </div>
        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-300">Bio</label>
          <div class="relative">
            <input type="text" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-[15px] shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-info-circle text-gray-400"></i>
            </div>
          </div>
        </div>
        <div class="flex justify-end space-x-3">
          <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-[15px] hover:bg-gray-300">Cancel</button>
          <button class="px-4 py-2 bg-blue-500 text-white rounded-[15px] hover:bg-blue-600">Save Changes</button>
        </div>
      </div>
    </div>

    <div class="mt-6" v-if="activeTab === 'security'">
      <div class="space-y-6">
        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-300">Old Password</label>
          <div class="relative">
            <input type="password" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-[15px] shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-lock text-gray-400"></i>
            </div>
          </div>
        </div>
        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-300">New Password</label>
          <div class="relative">
            <input type="password" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-[15px] shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-lock text-gray-400"></i>
            </div>
          </div>
        </div>
        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-300">Confirm New Password</label>
          <div class="relative">
            <input type="password" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-[15px] shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-lock text-gray-400"></i>
            </div>
          </div>
        </div>
        <div class="flex justify-end space-x-3">
          <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-[15px] hover:bg-gray-300">Cancel</button>
          <button class="px-4 py-2 bg-blue-500 text-white rounded-[15px] hover:bg-blue-600">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeTab = ref("details");
const profilePicUrl = ref("https://placehold.co/80x80");

const tabs = [
  { id: "details", label: "Details" },
  { id: "security", label: "Security" }
];

const loadFile = (event) => {
  const file = event.target.files[0];
  if (file) {
    profilePicUrl.value = URL.createObjectURL(file);
  }
};
</script>

<style scoped>
.active-tab {
  color: #2196F3;
  border-bottom: 2px solid #2196F3;
}
</style>
