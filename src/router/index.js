import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Index from '../views/index.vue'

Vue.use(VueRouter)

  const routes = [
      {
        path: '/',
        name: 'Login',
        component: Login, 
      },
      {
        path: '/index',
        name: 'Index',
        component: Index,
        meta:{
                openName: ['menue1'],
        },
        children:[
          {
              path: 'menue1-1',
              name: 'menue1-1',
              meta:{
                openName: ['menue1'],
              },
              component: ()=> import('../views/menue1-1.vue')
          },
          {
              path: 'menue1-2',
              name: 'menue1-2',
              component: ()=> import('../views/menue1-2.vue')
          },
          {
              path: 'menue1-3',
              name: 'menue1-3',
              component: ()=> import('../views/menue1_3.vue')
          }
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
