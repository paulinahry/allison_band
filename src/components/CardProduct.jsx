import React from 'react'
import Spinner from './Spinner'
import { useSelector, useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/cart'
import { Link, useNavigate } from 'react-router-dom';


const CardProduct = ({ product, onClick }) => {
    const dispatch = useDispatch()
    const navigate= useNavigate()
    const { products, loaded } = useSelector((s) => s.prod)

    if (!loaded) {
        return <Spinner size={20} />
    }



    return (
        <>
            <div className="card bg-white m-2 p-2 rounded first-letter cursor-pointer" 
       >
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
                        onClick={onClick}
                    >
                        Add to Cart
                    </button>


                </div>
                <Link to={`/store/${product._id}`}>read more... </Link>
        
            </div>
        </>
    )
}

export default CardProduct
