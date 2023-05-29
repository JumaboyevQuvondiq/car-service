import axios from 'axios'
import store from '@/config/store/index'
import router from '@/config/router/index'

axios.defaults.baseURL = import.meta.env.VITE_SERVICE_API

axios.interceptors.response.use(undefined, function (error) {
    if (error) {
      if (error.response.status === 401) {
          store.commit('logOut')
          return router.push({name: 'Login'})
      }
    }
  })
  
export default axios