<script setup>
import { store } from '../store';
import Logo from '../assets/logo.jpg';

</script>

<template>
  <header class="flex items-center justify-between px-10 py-5 bg-surface border-b border-surface-border shadow-sm header-animated animate-fade-in">
    <div class="flex items-center gap-4">
       <div class="flex items-center gap-3">
      <!-- Sidebar toggle -->
      <button @click="store.toggleSidebar()" class="p-2 rounded-md hover:bg-surface/5 mr-2 btn-animated" aria-label="Toggle sidebar">
        <svg class="w-6 h-6 text-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      <div class="flex items-center gap-3">
  <img
    :src="Logo"
    alt="CyberDrill Logo"
    class="w-14 h-14 object-contain"
  />
  <span class="text-3xl font-extrabold text-dark tracking-tight brand-gradient brand-small">
    CyberDrill
  </span>
</div>

    </div>
    </div>

    <div class="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-transparent hover:border-gray-200 cursor-pointer transition-all btn-animated glow-accent">
      <div class="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xl font-extrabold">
        {{ store.currentUser?.name.charAt(0) }}
      </div>
      <div class="hidden md:flex flex-col">
        <span class="font-semibold text-base text-dark">{{ store.currentUser?.name }}</span>
        <span class="text-xs font-semibold text-primary bg-blue-50 px-2 py-0.5 rounded-md w-fit uppercase">{{ store.currentUser?.role }}</span>
      </div>
    </div>
  </header>
</template>