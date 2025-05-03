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
import DemoE from './pages/DemoE.vue'
import DemoF from './pages/DemoF.vue'

const BASE = '/tsada'

const routes = [
  { 'path': BASE + '/', 'component': Home },
  { 'path': BASE + '/radar', 'component': Radar },
  { 'path': BASE + '/grid', 'component': Grid },
  { 'path': BASE + '/pie', 'component': Pie },
  { 'path': BASE + '/datasets', 'component': Datasets },
  { 'path': BASE + '/editor', 'component': DataEditor },
  { 'path': BASE + '/demo', 'component': Demo },
  { 'path': BASE + '/demo-a', 'component': DemoA },
  { 'path': BASE + '/demo-b', 'component': DemoB },
  { 'path': BASE + '/demo-c', 'component': DemoC },
  { 'path': BASE + '/demo-d', 'component': DemoD },
  { 'path': BASE + '/demo-e', 'component': DemoE },
  { 'path': BASE + '/demo-f', 'component': DemoF },
]

const router = createRouter({
  routes,
  history: createWebHistory('/tsada/')
})

export default router
