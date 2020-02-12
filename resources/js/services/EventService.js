import axios from 'axios'
import store from '../store'
const apiClient = axios.create({
    baseURL: 'http://72.201.145.171:8000',
    withCredentials: false, // This is the default
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use(config => {
    const token = store.getters['auth/token']
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
    }

    return config
    }, error => {
        return Promise.reject(error)
    }
)

apiClient.interceptors.response.use(response => {
    return response
}, async error => {
    if (store.getters['auth/token']) {
        // TODO: Find more reliable way to determine when Token state
        if (error.response.status === 401 && error.response.data.message === 'Token has expired') {
            const { data } = await axios.post(apiClient.refreshToken())
            await store.dispatch('auth/saveToken', data)
            return axios.request(error.config)
        }

        if (error.response.status === 401 ||
            (error.response.status === 500 && (
                error.response.data.message === 'Token has expired and can no longer be refreshed' ||
                error.response.data.message === 'The token has been blacklisted'
            ))
        ) {
            await store.dispatch('auth/destroy')
        }
    }

    return Promise.reject(error)
})

export const live = {
    getStreams() {
        return apiClient.get('/api/twitchdata')
    }
}

export const forum = {
    getCategories() {
        return apiClient.get('/api/categories')
    },
    getSubcategories() {
        return apiClient.get('/api/subcategories')
    },
    getThreads(subcategoryId) {
        return apiClient.get('/api/threadsByCategory/' + subcategoryId)
    },
    getPosts(threadId) {
        return apiClient.get('/api/postsByThreadId/' + threadId)
    },
    getNumOfThreadsByCat(subcategoryId) {
        return apiClient.get('/api/numThreadsByCategory/' + subcategoryId)
    },
    newPost(post) {
        return apiClient.post('/api/requestPostForumThread' + post)
    }
}

export default {
    login(credentials) {
        return apiClient.post('/api/authenticate', credentials)
    },
    verifyByToken() {
        return apiClient.get('/api/me')
    },
    logout() {
        return apiClient.post('/api/logout')
    },
    refreshToken() {
        return apiClient.post('/api/refresh')
    },
    register(credentials) {
        return apiClient.post('/register', credentials)
    },
}
