<template>
  <div class="max-w-4xl mx-auto flex flex-col items-center justify-center py-24 text-center px-4">
    <div class="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold mb-6 inline-flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      Leave Management System
    </div>
    <h1 class="text-5xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
      Simplify Your <span class="text-indigo-600">Leave Management</span>
    </h1>
    <p class="text-lg text-gray-600 mb-10 max-w-2xl leading-relaxed">
      An intuitive platform for employees to request time off and for employers to effortlessly manage, approve, and track leave applications.
    </p>
    <div class="flex flex-col sm:flex-row gap-4">
      <router-link to="/signup" class="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition text-center">
        Get Started Free
      </router-link>
      <router-link to="/login" class="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition text-center">
        Sign In
      </router-link>
    </div>

    <!-- Feature Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 w-full">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-left">
        <div class="bg-blue-100 text-blue-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        </div>
        <h3 class="font-semibold text-gray-800 mb-1">Employee Portal</h3>
        <p class="text-sm text-gray-500">Apply for sick, casual, or annual leave with just a few clicks.</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-left">
        <div class="bg-green-100 text-green-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <h3 class="font-semibold text-gray-800 mb-1">Employer Dashboard</h3>
        <p class="text-sm text-gray-500">Review, approve, or reject leave requests at a glance.</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-left">
        <div class="bg-purple-100 text-purple-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        </div>
        <h3 class="font-semibold text-gray-800 mb-1">Secure & Reliable</h3>
        <p class="text-sm text-gray-500">JWT authentication with role-based access control.</p>
      </div>
    </div>
  </div>
</template>
