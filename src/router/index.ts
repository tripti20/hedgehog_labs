import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/login',
      component: () => import('../views/Home.vue'),
      children: [
        {path: '/login', name: 'login', component: () => import('../views/Login.vue')},
        {path: '/register', name: 'register', component: () => import('../views/Register.vue')},
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
    },
    {
      path: '/add-user',
      name: 'add-user',
      component: () => import('../views/AddUser.vue'),
    },
  ]
})

export default router
