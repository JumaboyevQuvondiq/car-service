import authService from "@/services/auth.js"
import userService from "@/services/user.js"

const state = {
    isLoading: false,
    user: userService.getData() ? userService.getData().name : null,
    errors: null
}

const getters = {
    userInfo(state) {
        return state.user
    }
}
const mutations = {
    requestStart(state) {
        state.isLoading = true
        state.errors = null
    },
    requestSuccess(state) {
        state.isLoading = false
    },
    requestSuccesWith201(state) {
        state.isLoading = false
    },
    requestFailure(state, payload) {
        state.isLoading = false
        state.user = null
        state.errors = payload
    },
    setUserData(state, payload) {
        state.user = payload.name
    },
    logOut(state) {
        state.user = null
        state.errors = null
        authService.removeToken()
    }
}

const actions = {
    register(contex, user) {
        return new Promise((resolve, reject) => {
            contex.commit('requestStart')
            authService.register(user)
                .then((response) => {
                    contex.commit('requestSuccesWith201')
                    resolve(response)
                })
                .catch((err) => {
                    contex.commit('requestFailure', err.response)
                    reject(err.response)
                })
        })
    },
    login(contex, user) {
        return new Promise((resolve, reject) => {
            contex.commit('requestStart')
            authService.login(user)
                .then(response => {
                    if (response.status == 200) {
                        let token = JSON.parse(response.headers.get('x-access-token'))
                        authService.saveUserData(token, response.data)
                        contex.commit('setUserData', response.data)
                        contex.commit('requestSuccess')
                    }
                    else {
                        contex.commit('requestSuccesWith201')
                    }
                    resolve(response)
                })
                .catch(err => {
                    contex.commit('requestFailure', err.response)
                    reject(err)
                })
        })
    },
    updateUser(contex, userDto) {
        return new Promise((resolve, reject) => {
            contex.commit('requestStart')
            authService.updateUser(userDto).then(response => {
                if (response.status == 201) {
                    contex.commit('requestSuccess')
                }
                else {
                    contex.commit('requestSuccesWith201')
                }
                resolve(response)
            }).catch((err) => {
                contex.commit('requestFailure', err.response)
                reject(err.response)
            })
        })
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}