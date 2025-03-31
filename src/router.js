import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Radar from './components/Radar.vue'
import Pie from './components/Pie.vue'
import Datasets from './components/Datasets.vue'
import DataEditor from './components/DataEditor.vue'
import Demo from './components/Demo.vue'
import DemoA from './pages/DemoA.vue'
import DemoB from './pages/DemoB.vue'

const routes = [
  { 'path': '/', 'component': Home },
  { 'path': '/radar', 'component': Radar },
  { 'path': '/pie', 'component': Pie },
  { 'path': '/datasets', 'component': Datasets },
  { 'path': '/editor', 'component': DataEditor },
  { 'path': '/demo', 'component': Demo },
  { 'path': '/demo-a', 'component': DemoA },
  { 'path': '/demo-b', 'component': DemoB },
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
