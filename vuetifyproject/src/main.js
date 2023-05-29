import App from './App.vue'
import { createApp } from 'vue'
import store from '@/config/store/index.js'
import {registerPlugins} from '@/plugins/index.js'
import i18n from '@/i18n/index.js'
const app = createApp(App)
app.use(i18n)
app.use(store)
registerPlugins(app)
app.config.globalProperties.$currentTheme = function() {
    return (localStorage.getItem('theme'))? localStorage.getItem('theme') : 'dark'
}
app.mount('#app')