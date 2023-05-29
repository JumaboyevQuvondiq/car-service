import repository from '@/services/news.js'

const state = {

}

const mutations = {

}

const actions = {
    async getNews() {
        return await new Promise((resolve, reject) => {
            repository.getNews().then(response => {
                resolve(response)
            }).catch(err => {
                reject(err)
            })
        })
    },
    async getNewsItem() {
        return await new Promise((resolve, reject) => {
            repository.getNewsItem().then(response => {
                resolve(response.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    async getCategories() {
        return await new Promise((resolve, reject) => {
            repository.getCategories().then(response => {
                resolve(response)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}