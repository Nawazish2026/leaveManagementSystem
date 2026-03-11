import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import EmployeeDashboard from './views/EmployeeDashboard.vue';
import EmployerDashboard from './views/EmployerDashboard.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login, meta: { guest: true } },
  { path: '/signup', component: Signup, meta: { guest: true } },
  { path: '/employee', component: EmployeeDashboard, meta: { requiresAuth: true, role: 'employee' } },
  { path: '/employer', component: EmployerDashboard, meta: { requiresAuth: true, role: 'employer' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (to.meta.requiresAuth && !token) {
    return '/login';
  } else if (to.meta.guest && token) {
    return user?.role === 'employer' ? '/employer' : '/employee';
  } else if (to.meta.role && user?.role !== to.meta.role) {
    return user?.role === 'employer' ? '/employer' : '/employee';
  }
});

export default router;
