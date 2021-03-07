import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Cadastrar from '../views/Cadastrar.vue'
import ResetPassword from '../views/ResetPassword.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'Cadastrar',
    component: Cadastrar
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
