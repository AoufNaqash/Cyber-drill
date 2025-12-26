<script setup>
import { store } from '../store';
import { useRouter } from 'vue-router';

const router = useRouter();

const startDrill = (drill) => {
  router.push({ name: 'drill', params: { id: drill.id } });
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
      <div>
        <h1 class="text-3xl font-extrabold text-dark">Training Drills</h1>
        <p class="text-gray-500 mt-2">Select a drill to begin training</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        v-for="drill in store.drills"
        :key="drill.id"
        class="bg-surface rounded-2xl overflow-hidden shadow-sm border border-transparent hover:border-surface-border hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full relative"
      >

        <!-- Top Right Action Button -->
        <div
          v-if="store.currentUser?.role === 'trainer'"
          class="absolute top-4 right-4 z-10 group"
        >
          <button
            class="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50"
          >
            <svg
              class="w-5 h-5 text-gray-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>

          <!-- Dropdown -->
          <div
            class="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
          >
            <button
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-xl"
            >
              ✏️ Edit Drill
            </button>
            <button
              class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-xl"
            >
              🗑️ Delete Drill
            </button>
          </div>
        </div>

        <div class="p-6 flex-1 relative">
          <span
            class="absolute top-5 right-5 bg-linear-to-r from-primary to-primary-dark text-white text-xs font-bold px-3 py-1 rounded-full uppercase"
          >
            {{ drill.category }}
          </span>

          <h3 class="text-xl font-extrabold text-dark mb-3 pr-16">
            {{ drill.title }}
          </h3>

          <p class="text-gray-500 text-sm mb-6">
            {{ drill.description }}
          </p>

          <div class="flex flex-wrap gap-3 mb-4">
            <span class="bg-slate-50 text-gray-500 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2">
              <i class="fas fa-clock"></i> {{ drill.duration }} min
            </span>
            <span class="bg-slate-50 text-gray-500 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2">
              <i class="fas fa-signal"></i> {{ drill.difficulty }}
            </span>
          </div>

          <div class="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
            <span class="text-xs font-bold text-primary block mb-1">
              Scenario:
            </span>
            <p class="text-xs text-gray-600 italic">
              {{ drill.scenario }}
            </p>
          </div>
        </div>

        <div
          class="p-5 bg-slate-50 border-t border-gray-100 flex justify-between items-center mt-auto"
        >
          <span class="font-bold text-gray-600 text-sm">
            Max: {{ drill.maxScore }} pts
          </span>

          <div>
            <router-link
              v-if="store.currentUser?.role === 'trainer'"
              :to="{ name: 'drill-students', params: { id: drill.id } }"
              class="px-5 py-2 rounded-lg font-bold text-sm btn-accent inline-flex items-center gap-2"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h4v8H3zM10 3h4v18h-4zM18 8h4v13h-4z" />
              </svg>
              View Results
            </router-link>

            <button
              v-else
              @click="startDrill(drill)"
              class="btn-accent px-5 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
