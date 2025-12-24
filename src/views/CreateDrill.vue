<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'

const router = useRouter()

const form = ref({
  title: '',
  category: '',
  description: '',
  difficulty: 'beginner',
  duration: 30,
  scenario: '',
  maxScore: 100,
  dueDate: ''
})

const submit = () => {
  const newDrill = {
    ...form.value,
    createdBy: store.currentUser.name
  }

  if (form.value.maxScore > 100) {
  form.value.maxScore = 100
}


  store.addDrill(newDrill)
  router.push('/drills')
}
const limitMaxScore = () => {
  if (form.value.maxScore > 100) {
    form.value.maxScore = 100
  }
  if (form.value.maxScore < 0) {
    form.value.maxScore = 0
  }
}

</script>

<template>
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="mb-8 pb-6 border-b border-gray-200">
      <h1 class="text-3xl font-extrabold text-dark">Create New Drill</h1>
      <p class="text-gray-500 mt-2">Design a training exercise</p>
    </div>

    <form
      @submit.prevent="submit"
      class="bg-surface rounded-2xl shadow-sm border border-surface-border p-8 space-y-6"
    >
      <!-- Title & Category -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-bold text-dark mb-2">
            Drill Title *
          </label>
          <input
            v-model="form.title"
            required
            placeholder="e.g., Phishing Email Identification"
            class="w-full p-3 bg-slate-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label class="block text-sm font-bold text-dark mb-2">
            Category *
          </label>
          <select
            v-model="form.category"
            required
            class="w-full p-3 bg-slate-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary"
          >
            <option disabled value="">Select category</option>
            <option value="phishing">Phishing Awareness</option>
            <option value="malware">Malware Analysis</option>
            <option value="network">Network Security</option>
            <option value="social">Social Engineering</option>
            <option value="response">Incident Respose </option>

          </select>
        </div>
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-bold text-dark mb-2">
          Description *
        </label>
        <textarea
          v-model="form.description"
          rows="3"
          placeholder="Describe the training drill objectives and what participants will learn..."
          class="w-full p-3 bg-slate-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary"
        />
      </div>

      <!-- Difficulty & Duration -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-bold text-dark mb-2">
            Difficulty Level *
          </label>
          <select
            v-model="form.difficulty"
            class="w-full p-3 bg-slate-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-bold text-dark mb-2">
            Estimated Duration (minutes) *
          </label>
          <input
            type="number"
            v-model="form.duration"
            class="w-full p-3 bg-slate-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <!-- Scenario -->
      <div>
        <label class="block text-sm font-bold text-dark mb-2">
          Training Scenario *
        </label>
        <textarea
          v-model="form.scenario"
          rows="4"
          placeholder="Describe the simulated cybersecurity scenario that participants will face..."
          class="w-full p-3 bg-slate-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary"
        />
      </div>

      <!-- Max Score & Due Date -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-bold text-dark mb-2">
            Maximum Score
          </label>
          <input
            type="number"
            v-model="form.maxScore"
            class="w-full p-3 bg-slate-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary"
          />
        </div>
        

        <div>
          <label class="block text-sm font-bold text-dark mb-2">
            Due Date
          </label>
          <input
            type="date"
            v-model="form.dueDate"
            class="w-full p-3 bg-slate-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <!-- Actions -->
      <div class="pt-4 flex gap-4">
        <button
          type="submit"
          class="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition"
        >
          Create Drill
        </button>

        <button
          type="button"
          @click="router.push('/drills')"
          class="px-8 py-3 bg-surface border-2 border-surface-border text-dark font-bold rounded-xl hover:bg-slate-50 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>
