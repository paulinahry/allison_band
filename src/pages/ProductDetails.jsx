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
    })

    const handleAddToCart = (id) => {
        dispatch(cartActions.addToCart({ id }))
    }

    const product = products.find((prod) => prod._id === id)

    return (
        <div className="min-h-screen max-h-full  lg:p-10  text-main flex flex-col ">
            <div className="  bg-details">
                <button
                    onClick={() => navigate('/store')}
                    className="mt-10 m-4 underline"
                >
                    <BiArrowBack className=" inline " />
                    back to store
                </button>
            </div>
            {product ? (
                <div
                    className="max-h-full min-h-screen shadow-2xl
               bg-white p-10 flex flex-col   lg:flex-row"
                >
                    <div className="flex justify-center">
                        <img
                            className="max-w-[600px]  max-h-[700px]"
                            src={product.image}
                            alt={product.title}
                        />
                    </div>
                    <div className="flex flex-col ">
                        <div className="flex justify-around items-center">
                            <div className="p-5  sm:flex-col ">
                                <p className="font-extrabold text-xxl">
                                    {product.title}
                                </p>
                                <p>{product.description}</p>
                                <p className="text-greenish font-bold text-xl">
                                    $ {product.price}
                                </p>
                            </div>
                            <button
                                className=" 
                            w-20 h-7
                            md:w-32 md:h-9 
                            text-xs md:text-sm
                            flex justify-center items-center
                            text-main  bg-details font-bold 
                            hover:text-details hover:bg-main
                            cursor-pointer rounded "
                                onClick={() => handleAddToCart(product._id)}
                            >
                                add to cart
                            </button>
                        </div>
                        <div className="p-5">
                            <span className="text-lg font-bold">
                                Lorem ipsum
                            </span>
                            , dolor sit amet consectetur adipisicing elit.
                            Mollitia delectus voluptatibus magni culpa vitae
                            ipsa illum similique voluptatem necessitatibus
                            veniam! Reiciendis, accusantium iusto quia ullam
                            facere sapiente maiores voluptate numquam Lorem
                            ipsum dolor sit amet, consectetur adipisicing elit.
                            Natus veritatis enim totam quidem magni velit eos et
                            dolorum soluta aliquid explicabo fugiat, aperiam,
                            mollitia ipsa omnis debitis ex nisi expedita.
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
