import apiClient from '../services/EventService'
import ENUM from './enums'

export const state = {
    apiState: ENUM.INIT,
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
        window.localStorage.removeItem('token')
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
        try {
            const { data } = await apiClient.verifyByToken()
            commit('SET_USER', data)
        } catch (e) {
            commit('FETCH_USER_FAILURE')
        }
    },
    setUser({ commit }, payload) {
        console.log(payload)
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
