<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { store } from '../store';

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);
const drill = store.drills.find(d => d.id === id) || null;
const score = ref(null);
const running = ref(false);

const runSimulation = () => {
  running.value = true;
  // simulate short delay
  setTimeout(() => {
    const s = Math.floor(Math.random() * 21) + 80; // 80-100
    score.value = s;
    store.addResult({
      drillId: drill.id,
      student: store.currentUser.name,
      score: s,
      maxScore: drill.maxScore,
      date: new Date().toISOString().split('T')[0],
      feedback: 'Great job completing the simulation.',
      status: 'completed'
    });
    running.value = false;
    // navigate to results page to see aggregated results
    router.push('/results');
  }, 900);
};
</script>

<template>
  <div v-if="drill">
    <div class="mb-6">
      <h1 class="text-2xl font-extrabold text-dark">{{ drill.title }}</h1>
      <p class="text-muted">{{ drill.description }}</p>
    </div>

    <div class="bg-surface rounded-2xl p-6 shadow-sm border border-surface-border">
      <div class="flex items-center justify-between mb-4">
        <div>
          <div class="text-sm text-muted">Duration</div>
          <div class="font-bold">{{ drill.duration }} min</div>
        </div>
        <div>
          <div class="text-sm text-muted">Difficulty</div>
          <div class="font-bold">{{ drill.difficulty }}</div>
        </div>
        <div>
          <div class="text-sm text-muted">Max Score</div>
          <div class="font-bold">{{ drill.maxScore }}</div>
        </div>
      </div>

      <div class="mt-6">
        <p class="text-sm text-gray-600 italic">{{ drill.scenario }}</p>
      </div>

      <div class="mt-8 flex items-center gap-4">
        <button v-if="store.currentUser?.role !== 'trainer'" @click="runSimulation" :disabled="running" class="btn-accent px-6 py-3 font-bold rounded-xl flex items-center gap-3">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7z"/></svg>
          <span v-if="!running">Start Simulation</span>
          <span v-else>Running...</span>
        </button>

        <router-link v-else :to="{ name: 'drill-students', params: { id: drill.id } }" class="btn-accent px-6 py-3 font-bold rounded-xl inline-flex items-center gap-3">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 13h4v8H3zM10 3h4v18h-4zM18 8h4v13h-4z"/></svg>
          View Students Results
        </router-link>

        <button @click="router.push('/drills')" class="px-4 py-3 rounded-xl border border-surface-border">Back</button>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-muted">Drill not found.</p>
  </div>
</template>