import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import index from '../views/index/index.vue'
import About from '../views/About/About.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
 
]

const router = new VueRouter({
  routes
})

export default router
