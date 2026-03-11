<template>
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mt-10">
    <div class="px-8 py-6">
      <h2 class="text-2xl font-extrabold text-gray-900 text-center mb-6">Welcome Back</h2>
      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm" placeholder="you@example.com" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input v-model="password" type="password" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm" placeholder="••••••••" />
        </div>
        <div v-if="error" class="text-red-500 text-sm bg-red-50 p-3 rounded-md border border-red-100">{{ error }}</div>
        <button type="submit" :disabled="loading" class="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 shadow-md">
          <span v-if="loading">Signing in...</span>
          <span v-else>Sign In</span>
        </button>
      </form>
      <div class="mt-6 text-center text-sm text-gray-600">
        Don't have an account? <router-link to="/signup" class="text-indigo-600 font-semibold hover:text-indigo-500">Sign up</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../axios'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  try {
    error.value = ''
    loading.value = true
    const { data } = await api.post('/auth/login', { email: email.value, password: password.value })
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data))
    
    if (data.role === 'employer') {
      router.push('/employer')
    } else {
      router.push('/employee')
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
