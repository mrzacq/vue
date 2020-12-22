import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requireAuth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import("../views/RegisterPage")
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../views/LoginPage")
  },
  {
    path: '/edit-user/:id',
    name: 'EditUser',
    component: () => import("../views/EditUser")
  },
  {
    path: '/add-user',
    name: 'AddUser',
    component: () => import("../views/AddUser")
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth) && localStorage.token) {
    next()
  } else if(to.name === 'Register' && !localStorage.token){
    next()
  } else if(to.name === 'Register' && localStorage.token){
    next('/')
  } else if (to.name !== 'Login' && !localStorage.token) {
    next({ path: '/login' })
  } else if (to.name === 'Login' && localStorage.token) {
    next({ path: '/' })
  } else {
    next()
  }
})
export default router
