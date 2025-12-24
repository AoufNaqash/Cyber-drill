<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const role = ref('student');
const error = ref('');

const handleSignup = () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match';
    return;
  }

  // Simulated signup success
  router.push('/login');
};
</script>

<template>
  <div class="w-full max-w-md bg-surface rounded-3xl p-10 shadow-2xl shadow-blue-500/10 auth-card">
    
    <!-- Header -->
    <div class="text-center mb-10">
      <div
        class="w-20 h-20 bg-gradient-primary rounded-3xl mx-auto mb-6 flex items-center justify-center text-white shadow-xl shadow-blue-500/20"
      >
        <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="10" cy="7" r="4" />
          <path d="M20 8v6" />
          <path d="M23 11h-6" />
        </svg>
      </div>
      <h1 class="text-3xl font-extrabold text-dark mb-2">Create Account</h1>
      <p class="text-gray-500">Join the training platform</p>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSignup" class="space-y-6">

      <!-- Email -->
      <div>
        <label class="block font-semibold text-sm text-dark mb-2">Email Address</label>
        <div class="relative">
          <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 form-icon"></i>
          <input
            v-model="email"
            type="email"
            required
            class="w-full pl-12 pr-4 py-4 form-input rounded-xl transition-all"
            placeholder="Enter email"
          />
        </div>
      </div>

      <!-- Password -->
      <div>
        <label class="block font-semibold text-sm text-dark mb-2">Password</label>
        <div class="relative">
          <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 form-icon"></i>
          <input
            v-model="password"
            type="password"
            required
            class="w-full pl-12 pr-4 py-4 form-input rounded-xl transition-all"
            placeholder="Create password"
          />
        </div>
      </div>

      <!-- Confirm Password -->
      <div>
        <label class="block font-semibold text-sm text-dark mb-2">Confirm Password</label>
        <div class="relative">
          <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 form-icon"></i>
          <input
            v-model="confirmPassword"
            type="password"
            required
            class="w-full pl-12 pr-4 py-4 form-input rounded-xl transition-all"
            placeholder="Repeat password"
          />
        </div>
      </div>

      <!-- Role Selection -->
      <div>
        <label class="block font-semibold text-sm text-dark mb-3">Register As</label>

        <div class="grid grid-cols-2 gap-4">
          <button
            type="button"
            @click="role = 'student'"
            :class="role === 'student'
              ? 'border-primary bg-primary/10'
              : 'border-light-gray'"
            class="border-2 rounded-xl p-4 text-center transition-all"
          >
            <i class="fas fa-user-graduate text-2xl mb-2 text-primary"></i>
            <p class="font-semibold">Student</p>
          </button>

          <button
            type="button"
            @click="role = 'trainer'"
            :class="role === 'trainer'
              ? 'border-primary bg-primary/10'
              : 'border-light-gray'"
            class="border-2 rounded-xl p-4 text-center transition-all"
          >
            <i class="fas fa-chalkboard-teacher text-2xl mb-2 text-primary"></i>
            <p class="font-semibold">Trainer</p>
          </button>
        </div>
      </div>

      <!-- Error -->
      <div v-if="error" class="error-text text-sm text-center font-medium">
        {{ error }}
      </div>

      <!-- Submit -->
      <button class="btn-primary w-full py-4 font-bold rounded-xl">
        Create Account
      </button>
    </form>

    <!-- Footer -->
    <div class="mt-8 pt-6 border-t border-surface-border text-center text-muted text-sm">
      Already have an account?
      <router-link to="/login" class="font-semibold text-primary hover:underline">
        Login here
      </router-link>
    </div>
  </div>
</template>
