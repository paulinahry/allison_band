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
                className=" card bg-white cursor-pointer 
             rounded p-4
            w-[200px] md:w-fit mt-2 mr-2
            "
            >
                <div className="flex justify-center ">
                    <img
                        onClick={navigateTo}
                        className="
                    w-full h-[170px]
                    md:h-[200px] md:w-[200px] "
                        src={product.image}
                        alt={product.title}
                    />
                </div>
                <h3 className="text-s w-full sm:text-lg font-extrabold h-10">
                    {product.title}
                </h3>
                <p>{product.description}</p>

                {product.stock === 0 ? (
                    <p className="text-main">Out of Stock</p>
                ) : (
                    <>
                        {product.stock < 10 ? (
                            <p className="text-red-400 mt-1 text-[14px]">
                                Hurry up! Last Pieces
                            </p>
                        ) : (
                            <p className="text-greenish mt-1 text-[14px]">
                                Available
                            </p>
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
