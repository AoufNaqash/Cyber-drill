<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { store } from '../store';

const route = useRoute();
const router = useRouter();

const name = route.params.name;

const results = computed(() =>
  store.myResults.filter(r => r.student === name)
);

const drillsCompleted = computed(() =>
  results.value.map(r => ({
    drill: store.drills.find(d => d.id === r.drillId),
    score: r.score,
    maxScore: r.maxScore,
    date: r.date,
    drillId: r.drillId,
  }))
);

const average = computed(() => {
  if (results.value.length === 0) return 0;
  const sum = results.value.reduce((a, b) => a + b.score, 0);
  return Math.round(sum / results.value.length);
});

// Flow flags
const attempted = computed(() => results.value.length > 0);
const passed = computed(() => average.value >= 70);
const excellent = computed(() => average.value >= 85);

const goToFeedback = (drillId) => {
  router.push({
    name: 'feedback',
    params: {
      name,
      drillId,
    },
  });
};
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
            {{ name.charAt(0) }}
          </div>
          <div>
            <h1 class="text-2xl font-extrabold text-dark">{{ name }}</h1>
            <p class="text-muted">Drills completed: {{ results.length }}</p>
          </div>
        </div>

        <!-- Flow -->
        <div class="flex items-center gap-3 mt-4">
          <div :class="['flex items-center gap-2', attempted ? 'text-blue-600' : 'text-gray-400']">
            <div class="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 font-bold">1</div>
            Attempted
          </div>
          →
          <div :class="['flex items-center gap-2', passed ? 'text-blue-600' : 'text-gray-400']">
            <div class="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 font-bold">P</div>
            Passed
          </div>
          →
          <div :class="['flex items-center gap-2', excellent ? 'text-blue-600' : 'text-gray-400']">
            <div class="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 font-bold">★</div>
            Excellent
          </div>
        </div>
      </div>

      <!-- Average -->
      <div class="text-center">
        <div class="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl font-extrabold">
          {{ average }}%
        </div>
        <div class="text-sm text-muted mt-2">Average Score</div>
      </div>
    </div>

    <!-- Drill List -->
    <div class="grid grid-cols-1 gap-4">
      <div
        v-for="row in drillsCompleted"
        :key="row.drillId"
        class="bg-white rounded-xl p-4 shadow-sm border flex items-center gap-6"
      >
        <!-- LEFT: Feedback Button -->
        <button
          @click="goToFeedback(row.drillId)"
          class="px-4 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-md transition flex items-center gap-2"
        >
          ✍️ Feedback
        </button>

        <!-- Drill Info -->
        <div class="flex-1">
          <div class="font-semibold text-dark">
            {{ row.drill?.title || 'Unknown Drill' }}
          </div>
          <div class="text-sm text-muted">
            {{ row.date }} • Max: {{ row.maxScore }}
          </div>
        </div>

        <!-- Score -->
        <div class="w-48">
          <div class="flex items-center gap-3">
            <div class="font-semibold">{{ row.score }} / {{ row.maxScore }}</div>
            <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                :style="{ width: (row.score / row.maxScore * 100) + '%' }"
                :class="row.score >= 85 ? 'bg-green-500' : row.score >= 75 ? 'bg-yellow-500' : 'bg-red-500'"
                class="h-full"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="drillsCompleted.length === 0"
        class="p-6 text-center text-muted bg-white rounded-lg border"
      >
        No records for this student.
      </div>
    </div>
  </div>
</template>
