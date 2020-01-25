import apiClient from './EventService'

const forum = {
    getCategories() {
        return apiClient.get('/api/categories')
    },
}

export default forum
