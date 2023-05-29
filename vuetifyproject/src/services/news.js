import axios from "./axios.js"
import auth from './auth.js'
import { useRoute } from 'vue-router'

const newsRepository = {
    getNews() {
        return axios.get('/news/' + this.getCategoryName(), { 'headers': { 'Authorization': auth.getToken() } })
    },
    getCategoryName() {
        return useRoute().params.category
    },
    getNewsId() {
        return useRoute().params.id
    },
    getNewsItem() {
        return axios.get('/news/' + this.getCategoryName() + '/' + this.getNewsId(), { 'headers': { 'Authorization': auth.getToken() } })
    },
    getCategories() {
        return axios.get('/category', { 'headers': { 'Authorization': auth.getToken() } })
    }
}
export default newsRepository