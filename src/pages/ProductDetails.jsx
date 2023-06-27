import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { prodActions } from '../redux/slices/products'
import { cartActions } from '../redux/slices/cart'
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

    const handleAddToCart = (id) => {
        dispatch(cartActions.addToCart({ id }))
    }

    const myProduct = products.find((prod) => prod.id === products.id)

    return (
        <div className="min-h-screen max-h-full  bg-gray-200 text-main ">
            <button onClick={() => navigate('/store')} className="mt-10">
                <BiArrowBack className=" inline underline" />
                go back
            </button>
            {myProduct ? (
                <div className="max-h-full min-h-screen mx-0 my-auto ">
                    <div className="max-w-[600px]">
                        <img src={myProduct.image} alt={myProduct.title} />
                    </div>
                    <div className="p-5 flex justify-around">
                        <div>
                            <p className="extrabold text-xxl">
                                {myProduct.title}
                            </p>
                            <p>{myProduct.description}</p>
                            <p>{myProduct.price}</p>
                        </div>
                        <div className=" ">
                            <button
                                className=" 
                            w-20 h-7
                            md:w-32 md:h-9 
                            text-xs md:text-sm
                            flex justify-center items-center
                            text-main  bg-details font-bold 
                            hover:text-details hover:bg-main
                            cursor-pointer rounded "
                                onClick={() => handleAddToCart(myProduct._id)}
                            >
                                add to cart
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <ErrorPage />
            )}
        </div>
    )
}

export default ProductDetails
