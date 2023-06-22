import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../redux/slices/cart'
import { Link } from 'react-router-dom'
import { MdDone } from 'react-icons/md'

const CardProduct = ({ product }) => {
    const dispatch = useDispatch()
    const [isAdded, setIsAdded] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAdded(false)
            console.log(isAdded)
        }, 500)
        return () => clearTimeout(timer)
    })

    const handleAddToCart = (id) => {
        dispatch(cartActions.addToCart({ id }))
        setIsAdded(true)
    }

    return (
        <>
            <div className="card bg-white m-2 p-3 rounded first-letter cursor-pointer">
                <img
                    className="h-[250px] w-[250px]"
                    src={product.image}
                    alt={product.title}
                />
                <h3 className="text-xl font-extrabold">{product.title}</h3>
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
                        className="text-main  bg-details font-bold 
                        hover:text-details hover:bg-main
                        cursor-pointer rounded py-1 px-3"
                        onClick={() => handleAddToCart(product._id)}
                    >
                        add to cart
                    </button>
                </div>
                <div className="flex justify-end">
                    {isAdded && (
                        <span className="text-xs text-greenish  ">
                            <MdDone className="inline" /> product added{' '}
                        </span>
                    )}
                </div>

                <Link to={`/store/${product._id}`}>read more... </Link>
            </div>
        </>
    )
}

export default CardProduct
