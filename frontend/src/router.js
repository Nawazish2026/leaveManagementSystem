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

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else if (to.meta.guest && token) {
    next(user?.role === 'employer' ? '/employer' : '/employee');
  } else if (to.meta.role && user?.role !== to.meta.role) {
    next(user?.role === 'employer' ? '/employer' : '/employee');
  } else {
    next();
  }
});

export default router;
