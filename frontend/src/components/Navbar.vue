<template>
  <nav class="bg-indigo-600 shadow-lg">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <router-link to="/" class="text-white text-xl font-bold tracking-tight flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Leave Manager
      </router-link>
      <div class="flex items-center gap-3">
        <template v-if="!isAuthenticated">
          <router-link to="/login" class="text-white hover:text-indigo-200 transition font-medium px-3 py-1.5">Login</router-link>
          <router-link to="/signup" class="bg-white text-indigo-600 px-4 py-2 rounded-md font-semibold hover:bg-indigo-50 transition shadow-sm text-sm">Sign Up</router-link>
        </template>
        <template v-else>
          <div class="hidden sm:flex items-center gap-2 bg-indigo-500/40 px-3 py-1.5 rounded-full">
            <div class="w-7 h-7 bg-white text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">{{ user?.name?.charAt(0)?.toUpperCase() }}</div>
            <span class="text-white text-sm font-medium">{{ user?.name }}</span>
            <span class="text-indigo-200 text-xs capitalize">({{ user?.role }})</span>
          </div>
          <button @click="logout" class="text-white border border-white/30 px-3 py-1.5 rounded-md hover:bg-white/10 transition text-sm font-medium">Logout</button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
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
