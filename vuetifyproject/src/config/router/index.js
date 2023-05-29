// Composables
import { createRouter, createWebHistory } from 'vue-router'
import layout from '@/layouts/default/MainLayout.vue'
import loginLayout from '@/layouts/login/LoginLayout.vue'
import login from '@/components/account/Login.vue'
import register from '@/components/account/Register.vue'
import cars from '@/views/Cars.vue'
import settings from '@/views/Settings.vue'
import newsList from '@/components/news/NewsList.vue'
import newsItem from '@/components/news/NewsItem.vue'
import auth from '@/services/auth.js'





const routes = [
  {
    path: '/',
    component: layout,
    children: [
      {
        path: '',
        name: 'cars',
        component: cars,
      },
      {
        path: 'settings',
        name: 'settings',
        component: settings
      },
      {
        path: 'news/:category',
        name: 'news',
        component: newsList
      },
      {
        path: 'news/:category/:id',
        name: 'newsItem',
        component: newsItem
      }
    ],
  },

  {
    path: '/login',
    component: loginLayout,
    children: [
      {
        name: 'Login',
        path: '',
        component: login
      },
      {
        name: 'register',
        path: '/register',
        component: register
      }
    ]
  }
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => { 
  const authorization = auth.isAuthenticated();
  if ((to.name != 'Login' && to.name != 'register') && !authorization) {
    next({ name: 'Login' })
  }
  else if ((to.name === 'Login' || to.name === 'register') && authorization) {
    next({ name: 'cars' })
  }
  else next()

});


export default router
