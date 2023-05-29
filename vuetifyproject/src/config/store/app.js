import themeService from "@/services/theme.js"


const mutations = {
    setAppColor(state, payload) {
        themeService.Save(payload)
    }
}
const getters = { 
    getAppColor() {
        return themeService.Get()
    }
}

export default {
    mutations,
    getters
}