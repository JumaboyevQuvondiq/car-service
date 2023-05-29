
const state = {
    routePath: '/',
    activeSidebarItem: '',
    avticeSubSidebarItem: '',
    tabItems: '',
    activeTabItem:''
}

const mutations = {
    setRoutePath(state,payload) {
        state.routePath = payload
    },
    setTabItems(state, payload) {
        state.tabItems = payload
    },
    setActiveTabItem(state, payload) {
        state.activeTabItem = payload
    },
    setActiveSidebarItem(state, payload) {
        state.activeSidebarItem = payload
    },
    setActiveSubSidebarItem(state, payload) {
        state.avticeSubSidebarItem = payload
    }
}

const getters = {
    getRoutePath(state) { 
        return state.routePath
    },
    getTabItems(state) {
        return state.tabItems
    },
    getActiveTabItem(state) {
        return state.activeTabItem
    },
    getActiveSidebarItem(state) {
       return state.activeSidebarItem 
    },
    getActiveSubSidebarItem(state) {
       return state.avticeSubSidebarItem
    }
}

export default {
    state,
    mutations,
    getters
}