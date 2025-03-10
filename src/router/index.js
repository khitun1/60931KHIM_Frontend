import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '@/components/HomeComponent.vue'
import FilmsComponent from '@/components/FilmsComponent.vue'
import HallsComponent from '@/components/HallsComponent.vue'
import CreateHall from '@/components/CreateHall.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeComponent
    },
    {
      path: '/films',
      name: 'films',
      component: FilmsComponent
    },
    {
      path: '/halls',
      name: 'halls',
      component: HallsComponent
    },
    {
      path: '/createHall',
      name: 'createHall',
      component: CreateHall,
    }
  ]
})

export default router
