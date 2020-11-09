import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import World from '../components/tabs/World.vue'
import Europe from '../components/tabs/Europe.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      { path: '', name: 'World', component: World },
      { path: '/europe', name: 'Europe', component: Europe }
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
