<script setup>
import { useRouter } from 'vue-router';
import { store } from '../store';

const router = useRouter();

const logout = () => {
  store.logout();
  router.push('/login');
};
</script>

<template>
  <div>
    <!-- Backdrop: closes sidebar on mobile when clicking outside -->
    <div v-if="store.sidebarOpen" @click="store.closeSidebar()" class="fixed inset-0 bg-black/40 z-40 md:hidden"></div>

    <!-- Sidebar panel -->
    <aside v-if="store.sidebarOpen" class="fixed left-0 top-0 bottom-0 z-50 flex flex-col w-64 bg-sidebar text-white py-8 border-r border-white/10 shadow-lg md:relative md:translate-x-0 md:z-auto md:fixed">
      <div class="px-6 flex items-center justify-between">
        <div class="text-lg font-bold">Menu</div>
        <button @click="store.closeSidebar()" class="p-2 rounded-md hover:bg-white/5" aria-label="Close sidebar">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <nav class="flex-1 mt-6 space-y-1">
        <router-link @click="store.closeSidebar()" to="/" active-class="bg-blue-500/20 border-l-4 border-primary" class="flex items-center px-8 py-4 text-gray-300 hover:bg-primary-10 hover:pl-9 transition-all border-l-4 border-transparent">
          <svg class="w-5 h-5 text-primary-light" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm10 8h8V11h-8v10z"/></svg>
          <span class="ml-4 font-medium">Dashboard</span>
        </router-link>

        <router-link @click="store.closeSidebar()" to="/drills" active-class="bg-blue-500/20 border-l-4 border-primary" class="flex items-center px-8 py-4 text-gray-300 hover:bg-primary-10 hover:pl-9 transition-all border-l-4 border-transparent">
          <svg class="w-5 h-5 text-primary-light" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4zM4 10h10v2H4zM4 14h16v2H4z"/></svg>
          <span class="ml-4 font-medium">Training Drills</span>
        </router-link>

        <router-link v-if="store.currentUser?.role !== 'trainer'" @click="store.closeSidebar()" to="/results" active-class="bg-blue-500/20 border-l-4 border-primary" class="flex items-center px-8 py-4 text-gray-300 hover:bg-primary-10 hover:pl-9 transition-all border-l-4 border-transparent">
          <svg class="w-5 h-5 text-primary-light" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h4v8H3zM10 3h4v18h-4zM18 8h4v13h-4z"/></svg>
          <span class="ml-4 font-medium">Results</span>
        </router-link>

        <router-link v-if="store.currentUser?.role === 'trainer'" @click="store.closeSidebar()" to="/students" active-class="bg-blue-500/20 border-l-4 border-primary" class="flex items-center px-8 py-4 text-gray-300 hover:bg-primary-10 hover:pl-9 transition-all border-l-4 border-transparent">
          <svg class="w-5 h-5 text-primary-light" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-4 0-8 2-8 6h16c0-4-4-6-8-6z"/></svg>
          <span class="ml-4 font-medium">Students Results</span>
        </router-link>

        <router-link v-if="store.currentUser?.role === 'trainer'" @click="store.closeSidebar()" to="/create" active-class="bg-blue-500/20 border-l-4 border-primary" class="flex items-center px-8 py-4 text-gray-300 hover:bg-primary-10 hover:pl-9 transition-all border-l-4 border-transparent">
          <svg class="w-5 h-5 text-primary-light" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <polygon points="12 3 5 7 5 17 12 21 19 17 19 7" />
            <path d="M9.5 13.5a4.1 4.1 0 0 1 5.9-5.9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            <circle cx="12" cy="8.5" r="0.9" fill="currentColor" />
          </svg>
          <span class="ml-4 font-medium">Create Drill</span>
        </router-link>

        <router-link @click="store.closeSidebar()" to="/profile" active-class="bg-blue-500/20 border-l-4 border-primary" class="flex items-center px-8 py-4 text-gray-300 hover:bg-primary-10 hover:pl-9 transition-all border-l-4 border-transparent">
          <svg class="w-5 h-5 text-primary-light" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-4 0-8 2-8 6h16c0-4-4-6-8-6z"/></svg>
          <span class="ml-4 font-medium">Profile</span>
        </router-link>
      </nav>

      <div class="pt-6 border-t border-white/10 px-8">
        <button @click="logout(); store.closeSidebar();" class="w-full flex items-center px-3 py-3 text-red-400 hover:bg-red-500/10 transition-colors rounded-xl">
          <svg class="w-4 h-4 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>
          <span class="ml-2 font-medium">Logout</span>
        </button>
      </div>

    </aside>
  </div>
</template>