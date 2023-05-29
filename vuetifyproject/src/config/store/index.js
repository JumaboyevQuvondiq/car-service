import { createStore } from "vuex"
import auth from './auth.js'
import cars from "./cars.js"
import news from './news.js'
import app from './app.js'
import sidebar from './sidebar.js'
const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        cars,
        app,
        news,
        sidebar
    }

})

export default store