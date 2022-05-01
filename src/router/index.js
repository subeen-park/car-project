import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Mypage from '../views/Mypage.vue'
import Request from '../views/Request.vue'
import Passenger from '../views/Passenger.vue'
import Driver from '../views/Driver.vue'
import Chat from '../views/Chat.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/mypage',
    name: 'Mypage',
    component: Mypage
  },

  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },

  {
    path: '/driver',
    name: 'Driver',
    component: Driver
  },

  {
    path: '/passenger',
    name: 'Passenger',
    component: Passenger
  },

  {
    path: '/request',
    name: 'Request',
    component: Request
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
