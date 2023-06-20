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

    // const getTotal = (productId) => {
    //     console.log(cart)
    //     let total = 0
    //     cart.map((cartItem) => {
    //         const prodInCart = products.find((prod) => {
    //             prod._id = cartItem._id
    //         })
    //         total += prodInCart.price * cartItem.amount
    //     })
    //     return total
    // }
    // const sumOfProducts = getTotal()

    if (cart.length === 0) {
        return (
            <div className="bg-white text-main ">
                <p>Your cart is currently empty</p>
                <div className="uppercase flex flex-col justify-center">
                    <Link className="w-fit" to={'/'}>
                        Home
                    </Link>
                    <Link className="w-fit" to={'/store'}>
                        Store
                    </Link>
                    <Link className="w-fit" to={'/tour'}>
                        tour
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-200 text-main p-2">
            <h2 className="uppercase text-3xl text-left ">Your Cart</h2>

            {cart.map((cartItem) => {
                const productInCart = products.find(
                    (prod) => prod._id === cartItem._id
                )

                return (
                    <div
                        className="flex justify-around p-2 bg-white "
                        key={cartItem._id}
                    >
                        <div className="bg-white ">
                            <img
                                className=" h-40 w-40"
                                src={productInCart.image}
                                alt={productInCart.title}
                            />
                        </div>

                        <div className="w-[40%] ">
                            <div className="flex flex-col  ">
                                <span>{productInCart.title}</span>
                                <span>${productInCart.price}</span>
                                <hr />
                                <div className=" flex justify-center items-center">
                                    <button
                                        className="cursor-pointer"
                                        onClick={() =>
                                            handleDecrement(productInCart._id)
                                        }
                                    >
                                        <AiOutlineMinus />
                                    </button>

                                    <span className="p-2">
                                        {' '}
                                        {cartItem.amount}
                                    </span>
                                    <button
                                        clas
                                        sName="cursor-pointer"
                                        onClick={() =>
                                            handleIncrement(productInCart._id)
                                        }
                                    >
                                        {' '}
                                        <AiOutlinePlus />
                                    </button>
                                </div>
                            </div>

                            <hr />
                            <span className="text-greenish">
                                {(
                                    cartItem.amount * productInCart.price
                                ).toFixed(2)}
                            </span>
                        </div>
                    </div>
                )
            })}
            <div className="flex flex-col items-end ">
                <button className=" w-fit underline" onClick={handleRemoveAll}>
                    Remove all
                </button>

                <button className="w-40 bg-details  text-main  h-11 rounded-full uppercase">
                    buy
                </button>
            </div>
        </div>
    )
}

export default ShoppingCart
