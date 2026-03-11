<template>
  <div class="max-w-6xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
      <button @click="fetchLeaves" class="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-md font-medium hover:bg-indigo-100 transition shadow-sm border border-indigo-100 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refresh Data
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
      <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">
        <span class="text-gray-500 text-sm font-medium">Total Requests</span>
        <span class="text-3xl font-bold text-gray-800">{{ leaves.length }}</span>
      </div>
      <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">
        <span class="text-yellow-600 text-sm font-medium">Pending Approvals</span>
        <span class="text-3xl font-bold text-gray-800">{{ pendingCount }}</span>
      </div>
      <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">
        <span class="text-green-600 text-sm font-medium">Approved Leaves</span>
        <span class="text-3xl font-bold text-gray-800">{{ approvedCount }}</span>
      </div>
      <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">
        <span class="text-red-600 text-sm font-medium">Rejected Leaves</span>
        <span class="text-3xl font-bold text-gray-800">{{ rejectedCount }}</span>
      </div>
    </div>

    <!-- All Leave Applications -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h2 class="text-lg font-semibold text-gray-800">All Leave Applications</h2>
        
        <!-- Filter -->
        <select v-model="filterStatus" class="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500">
          <option value="All">All Statuses</option>
          <option value="Pending">Pending Only</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      
      <div v-if="fetching" class="p-12 text-center text-gray-500">Loading requests...</div>
      <div v-else-if="filteredLeaves.length === 0" class="p-12 text-center text-gray-500">
        No leave applications found matching the current filter.
      </div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Details</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status & Action</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="leave in filteredLeaves" :key="leave._id" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4">
                <div class="text-sm font-bold text-gray-900">{{ leave.employeeId?.name || 'Unknown User' }}</div>
                <div class="text-xs text-gray-500">{{ leave.employeeId?.email }}</div>
                <div class="text-xs text-gray-400 mt-1">Applied: {{ formatDate(leave.createdAt) }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{{ leave.leaveType }}</div>
                <div class="text-sm text-gray-600 mt-1">{{ formatDate(leave.startDate) }} to {{ formatDate(leave.endDate) }}</div>
                <div class="text-xs text-indigo-600 font-medium mt-1">{{ calculateDays(leave.startDate, leave.endDate) }} Days Total</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-700 whitespace-pre-wrap max-w-xs">{{ leave.reason }}</div>
              </td>
              <td class="px-6 py-4 text-center">
                <div v-if="leave.status === 'Pending'" class="flex justify-center space-x-2">
                  <button @click="updateStatus(leave._id, 'Approved')" class="px-3 py-1.5 bg-green-500 text-white text-xs font-semibold rounded hover:bg-green-600 transition shadow-sm">
                    Approve
                  </button>
                  <button @click="updateStatus(leave._id, 'Rejected')" class="px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded hover:bg-red-600 transition shadow-sm">
                    Reject
                  </button>
                </div>
                <div v-else>
                  <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full" 
                        :class="leave.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                    {{ leave.status }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../axios'

const leaves = ref([])
const fetching = ref(false)
const filterStatus = ref('All')

const pendingCount = computed(() => leaves.value.filter(l => l.status === 'Pending').length)
const approvedCount = computed(() => leaves.value.filter(l => l.status === 'Approved').length)
const rejectedCount = computed(() => leaves.value.filter(l => l.status === 'Rejected').length)

const filteredLeaves = computed(() => {
  if (filterStatus.value === 'All') return leaves.value
  return leaves.value.filter(l => l.status === filterStatus.value)
})

const fetchLeaves = async () => {
  try {
    fetching.value = true
    const { data } = await api.get('/leaves')
    leaves.value = Object.values(data)
  } catch (err) {
    console.error('Failed to fetch leaves', err)
    alert('Error fetching records. Make sure you are an Employer.')
  } finally {
    fetching.value = false
  }
}

const updateStatus = async (id, status) => {
  if (!confirm(`Are you sure you want to mark this leave as ${status}?`)) return
  
  try {
    const { data } = await api.put(`/leaves/${id}/status`, { status })
    // Update local state smoothly
    const index = leaves.value.findIndex(l => l._id === id)
    if(index !== -1) leaves.value[index] = { ...leaves.value[index], status: data.status }
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to update status')
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
