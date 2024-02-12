/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables

import home from '@/pages/index.vue'
import { createRouter, createWebHistory } from 'vue-router'
import defaultRoutes from './default';
import mainLayout from '@/layout/mainLayout'


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: mainLayout,
     //redirect: { name: 'Login' },
    children: defaultRoutes,
    },
  ]
  
})

export default router
