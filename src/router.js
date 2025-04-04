import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Radar from './components/Radar.vue'
import Grid from './pages/Grid.vue'
import Pie from './components/Pie.vue'
import Datasets from './components/Datasets.vue'
import DataEditor from './components/DataEditor.vue'
import Demo from './components/Demo.vue'
import DemoA from './pages/DemoA.vue'
import DemoB from './pages/DemoB.vue'
import DemoC from './pages/DemoC.vue'
import DemoD from './pages/DemoD.vue'

const routes = [
  { 'path': '/', 'component': Home },
  { 'path': '/radar', 'component': Radar },
  { 'path': '/grid', 'component': Grid },
  { 'path': '/pie', 'component': Pie },
  { 'path': '/datasets', 'component': Datasets },
  { 'path': '/editor', 'component': DataEditor },
  { 'path': '/demo', 'component': Demo },
  { 'path': '/demo-a', 'component': DemoA },
  { 'path': '/demo-b', 'component': DemoB },
  { 'path': '/demo-c', 'component': DemoC },
  { 'path': '/demo-d', 'component': DemoD },
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
