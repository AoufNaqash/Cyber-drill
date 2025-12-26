<script setup>
import { useRoute, useRouter } from 'vue-router';
import { store } from '../store';

const route = useRoute();
const router = useRouter();

const studentName = route.params.name;
const drillId = route.params.drillId;

const drill = store.drills.find(d => d.id == drillId);

const submitFeedback = () => {
  // UI only for now
  router.back();
};
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-dark">
        Feedback: {{ drill?.title }}
      </h1>
      <p class="text-muted mt-2">
        Student: <span class="font-semibold">{{ studentName }}</span>
      </p>
    </div>

    <div class="bg-white rounded-2xl p-6 shadow-sm border">
      <div class="mb-6">
        <label class="block font-bold mb-2">Performance Rating</label>
        <select class="w-full border rounded-xl p-3">
          <option>Excellent</option>
          <option>Good</option>
          <option>Satisfactory</option>
          <option>Needs Improvement</option>
        </select>
      </div>

      <div class="mb-6">
        <label class="block font-bold mb-2">Drill-Specific Feedback</label>
        <textarea
          rows="5"
          class="w-full border rounded-xl p-3"
          placeholder="Provide feedback related to this drill..."
        ></textarea>
      </div>

      <div class="flex justify-end gap-4">
        <button
          @click="router.back()"
          class="px-5 py-2 rounded-lg border text-gray-600"
        >
          Cancel
        </button>
        <button
          @click="submitFeedback"
          class="px-6 py-2 rounded-lg bg-blue-600 text-white font-bold"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  </div>
</template>
