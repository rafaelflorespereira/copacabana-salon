import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Users from '../views/Users.vue'
import Store from '../views/Store.vue'
import Calendar from '../views/Calendar.vue'
import Products from '../components/Products.vue'
import Services from '../components/Services.vue'
import Enhancements from '../components/Enhancements.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/store',
    name: 'Store',
    component: Store,
    children: [
      {
        path: 'products',
        component: Products
      },
      {
        path: 'services',
        component: Services
      },
      {
        path: 'enhancements',
        component: Enhancements
      }
    ]
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
