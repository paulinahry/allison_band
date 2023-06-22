import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { prodActions } from '../redux/slices/products'
import CardProduct from '../components/CardProduct'

const ProductDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { products } = useSelector((s) => s.prod)

    useEffect(() => {
        dispatch(prodActions.getProductById({ id }))
    }, [])
    console.log('Product with id: ', products.id, 'id', id)

    return (
        <div className="flex flex-wrap justify-center">
            {id & (products.id === id) ? (
                <CardProduct key={products._id} product={products} />
            ) : (
                'nope'
            )}
        </div>
    )
}

export default ProductDetails
