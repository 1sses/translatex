import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/Main')
  },
  {
    path: '/analyse',
    name: 'Analysis',
    component: () => import('@/views/Analysis')
  },
  {
    path: '/compare',
    name: 'Compare',
    component: () => import('@/views/Compare')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
