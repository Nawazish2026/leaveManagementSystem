<template>
  <div class="max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Employee Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Apply Leave Form -->
      <div class="md:col-span-1">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 static md:sticky top-8">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Apply for Leave</h2>
          <form @submit.prevent="submitLeave" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
              <select v-model="form.leaveType" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Unpaid Leave">Unpaid Leave</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input v-model="form.startDate" type="date" required :min="today" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input v-model="form.endDate" type="date" required :min="form.startDate || today" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Reason</label>
              <textarea v-model="form.reason" required rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Detailed reason for leave..."></textarea>
            </div>

            <div v-if="error" class="text-red-500 text-sm bg-red-50 p-2 rounded">{{ error }}</div>
            <div v-if="success" class="text-green-600 text-sm bg-green-50 p-2 rounded">{{ success }}</div>

            <button type="submit" :disabled="loading" class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 transition disabled:opacity-50">
              <span v-if="loading">Submitting...</span>
              <span v-else>Submit Application</span>
            </button>
          </form>
        </div>
      </div>

      <!-- Leave History -->
      <div class="md:col-span-2">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 class="text-lg font-semibold text-gray-800">My Leave Applications</h2>
            <button @click="fetchLeaves" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Refresh</button>
          </div>
          
          <div v-if="fetching" class="p-8 text-center text-gray-500">Loading history...</div>
          <div v-else-if="leaves.length === 0" class="p-8 text-center text-gray-500">
            You haven't applied for any leaves yet.
          </div>
          <div v-else class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied On</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="leave in leaves" :key="leave._id" class="hover:bg-gray-50 transition">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ leave.leaveType }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ formatDate(leave.startDate) }} to {{ formatDate(leave.endDate) }}</div>
                    <div class="text-xs text-gray-500">{{ calculateDays(leave.startDate, leave.endDate) }} days</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                          :class="{
                            'bg-yellow-100 text-yellow-800': leave.status === 'Pending',
                            'bg-green-100 text-green-800': leave.status === 'Approved',
                            'bg-red-100 text-red-800': leave.status === 'Rejected'
                          }">
                      {{ leave.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(leave.createdAt) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../axios'

const leaves = ref([])
const fetching = ref(false)
const loading = ref(false)
const error = ref('')
const success = ref('')

const form = ref({
  leaveType: 'Sick Leave',
  startDate: '',
  endDate: '',
  reason: ''
})

const today = new Date().toISOString().split('T')[0]

const fetchLeaves = async () => {
  try {
    fetching.value = true
    const { data } = await api.get('/leaves/my')
    leaves.value = data
  } catch (err) {
    console.error('Failed to fetch leaves', err)
  } finally {
    fetching.value = false
  }
}

const submitLeave = async () => {
  try {
    error.value = ''
    success.value = ''
    loading.value = true
    
    await api.post('/leaves', form.value)
    success.value = 'Leave application submitted successfully!'
    
    // Reset form
    form.value = { leaveType: 'Sick Leave', startDate: '', endDate: '', reason: '' }
    
    // Refresh table
    await fetchLeaves()
    
    setTimeout(() => { success.value = '' }, 3000)
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to submit application'
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

const calculateDays = (start, end) => {
  const diffTime = Math.abs(new Date(end) - new Date(start))
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
}

onMounted(() => {
  fetchLeaves()
})
</script>
