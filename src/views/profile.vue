<script setup>
import { reactive } from 'vue'
import { store } from '../store'

const form = reactive({
  email: store.currentUser.email,
  password: '',
  confirmPassword: ''
})

const updateProfile = () => {
  if (form.password && form.password !== form.confirmPassword) {
    alert('Passwords do not match')
    return
  }

  // Update allowed fields only
  store.currentUser.email = form.email

  alert('Profile updated successfully')
}

const logout = () => {
  store.logout()
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-gray-900">My Profile</h1>
      <p class="text-gray-500 mt-2">Manage your account and preferences</p>
      <hr class="mt-6 border-gray-200" />
    </div>

    <!-- Profile Card -->
    <form
      @submit.prevent="updateProfile"
      class="bg-surface rounded-2xl border border-surface-border shadow-sm p-8"
    >
      <!-- Account Information -->
      <h2 class="text-xl font-bold text-gray-900 mb-4">
        Account Information
      </h2>
      <hr class="mb-6 border-gray-200" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Email -->
        <div>
          <label class="block text-sm font-semibold text-gray-600 mb-2">
            Email Address
          </label>
          <input
            v-model="form.email"
            type="email"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none"
          />
        </div>

        <!-- Role (Read-only) -->
        <div>
          <label class="block text-sm font-semibold text-gray-600 mb-2">
            Role
          </label>
          <div
            class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-900 cursor-not-allowed"
          >
            {{ store.currentUser.role }}
          </div>
        </div>

        <!-- Member Since -->
        <div class="md:col-span-2">
          <label class="block text-sm font-semibold text-gray-600 mb-2">
            Member Since
          </label>
          <div
            class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900"
          >
            {{ store.currentUser.joined }}
          </div>
        </div>
      </div>

      <!-- Security -->
      <h2 class="text-xl font-bold text-gray-900 mb-4">
        Security
      </h2>
      <hr class="mb-6 border-gray-200" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <!-- New Password -->
        <div>
          <label class="block text-sm font-semibold text-gray-600 mb-2">
            New Password
          </label>
          <input
            v-model="form.password"
            type="password"
            placeholder="Enter new password"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
          />
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="block text-sm font-semibold text-gray-600 mb-2">
            Confirm Password
          </label>
          <input
            v-model="form.confirmPassword"
            type="password"
            placeholder="Confirm new password"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
          />
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          class="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Update Profile
        </button>

        <button
          type="button"
          @click="logout"
          class="px-6 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </form>
  </div>
</template>
