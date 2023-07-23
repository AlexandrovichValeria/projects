import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import BrokerPageView from '../views/BrokerPageView.vue'
import StockMarketView from '../views/StockMarketView.vue'
import AdminView from '../views/admin/AdminView.vue'
import AdminMarketSettings from '../views/admin/AdminMarketSettings.vue'
import AdminActiveBiddings from '../views/admin/AdminActiveBiddings.vue'
//import DummyView from '../views/DummyView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/login',
    name: 'home',
    component: LoginView
  },
  {
    path: '/:broker_name/broker_page',
    name: 'Broker Page',
    component: BrokerPageView
  },
  {
    path: '/admin',
    name: 'Admin Page',
    component: AdminView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
