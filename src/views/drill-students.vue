<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { store } from '../store';

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);
const drill = store.drills.find(d => d.id === id) || null;

// results for this drill
const results = computed(() => store.myResults.filter(r => r.drillId === id));

// aggregated by student
const byStudent = computed(() => {
  const map = {};
  results.value.forEach(r => {
    if (!map[r.student]) map[r.student] = [];
    map[r.student].push(r);
  });
  return Object.entries(map).map(([student, entries]) => ({ student, entries }));
});
</script>

<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-xl font-bold">{{ drill?.title?.charAt(0) }}</div>
        <div>
          <h1 class="text-2xl font-extrabold text-dark">{{ drill?.title || 'Drill' }}</h1>
          <p class="text-muted">Results for this drill</p>
        </div>
      </div>
      <div class="text-sm text-muted">Total students: <span class="font-semibold text-dark">{{ byStudent.length }}</span></div>
    </div>

    <div v-if="!drill" class="text-muted">Drill not found.</div>

    <div v-else class="grid grid-cols-1 gap-4">
      <div v-if="byStudent.length === 0" class="p-6 text-center text-muted bg-surface rounded-lg border border-surface-border">No students have attempted this drill yet.</div>

      <div v-else>
        <div v-for="item in byStudent" :key="item.student" class="bg-surface rounded-lg p-4 shadow-sm border border-surface-border flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-md bg-gradient-primary flex items-center justify-center text-white font-bold">{{ item.student.charAt(0) }}</div>
            <div>
              <div class="font-semibold text-dark">{{ item.student }}</div>
              <div class="text-sm text-muted">Attempts: {{ item.entries.length }} • Latest: {{ item.entries[item.entries.length-1].score }}/{{ item.entries[item.entries.length-1].maxScore }}</div>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="w-40">
              <div class="flex items-center gap-3">
                <div class="text-sm font-semibold">{{ item.entries[item.entries.length-1].score }} / {{ item.entries[item.entries.length-1].maxScore }}</div>
                <div class="flex-1">
                  <div class="score-bar">
                    <div :style="{ width: (item.entries[item.entries.length-1].score / item.entries[item.entries.length-1].maxScore * 100) + '%' }" :class="['score-fill', item.entries[item.entries.length-1].score >= 85 ? 'good' : item.entries[item.entries.length-1].score >= 75 ? 'ok' : 'bad']"></div>
                  </div>
                </div>
              </div>
            </div>
            <button @click="router.push({ name: 'student-result', params: { name: item.student } })" class="btn-primary px-4 py-2 rounded-md inline-flex items-center gap-2">View Student</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>