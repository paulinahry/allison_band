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
        <>
            <div className="card bg-white m-2 p-2 rounded">
                <img
                    className="h-[250px] w-[250px]"
                    src={product.image}
                    alt={product.title}
                />
                <h3 className="text-xl font-extrabold">{product.title}</h3>
                <p>{product.description}</p>

                {product.stock > 0 ? (
                    <p className="text-green-500"> Available</p>
                ) : (
                    'Out of stock'
                )}
                <div className="flex justify-between">
                    <p> ${product.price}</p>
                    <button className="text-white cursor-pointer rounded  bg-detailsRed p-1 px-4">
                        add to cart
                    </button>
                </div>
            </div>
        </>
    )
}

export default CardProduct
