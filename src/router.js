import { createRouter, createWebHistory } from 'vue-router';
import { store } from './store';

import Login from './views/login.vue';
import Signup from './views/signup.vue';
// import Dashboard from './views/Dashboard.vue';
// again
import Drills from './views/Drills.vue';
import Results from './views/Results.vue';
import CreateDrill from './views/CreateDrill.vue';
import Profile from './views/profile.vue';
import DrillRes from './views/drillres.vue';
import DrillStudents from './views/drill-students.vue';
import StudentResult from './views/studentresult.vue';
import Students from './views/students.vue';
import Dashboard from './views/Dashboard.vue';
// rmv
//seriously
const routes = [
  // Auth pages
  {
    path: '/login',
    component: Login,
    meta: { guestOnly: true },
  },
  {
    path: '/signup',
    component: Signup,
    meta: { guestOnly: true },
  },

  // Protected pages
  {
    path: '/',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/drills',
    component: Drills,
    meta: { requiresAuth: true },
  },
  {
    path: '/results',
    component: Results,
    meta: { requiresAuth: true },
  },
  {
    path: '/create',
    component: CreateDrill,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: '/drill/:id',
    name: 'drill',
    component: DrillRes,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/drill/:id/students',
    name: 'drill-students',
    component: DrillStudents,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/students',
    name: 'students',
    component: Students,
    meta: { requiresAuth: true },
  },
  {
    path: '/student/:name',
    name: 'student-result',
    component: StudentResult,
    meta: { requiresAuth: true },
    props: true,
  },

  // Fallback
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔐 Navigation Guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!store.currentUser;

  // Trainers should not access the student results page
  if (to.path === '/results' && store.currentUser?.role === 'trainer') {
    return next('/students');
  }

  if (to.meta.requiresAuth && !isLoggedIn) {
    // Not logged in → go to login
    next('/login');
  } else if (to.meta.guestOnly && isLoggedIn) {
    // Logged in → prevent access to login/signup
    next('/');
  } else {
    next();
  }
});

export default router;
