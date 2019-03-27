import Vue from 'vue'
import Router from 'vue-router'
import Randoms from './components/Randoms.vue'
import Random from './components/Random.vue'
import Dice from './components/Dice.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/randoms'
    },
    {
      path: '/randoms',
      name: 'randoms',
      component: Randoms
    },
    {
      path: '/dice',
      name: 'dice',
      component: Dice
    },
    {
      path: '/randoms/:id',
      name: 'random',
      component: Random
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
