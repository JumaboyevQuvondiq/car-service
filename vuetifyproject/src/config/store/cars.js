import carRepository from '@/services/cars.js'

const state = {
    cars: null,
    filter: {
        chooseColor: '',
        searchTerm: '',
        priceSort: 'asc',
        pageSize: 10,
        currentPage: 1,
    },
    colorsForCars: null,
    colorsForFilter: ['All', 'red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange', 'brown', 'black', 'white', 'gray', 'gold', 'silver', 'teal', 'indigo', 'magenta'],
    pagenationData: {
        TotalPages: 1
    },
    isLoadingCars: false
}

const mutations = {
    changeColorFilter(state, payload) {
        state.filter.chooseColor = payload
        state.filter.currentPage = 1
    },
    changeSearch(state, payload) {
        state.filter.searchTerm = payload
        state.filter.currentPage = 1

    },
    changeSort(state) {
        if (state.filter.priceSort == 'asc') {
            state.filter.priceSort = 'des'
        }
        else {
            state.filter.priceSort = 'asc'
        }
        state.filter.currentPage = 1

    },
    changePageSize(state, payload) {
        state.filter.pageSize = payload
        state.filter.currentPage = 1

    },
    changeCurrentPage(state, payload) {
        state.filter.currentPage = payload
    },
    changeCars(state, payload) {
        state.cars = payload
    },
    changePagenationData(state, payload) {
        state.pagenationData = payload
    },
    requestCarsStart(state) {
        state.isLoadingCars = true
    },
    requestCarsFinish(state) {
        state.isLoadingCars = false
    },
    setColorsForCarsProp(state, payload) {
        state.colorsForCars = payload;
    }
}

const actions = {
    getCars(contex) {
        contex.commit('requestCarsStart')
        carRepository.getCars(contex.state.filter).then(response => {
            contex.commit('changeCars', response.data)
            contex.commit('changePagenationData', JSON.parse(response.headers.get('pagenation')))
            contex.commit('requestCarsFinish')
        })
    },
    getColors(contex) {
        return new Promise((resolve, reject) => {
            carRepository.getColors().then(response => {
                contex.commit('setColorsForCarsProp', response.data)
                resolve(response)
            }).catch(err => {
                reject(err)
            })
        })
    },
    deleteCar(contex, id) {
        return new Promise((resolve, reject) => {
            contex.commit('requestCarsStart')
            carRepository.deleteCar(id).then(response => {
                contex.commit('requestCarsFinish')
                contex.state.filter.currentPage = 1
                resolve(response)
            }).catch(err => {
                contex.commit('requestCarsFinish')
                reject(err)
            })

        })

    },
    createCar(contex, car) {
        return new Promise((resolve, reject) => {
            contex.commit('requestCarsStart')
            carRepository.createCar(car).then(response => {
                contex.commit('requestCarsFinish')
                resolve(response)
            }).catch(err => {
                contex.commit('requestCarsFinish')
                reject(err)
            })

        })

    }

}

const getters = {
    getPriceFilter(state) {
        return state.filter.priceSort
    },
    getPageSize(state) {
        return state.filter.pageSize
    },
    getCurrentPage(state) {
        return state.filter.currentPage
    },
    getColorFilter(state) {
        return state.filter.chooseColor
    },
    getCarsArray(state) {
        return state.cars
    },
    getIsLoadingCars(state) {
        return state.isLoadingCars
    },
    getTotalPage(state) {
        return state.pagenationData.TotalPages
    },
    getColorsForCars(state) {
        return state.colorsForCars
    },
    getColorsForFilter(state) {
        return state.colorsForFilter
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}