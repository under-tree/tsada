import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Radar from './components/Radar.vue'
import Pie from './components/Pie.vue'

const routes = [
  { 'path': '/', 'component': Home },
  { 'path': '/radar', 'component': Radar },
  { 'path': '/pie', 'component': Pie },
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
