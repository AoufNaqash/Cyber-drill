<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';
import { store } from './store';

const route = useRoute();
const isAuthPage = computed(() => route.path === '/login');
</script>

<template>
  <div v-if="!store.currentUser || isAuthPage" class="flex items-center justify-center min-h-screen p-5">
    <router-view />
  </div>

  <div v-else class="flex h-screen overflow-hidden bg-surface shadow-2xl max-w-350 w-full mx-auto">
    <Sidebar />
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-app-background">
      <Header />
      <main class="w-full grow p-6 md:p-9">
        <router-view />
      </main>
    </div>
  </div>
</template>