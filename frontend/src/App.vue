<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar :key="navKey" />
    <main class="flex-grow container mx-auto px-4 py-8">
      <router-view></router-view>
    </main>
    <footer class="bg-white border-t border-gray-200 py-4 text-center text-sm text-gray-500">
      &copy; 2026 Leave Management System. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'

const router = useRouter()
const navKey = ref(0)

// Force Navbar re-render on route changes (login/logout)
router.afterEach(() => {
  navKey.value++
})
</script>
