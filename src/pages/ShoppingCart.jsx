import React, { useEffect } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

import { useSelector, useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/cart'
import { authActions } from '../redux/slices/auth'
import { prodActions } from '../redux/slices/products'
import { Link, useNavigate } from 'react-router-dom'

const ShoppingCart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cart } = useSelector((s) => s.cart)
    const products = useSelector((s) => s.prod.products)
    const authUser = useSelector((s) => s.auth.user)

    useEffect(() => {
        dispatch(authActions.getCart())
        dispatch(prodActions.getProducts())
    }, [])

    const handleDecrement = (id) => {
        dispatch(cartActions.removeOne({ id }))
    }

    const handleIncrement = (id) => {
        dispatch(cartActions.addToCart({ id }))
    }

    const handleRemoveAll = () => {
        dispatch(cartActions.removeAll())
    }

    if (cart.length === 0) {
        return <p>Your cart is currently empty</p>
    }

    return (
        <div className="bg-gray-200 text-main p-2">
            <h2 className="uppercase text-3xl text-right ">Your Cart</h2>
            {cart.map((cartItem) => {
                const productInCart = products.find(
                    (prod) => prod._id === cartItem._id
                )

                return (
                    <div className="flex justify-around p-2" key={cartItem._id}>
                        <div>
                            <img
                                className=" h-40 w-40"
                                src={productInCart.image}
                                alt={productInCart.title}
                            />
                        </div>

                        <div>
                            <div className="flex flex-col">
                                <span>{productInCart.title}</span>
                                <span>Price: {productInCart.price}</span>
                                <hr />
                            </div>
                            <div className="flex justify-center items-center">
                                <AiOutlineMinus
                                    className="cursor-pointer"
                                    onClick={() =>
                                        handleDecrement(productInCart._id)
                                    }
                                />

                                <span> {cartItem.amount}</span>
                                <AiOutlinePlus
                                    className="cursor-pointer"
                                    onClick={() =>
                                        handleIncrement(productInCart._id)
                                    }
                                />
                            </div>
                            <div className="flex flex-col">
                                <button
                                    className="text-red-600 underline"
                                    onClick={handleRemoveAll}
                                >
                                    Remove All
                                </button>

                                <button className="w-40 bg-details  text-main  h-11 rounded-full">
                                    buy
                                </button>
                            </div>
                        </div>
                        <hr />
                    </div>
                )
            })}
        </div>
    )
}

export default ShoppingCart
