import apiClient from '../services/EventService'
import ENUM from './enums'

export const state = {
    showLogin: false,
    showRegistration: false,
    user: null,
    token: window.localStorage.getItem('token'),
}


export const mutations = {
    SET_USER(state, user) {
        state.user = user
    },

    LOGOUT(state) {
        state.user = null
        state.token = null
        window.localStorage.removeItem('token')
    },

    FETCH_USER_FAILURE(state) {
        state.user = null
        state.token = null
        window.localStorage.removeItem('token')
        window.location.reload()
    },

    SET_TOKEN(state, { token }) {
        state.token = token
        window.localStorage.setItem('token', token)
    },
    SET_API_STATE(state, apiState) {
        state.apiState = 3
    }
}

export const actions = {
    login({commit}, credentials) {
        return apiClient.login(credentials)
            .then( ({data}) => {

        })
    },
    async verifyUserLoaded({ commit }) {
        try {
            const { data } = await apiClient.verifyByToken()
        } catch (e) {
            console.log(e)
        }
    },
    async fetchUser({ commit }) {
        await apiClient.verifyByToken()
            .then(({data}) => commit('SET_USER', data))
            .catch((error) => {
                if (error.message.localeCompare('Token has expired')) {
                    apiClient.refreshToken()
                        .then( ({data}) => { commit('SET_TOKEN', data);
                            apiClient.verifyByToken()
                                .then( ({data}) => commit('SET_USER', data))
                                .catch((error) => console.log(error))
                        })
                        .catch(() => commit('FETCH_USER_FAILURE'))
                } else {
                    commit('FETCH_USER_FAILURE')
                }
            })
    },
    setUser({ commit }, payload) {
        commit('SET_USER', payload)
    },
    saveToken({ commit }, payload) {
        commit('SET_TOKEN', payload)
    },
    async logout({ commit }) {
        await apiClient.logout()
        commit('LOGOUT')
    },
    destroy({ commit }) {
        commit('LOGOUT')
    },
}

export const getters = {
    user: state => state.user,
    loaded: state => state.loaded,
    check: state => state.user !== null,
    token: state => state.token
}
