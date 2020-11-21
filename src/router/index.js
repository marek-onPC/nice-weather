import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Now from '../components/tabs/Now.vue'
import TwentyFour from '../components/tabs/TwentyFour.vue'
import Tomorrow from '../components/tabs/Tomorrow.vue'
import SevenDays from '../components/tabs/SevenDays.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      { path: '', name: 'Now', component: Now },
      { path: '/twenty-four', name: 'TwentyFour', component: TwentyFour },
      { path: '/tomorrow', name: 'Tomorrow', component: Tomorrow },
      { path: '/sevendays', name: 'SevenDays', component: SevenDays }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
