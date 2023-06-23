import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { cartActions } from '../redux/slices/cart'
import { Link } from 'react-router-dom'
import { MdDone } from 'react-icons/md'
import { prodActions } from '../redux/slices/products'
import Spinner from '../components/Spinner'

const CardProduct = ({ product, onClick }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { products, loaded } = useSelector((s) => s.prod)
    const [isAdded, setIsAdded] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    const navigateTo = () => {
        navigate(`/store/${product._id}`)
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAdded(false)
        }, 1500)

        return () => clearTimeout(timer)
    }, [isAdded])

    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => {
                setIsAnimating(false)
            }, 1000)

            return () => clearTimeout(timer)
        }
    }, [isAnimating])

    const handleAddToCart = (id) => {
        dispatch(cartActions.addToCart({ id }))
        setIsAdded(true)
        setIsAnimating(true)
    }

    if (!loaded) {
        return <Spinner size={20} />
    }

    return (
        <>
            <div
                className="card bg-white m-2 ounded first-letter cursor-pointer 
            sm:p-3 p-2 r"
            >
                <div className="flex  justify-center ">
                    <img
                        onClick={navigateTo}
                        className="
                    
                    w-[150px]  h-[150px]
                    md:h-[250px] md:w-[250px]"
                        src={product.image}
                        alt={product.title}
                    />
                </div>
                <h3 className="text-s sm:text-xl font-extrabold">
                    {product.title}
                </h3>
                <p>{product.description}</p>

                {product.stock === 0 ? (
                    <p className="text-main">Out of Stock</p>
                ) : (
                    <>
                        {product.stock < 10 ? (
                            <p className="text-red-400">
                                Hurry up! Last Pieces
                            </p>
                        ) : (
                            <p className="text-greenish">Available</p>
                        )}
                    </>
                )}
                <div className="flex justify-between mt-1">
                    <p>${product.price}</p>
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
                        {isAnimating ? (
                            <Spinner
                                size={12}
                                color={'#f7d5b1'}
                                secondaryColor={'#2C3139'}
                            />
                        ) : isAdded ? (
                            <MdDone className="inline" />
                        ) : (
                            'Add to Cart'
                        )}
                    </button>
                </div>
            </div>
        </>
    )
}

export default CardProduct
