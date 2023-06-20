import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { prodActions } from '../redux/slices/products'
import CardProduct from '../components/CardProduct'
import { cartActions } from '../redux/slices/cart'

import Spinner from '../components/Spinner'

const ProductDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { products, loaded } = useSelector((state) => state.prod)
    const { cart } = useSelector((state) => state.cart)

    useEffect(() => {
        dispatch(prodActions.getProductById())
    }, [])

    function handleAddToCart(productId) {
        dispatch(cartActions.addToCart({ _id: productId }))
    }

    return (
        <div className="flex flex-wrap justify-center">
            {products && products._id === id ? (
                <CardProduct
                    key={products._id}
                    product={products}
                    onClick={() => handleAddToCart(products._id)}
                />
            ) : (
                <p>Product not found.</p>
            )}
        </div>
    )
}

export default ProductDetails
