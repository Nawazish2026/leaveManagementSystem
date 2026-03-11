<template>
  <nav class="bg-indigo-600 shadow-md">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <router-link to="/" class="text-white text-xl font-bold tracking-tight text-shadow-sm">
        Leave System
      </router-link>
      <div class="space-x-4 flex items-center">
        <template v-if="!isAuthenticated">
          <router-link to="/login" class="text-white hover:text-indigo-200 transition font-medium">Login</router-link>
          <router-link to="/signup" class="bg-white text-indigo-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition shadow-sm">Sign Up</router-link>
        </template>
        <template v-else>
          <span class="text-indigo-200 text-sm hidden sm:inline-block mr-4">Welcome, {{ user?.name }} ({{ user?.role }})</span>
          <button @click="logout" class="text-white border border-white/30 px-3 py-1.5 rounded hover:bg-white/10 transition">Logout</button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = computed(() => {
  const u = localStorage.getItem('user')
  return u ? JSON.parse(u) : null
})

const isAuthenticated = computed(() => !!localStorage.getItem('token'))

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}
</script>
