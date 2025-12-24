<script setup>
import { computed } from 'vue';
import { store } from '../store';
import { useRouter } from 'vue-router';

const router = useRouter();

const studentStats = computed(() => {
  // Map students to stats
  return store.students.map(s => {
    const results = store.myResults.filter(r => r.student === s.name);
    const attempts = results.length;
    const avg = attempts ? Math.round(results.reduce((a,b) => a + b.score, 0) / attempts) : 0;
    return { ...s, attempts, avg };
  });
});
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-extrabold text-dark">Students Results</h1>
      <p class="text-muted">All students and their summary performance</p>
    </div>

    <div class="bg-surface rounded-2xl p-6 shadow-sm border border-surface-border">
      <table class="w-full text-left">
        <thead>
          <tr class="text-muted text-sm">
            <th class="pb-3"></th>
            <th class="pb-3">Student</th>
            <th class="pb-3">Email</th>
            <th class="pb-3">Joined</th>
            <th class="pb-3">Attempts</th>
            <th class="pb-3">Avg</th>
            <th class="pb-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in studentStats" :key="s.email" class="border-t transition-all hover:shadow-sm">
            <td class="py-3">
              <div class="student-avatar bg-gradient-primary">{{ s.name.charAt(0) }}</div>
            </td>
            <td class="py-3 font-semibold">{{ s.name }}</td>
            <td class="py-3 text-sm text-muted">{{ s.email }}</td>
            <td class="py-3 text-sm text-muted">{{ s.joined }}</td>
            <td class="py-3">{{ s.attempts }}</td>
            <td class="py-3">
              <span :class="['badge', s.avg >= 70 ? 'green' : s.avg >= 40 ? 'yellow' : 'red']">{{ s.avg }}%</span>
            </td>
            <td class="py-3 text-right">
              <button
                @click="router.push({ name: 'student-result', params: { name: s.name } })"
                class="btn-primary px-3 py-2 rounded-md inline-flex items-center gap-2"
                title="View student results"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                </svg>
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>