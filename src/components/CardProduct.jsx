import React from 'react'
import Spinner from './Spinner'
import { useDispatch } from 'react-redux'
import { prodActions } from '../redux/slices/products'

const CardProduct = ({ product }) => {
    const dispatch = useDispatch()

    if (!product) {
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
                        className="text-main font-bold cursor-pointer rounded bg-details p-1 px-4"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </>
    )
}

export default CardProduct
