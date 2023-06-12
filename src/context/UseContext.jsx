import React, { createContext, useEffect, useState, useContext } from 'react'
import { getAllProducts, getUserOrders, getUserData } from '../api/apiFetch'

const DataContextProvider = createContext()

export const useData = () => useContext(DataContextProvider)

export const DataProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [user, setUser] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await getAllProducts()
                const ordersData = await getUserOrders()
                const userData = await getUserData()
                setProducts(productsData)
                setOrders(ordersData)
                setUser(userData)
            } catch (error) {
                console.log('Error:', error)
            }
        }

        fetchData()
    }, [])

    const contextValue = {
        products,
        orders,
        user,
    }

    return (
        <DataContextProvider.Provider value={contextValue}>
            {children}
        </DataContextProvider.Provider>
    )
}

export default DataProvider
