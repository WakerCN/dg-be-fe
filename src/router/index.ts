/*
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-05-09 11:04 周2
 * @Description  :
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/product/:id/edit',
      name: 'product-edit',
      component: () => import('@/views/EditorView.vue')
    },
    {
      path: '/detail/:id',
      name: 'product-detail',
      component: () => import('@/views/ProductDetail.vue')
    },
    {
      path: '/snow',
      name: 'snow',
      component: () => import('@/views/SnowView.vue')
    }
  ]
})

export default router
