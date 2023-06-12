import axios from 'axios'

const API_URL = 'http://localhost:3000'

export const getAllProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`)
        return response.data
    } catch (error) {
        console.log('Error:', error)
        throw error
    }
}

export const getUserOrders = async () => {
    try {
        const response = await axios.get(`${API_URL}/orders`)
        return response.data
    } catch (error) {
        console.log('Error:', error)
        throw error
    }
}

export const getUserData = async () => {
    try {
        const response = await axios.get(`${API_URL}/user`)
        return response.data
    } catch (error) {
        console.log('Error:', error)
        throw error
    }
}
