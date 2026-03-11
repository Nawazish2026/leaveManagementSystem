<template>
  <div class="max-w-4xl mx-auto flex flex-col items-center justify-center py-20 text-center">
    <h1 class="text-5xl font-extrabold text-gray-900 tracking-tight mb-6">Simplify Leave Management</h1>
    <p class="text-xl text-gray-600 mb-10 max-w-2xl">
      An intuitive system for employees to request time off and for employers to effortlessly manage and approve leaves.
    </p>
    <div class="flex space-x-4">
      <router-link to="/signup" class="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition">
        Get Started
      </router-link>
      <router-link to="/login" class="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition">
        Login
      </router-link>
    </div>
  </div>
</template>
