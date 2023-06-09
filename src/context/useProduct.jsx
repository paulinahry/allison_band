import React, { createContext, useEffect, useState, useContext } from 'react'
import { getAllProducts } from '../api/apiFetch'

const ProductContext = createContext()

export const useProduct = () => useContext(ProductContext)

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await getAllProducts()
                setProducts(productsData)
            } catch (error) {
                console.log('Error:', error)
            }
        }

        fetchProducts()
    }, [])

    const contextValue = {
        products,
    }

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider
