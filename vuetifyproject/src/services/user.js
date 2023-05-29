import axios from './axios'
import auth from './auth'

const userService = {
    
    getData() {
        return JSON.parse(localStorage.getItem('user'))
    },
    updateUser(userDto) {
        const formdata = new FormData
        formdata.append('name', userDto.name)
        formdata.append('password', userDto.password)
        formdata.append('newPassword', userDto.newPassword)

        return axios.post('/accounts/update', formdata, { 'headers': { 'Authorization': auth.getToken() } })
    }
}

export default userService