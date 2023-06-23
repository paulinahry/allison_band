import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { prodActions } from '../redux/slices/products'
import CardProduct from '../components/CardProduct'

const ProductDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const products = useSelector((s) => s.prod.products)

    useEffect(() => {
        dispatch(prodActions.getProductById({ id }))
    }, [])

    const myProduct = products.find((prod) => prod.id === products.id)

    return (
        <div className="flex flex-wrap justify-center bg-gray-200 text-main ">
            {myProduct ? (
                <div>
                    <p>{myProduct.title}</p>
                </div>
            ) : (
                'nope'
            )}
        </div>
    )
}

export default ProductDetails
