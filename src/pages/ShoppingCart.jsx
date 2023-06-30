import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { BsTrash3 } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/cart'
import { authActions } from '../redux/slices/auth'
import { orderActions } from '../redux/slices/orders'
import CardProduct from '../components/CardProduct'

const ShoppingCart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { cart } = useSelector((s) => s.cart)
    const products = useSelector((s) => s.prod.products)
    const baseUrl = 'http://localhost:3000'

    const toPay = () => {
        let total = 0

        cart.forEach((cartItem) => {
            const cartProduct = products.find(
                (prod) => prod._id === cartItem._id
            )
            if (cartProduct && cartProduct.price) {
                total += cartItem.amount * cartProduct.price
            }
        })
        return total.toFixed(2)
    }

    const getTotalofProducts = () => {
        return cart.reduce((total, cartItem) => total + cartItem.amount, 0)
    }

    const getSubtotalOfProduct = (amount, price) => {
        return (amount * price).toFixed(2)
    }

    useEffect(() => {
        dispatch(authActions.getCart())
        dispatch(orderActions.getOrders())
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

    const handleBuy = async () => {
        try {
            if (cart.length > 0) {
                const response = await axios.post(`${baseUrl}/orders/buyCart`)
                dispatch(cartActions.removeAll())
                navigate('/profil')
                console.log('bought')
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (cart.length === 0 || products.length === 0 || products === null) {
        return (
            <div className="bg-white text-main">
                <p className="text-xl text-details text-center uppercase p-10">
                    your cart is empty
                </p>
                <div className="flex flex-wrap justify-center bg-gray-200 p-5">
                    {products.map((product) => (
                        <CardProduct key={product._id} product={product} />
                    ))}
                </div>
            </div>
        )
    }
    return (
        <div className="min-h-screen max-h-full  bg-gray-200 text-main">
            <div className="bg-white flex justify-around p-3 items-center">
                <h2 className="uppercase text-3xl  text-main text-left ">
                    Your Cart
                </h2>
                {cart.length > 0 && (
                    <div className="flex flex-col">
                        <span>Total products: {getTotalofProducts()}</span>
                        <span className="font-bold text-greenish">
                            $ {toPay()}
                        </span>
                    </div>
                )}
            </div>

            <div
                className="bg-gray-200 text-main p-2
            flex 
            flex-wrap justify-center 
            md:flex-nowrap md:justify-around  
            
            pt-4 "
            >
                {/* left */}
                <div className="w-[90%] md:w-[60%] ">
                    {cart.map((cartItem) => {
                        const productInCart = products.find(
                            (prod) => prod._id === cartItem._id
                        )
                        if (!productInCart) return null

                        return (
                            <div
                                className="flex justify-between 
                                p-3 bg-white
                                text-sm
                                sm:text-s
                                md:text-lg
                                "
                                key={cartItem._id}
                            >
                                {productInCart && (
                                    <div className="flex justify-center">
                                        <img
                                            className="
                                            h-20 w-20
                                            sm:h-40 sm:w-40"
                                            src={productInCart.image}
                                            alt={productInCart.title}
                                        />
                                        <div
                                            className=" text-sm
                                        flex flex-col pl-2 justify-center"
                                        >
                                            <span className="font-extrabold">
                                                {productInCart.title}
                                            </span>
                                            <span>
                                                {productInCart.description}
                                            </span>
                                            <span>${productInCart.price}</span>
                                        </div>
                                    </div>
                                )}

                                <div className=" w-[40%] ">
                                    <div className="flex flex-col  ">
                                        <hr />
                                        <div className=" flex justify-center items-center bg-gray-200">
                                            {/* button decrement  */}
                                            {cartItem.amount > 0 ? (
                                                <button
                                                    className=" border border-main p-1"
                                                    onClick={() =>
                                                        handleDecrement(
                                                            productInCart._id
                                                        )
                                                    }
                                                >
                                                    <AiOutlineMinus />
                                                </button>
                                            ) : (
                                                <button className=" border border-gray-400 p-1 text-gray-400">
                                                    <AiOutlineMinus />
                                                </button>
                                            )}
                                            {/* button decrement end */}

                                            <span className="p-2">
                                                {cartItem.amount}
                                            </span>

                                            {/* button increment  */}
                                            <button
                                                className="border border-main p-1"
                                                onClick={() =>
                                                    handleIncrement(
                                                        productInCart._id
                                                    )
                                                }
                                            >
                                                {' '}
                                                <AiOutlinePlus />
                                            </button>
                                            {/* button increment end  */}
                                        </div>
                                    </div>

                                    {productInCart && (
                                        <div
                                            className=" flex border-b 
                                        flex-col
                                        sm:flex-row justify-between "
                                        >
                                            <span className="text-right">
                                                subtotal:{' '}
                                            </span>
                                            <span className="text-greenish text-right">
                                                ${' '}
                                                {getSubtotalOfProduct(
                                                    cartItem.amount,
                                                    productInCart.price
                                                )}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                    <div className="w-full bg-white text-right pb-1">
                        <button
                            className=" w-fit underline  items-center "
                            onClick={handleRemoveAll}
                        >
                            {' '}
                            remove all
                            <BsTrash3 className="inline mx-1" />
                        </button>
                    </div>
                </div>

                {/* right  */}
                <div
                    className="flex flex-col justify-center items-center  bg-white  
                    w-[80%] md:w-[30%]
                    sm:mr-2
                    md:mt-0 mt-4 
                   h-fit
                    rounded-b-3xl p-5 "
                >
                    <span>Total products: {getTotalofProducts()}</span>
                    <span className="font-bold text-greenish">$ {toPay()}</span>
                    <button
                        onClick={() => handleBuy()}
                        className="w-40 bg-details  text-main  h-11 rounded-full uppercase"
                    >
                        buy
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart
