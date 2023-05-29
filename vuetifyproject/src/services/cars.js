import axios from './axios.js'
import auth from './auth.js'

const CarsRepository = {
    getCars(filter) {
        const formData = new FormData()
        formData.append('color', filter.chooseColor)
        formData.append('search', filter.searchTerm)
        formData.append('sort', filter.priceSort)
        formData.append('pageSize', filter.pageSize)
        formData.append('page', filter.currentPage)
        return axios.post('/cars/', formData, { 'headers': { 'Authorization': auth.getToken() } })
    },
    getColors() {
        return axios.get('/cars/getcolors', { 'headers': { 'Authorization': auth.getToken() } })
    },
    deleteCar(id) {
        const formData = new FormData()
        formData.append('id', id)
        return axios.post('/cars/delete', formData, { 'headers': { 'Authorization': auth.getToken() } })
    },
    createCar(car) {
        console.log(car);
        const formdata = new FormData()
        formdata.append('company', car.company)
        formdata.append('model', car.model)
        formdata.append('price', car.price)
        formdata.append('color', car.color)

        return axios.post("/cars/create", formdata, { 'headers': { 'Authorization': auth.getToken() } })
    }

}
export default CarsRepository
