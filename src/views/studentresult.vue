<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { store } from '../store';

const route = useRoute();
const name = route.params.name;

const results = computed(() => store.myResults.filter(r => r.student === name));
const drillsCompleted = computed(() => results.value.map(r => ({ drill: store.drills.find(d => d.id === r.drillId), score: r.score, maxScore: r.maxScore, date: r.date })));
const average = computed(() => {
  if (results.value.length === 0) return 0;
  const sum = results.value.reduce((a,b) => a + b.score, 0);
  return Math.round(sum / results.value.length);
});

// Visual-only flags for flow steps
const attempted = computed(() => results.value.length > 0);
const passed = computed(() => average.value >= 70);
const excellent = computed(() => average.value >= 85);
</script>

<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <div class="flex flex-col">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">{{ name.charAt(0) }}</div>
          <div>
            <h1 class="text-2xl font-extrabold text-dark">{{ name }}</h1>
            <p class="text-muted">Drills completed: <span class="font-semibold">{{ results.length }}</span></p>
          </div>
        </div>

        <!-- Small flow showing Attempted -> Passed -> Excellent -->
        <div class="flow-row mt-4">
          <div :class="['flow-step', attempted ? 'active' : '']">
            <div class="flow-circle">1</div>
            <div class="text-sm text-muted">Attempted</div>
          </div>
          <div class="flow-arrow">→</div>
          <div :class="['flow-step', passed ? 'active' : '']">
            <div class="flow-circle">P</div>
            <div class="text-sm text-muted">Passed</div>
          </div>
          <div class="flow-arrow">→</div>
          <div :class="['flow-step', excellent ? 'active' : '']">
            <div class="flow-circle">★</div>
            <div class="text-sm text-muted">Excellent</div>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="text-center">
          <div class="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-2xl font-extrabold text-dark shadow-md">
            {{ average }}%
          </div>
          <div class="text-sm text-muted mt-2">Average Score</div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4">
      <div v-for="row in drillsCompleted" :key="row.drill?.id" class="bg-surface rounded-lg p-4 shadow-sm border border-surface-border flex items-center justify-between">
        <div>
          <div class="font-semibold text-dark">{{ row.drill?.title || 'Unknown' }}</div>
          <div class="text-sm text-muted">{{ row.date }} • Max: {{ row.maxScore }}</div>
        </div>
        <div class="w-48">
          <div class="flex items-center gap-3">
            <div class="text-sm font-semibold">{{ row.score }} / {{ row.maxScore }}</div>
            <div class="flex-1">
              <div class="score-bar">
                <div :style="{ width: (row.score / row.maxScore * 100) + '%' }" :class="['score-fill', row.score >= 85 ? 'good' : row.score >= 75 ? 'ok' : 'bad']"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="drillsCompleted.length === 0" class="p-6 text-center text-muted bg-surface rounded-lg border border-surface-border">No records for this student.</div>
    </div>
  </div>
</template> 