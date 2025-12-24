<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { store } from '../store';

const email = ref('student@example.com');
const password = ref('password123');
const router = useRouter();
const error = ref('');

const handleLogin = () => {
  if (store.login(email.value, password.value)) {
    router.push('/');
  } else {
    error.value = 'Invalid credentials. Try student@example.com / password123';
  }
};
</script>

<template>
  <div class="w-full max-w-md bg-surface rounded-3xl p-10 shadow-2xl shadow-blue-500/10 auth-card">
    <div class="text-center mb-10">
      <div class="w-20 h-20 bg-gradient-primary rounded-3xl mx-auto mb-6 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
        <svg class="w-10 h-10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3 5v6c0 5 3.9 9.7 9 11 5.1-1.3 9-6 9-11V5l-9-3z"/></svg>
      </div>
      <h1 class="text-3xl font-extrabold text-dark mb-2">Welcome Back</h1>
      <p class="text-muted">Sign in to your training dashboard</p>
    </div>

    <form @submit.prevent="handleLogin" class="space-y-6">
      <div>
        <label class="block font-semibold text-sm text-dark mb-2">Email Address</label>
        <div class="relative">
          <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 form-icon"></i>
          <input v-model="email" type="email" class="w-full pl-12 pr-4 py-4 form-input rounded-xl transition-all" placeholder="Enter email">
        </div>
      </div>

      <div>
        <label class="block font-semibold text-sm text-dark mb-2">Password</label>
        <div class="relative">
          <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 form-icon"></i>
          <input v-model="password" type="password" class="w-full pl-12 pr-4 py-4 form-input rounded-xl transition-all" placeholder="Enter password">
        </div>
      </div>

      <div v-if="error" class="error-text text-sm text-center font-medium">{{ error }}</div>

      <button class="btn-primary w-full py-4 font-bold rounded-xl">
        Login
      </button>
    </form>
    
    <div class="mt-8 pt-6 border-t border-surface-border text-center text-muted text-sm">
      <p>Use <b>student@example.com</b> or <b>trainer@example.com</b></p>
      <p>Password: <b>password123</b></p>
    </div>
    <div class="mt-6 text-center text-sm text-gray-500">
  Don’t have an account?
  <router-link
    to="/signup"
    class="font-semibold text-primary hover:underline"
  >
    Sign up here
  </router-link>
</div>

  </div>
</template>