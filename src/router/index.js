import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import index from '../views/index/index.vue'
import About from '../views/About/About.vue'
import login from '../views/back/login/login.vue'
import register from '../views/back/register/register.vue'
import personal from '../views/back/personal/personal.vue'
import articleList from '../views/back/personal/articleList.vue'
import addarticle from '../views/back/personal/addarticle.vue'
import editArticle from '../views/back/personal/editArticle.vue'
// 分类管理
import sortList from '../views/back/personal/sortList.vue'
import addSort from  '../views/back/personal/addSort.vue'
import editSort from '../views/back/personal/editSort.vue'
// 标签管理
import labelList from '../views/back/label/labelList.vue'
import addLabel from '../views/back/label/addLabel.vue'
import editLabel from '../views/back/label/editLabel.vue'
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
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/personal',
    name: 'personal',
    component: personal,
    children:[
      {
        path: '/personal',
        name: 'articleList',
        component: articleList
      },
      {
        path: 'addarticle',
        name: 'addarticle',
        component: addarticle
      },
      {
        path : '/personal/editArticle',
        name:'editArticle',
        component: editArticle
      },
      {
        path : 'sortList',
        name:'sortList',
        component: sortList
      },
      {
        path : 'addSort',
        name:'addSort',
        component: addSort
      },
      {
        path : 'editSort',
        name:'editSort',
        component: editSort
      },{
        path : 'labelList',
        name:'labelList',
        component: labelList
      },
      {
        path : 'addLabel',
        name:'addLabel',
        component: addLabel
      },
      {
        path : 'editLabel',
        name:'editLabel',
        component: editLabel
      }
    ]
  
  },
 
 
]

const router = new VueRouter({
  routes
})

export default router
