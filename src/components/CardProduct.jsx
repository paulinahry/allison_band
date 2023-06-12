import React, { useState, useEffect } from 'react'
import Spinner from './Spinner'
import { getAllProducts } from '../api/apiFetch'

const CardProduct = ({ product }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [loaded, setLoadedProduct] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getAllProducts()
                setLoadedProduct(data)
                setIsLoading(false)
            } catch (error) {
                console.log('Error:', error)
            }
        }

        fetchProduct()
    }, [])

    if (isLoading) {
        return <Spinner size={20} />
    }

    return (
        <div className="card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
        </div>
    )
}

export default CardProduct
