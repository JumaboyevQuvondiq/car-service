import axios from "./axios.js"

const AuthService = {
    register(user) {
        const formData = new FormData
        formData.append('name', user.fullName)
        formData.append('email', user.email)
        formData.append('password', user.password)
        return axios.post('/accounts/register', formData, {})
    },
    login(user) {
        const formData = new FormData
        formData.append('email', user.email)
        formData.append('password', user.password)
        return axios.post('/accounts/login', formData, {})
    },
    saveUserData(tokenAndExpiredDate, user) {
        localStorage.setItem('token', JSON.stringify(tokenAndExpiredDate))
        localStorage.setItem('user', JSON.stringify(user))
    },
    isAuthenticated() {
        const auth = this.getAuth()
        if (auth != null) {
            return new Date() < new Date(auth.expiredDate)
        }
        else {
            return false
        }
    },
    getAuth() {
        return JSON.parse(localStorage.getItem('token'))
    },
    getToken() {
        return 'Bearer ' + JSON.parse(localStorage.getItem('token')).Token
    },
    removeToken() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
}

export default AuthService