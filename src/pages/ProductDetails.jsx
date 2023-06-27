import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { prodActions } from '../redux/slices/products'
import { BiArrowBack } from 'react-icons/bi'
import ErrorPage from '../pages/ErrorPage'

const ProductDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const products = useSelector((s) => s.prod.products)

    useEffect(() => {
        dispatch(prodActions.getProductById({ id }))
    }, [])

    const myProduct = products.find((prod) => prod.id === products.id)
    console.log(myProduct)

    return (
        <div className="min-h-screen max-h-full flex flex-wrap justify-center bg-gray-200 text-main ">
            {myProduct ? (
                <div className="max-h-full min-h-screen m-10">
                    <div>
                        <img src={myProduct.image} alt={myProduct.title} />
                    </div>
                    <p>
                        {myProduct.title}
                        {myProduct._id}
                    </p>
                    <p>{myProduct.description}</p>
                    <p>{myProduct.price}</p>
                    <button>add to cart</button>

                    <button
                        onClick={() => navigate('/store')}
                        className="underline block"
                    >
                        <BiArrowBack className="inline" />
                        go back
                    </button>
                </div>
            ) : (
                <ErrorPage />
            )}
        </div>
    )
}

export default ProductDetails
