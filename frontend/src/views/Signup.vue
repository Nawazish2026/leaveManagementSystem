<template>
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mt-10">
    <div class="px-8 py-6">
      <h2 class="text-2xl font-extrabold text-gray-900 text-center mb-6">Create an Account</h2>
      <form @submit.prevent="handleSignup" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input v-model="name" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm" placeholder="John Doe" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm" placeholder="you@example.com" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input v-model="password" type="password" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm" placeholder="••••••••" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select v-model="role" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm bg-white">
            <option value="employee">Employee</option>
            <option value="employer">Employer</option>
          </select>
        </div>
        <div v-if="error" class="text-red-500 text-sm bg-red-50 p-3 rounded-md border border-red-100">{{ error }}</div>
        <button type="submit" :disabled="loading" class="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 shadow-md mt-2">
          <span v-if="loading">Creating account...</span>
          <span v-else>Sign Up</span>
        </button>
      </form>
      <div class="mt-6 text-center text-sm text-gray-600">
        Already have an account? <router-link to="/login" class="text-indigo-600 font-semibold hover:text-indigo-500">Sign in</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../axios'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const role = ref('employee')
const error = ref('')
const loading = ref(false)

const handleSignup = async () => {
  try {
    error.value = ''
    loading.value = true
    const { data } = await api.post('/auth/signup', { 
      name: name.value,
      email: email.value, 
      password: password.value,
      role: role.value
    })
    
    // Auto login after signup
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data))
    
    if (data.role === 'employer') {
      router.push('/employer')
    } else {
      router.push('/employee')
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Signup failed'
  } finally {
    loading.value = false
  }
}
</script>
