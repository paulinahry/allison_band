import React, { useEffect } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { BsTrash3 } from 'react-icons/bs'

import { useSelector, useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/cart'
import { authActions } from '../redux/slices/auth'
import { prodActions } from '../redux/slices/products'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

const ShoppingCart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cart, loaded } = useSelector((s) => s.cart)
    const products = useSelector((s) => s.prod.products)
    const authUser = useSelector((s) => s.auth.user)

    const getTotal = () => {
        let total = 0

        cart.forEach((cartItem) => {
            const cartProduct = products.find(
                (prod) => prod._id === cartItem._id
            )
            console.log('cartProduct', cartProduct.price)
            total += cartItem.amount * cartProduct.price
        })
        return total.toFixed(2)
    }

    const getTotalAmount = () => {
        let total = 0
        cart.forEach((cartItem) => {
            const cartProduct = products.find(
                (prod) => prod._id === cartItem._id
            )
            total += cartItem.amount
        })
        return total
    }

    useEffect(() => {
        window.scrollTo(0, 0)
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

    if (loaded) return <Spinner />

    if (cart.length === 0 || products.length === 0) {
        return (
            <div className="bg-white text-main   ">
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
        <>
            <h2 className="uppercase text-3xl bg-white text-main text-left p-2 ">
                Your Cart
            </h2>
            <div className="bg-gray-200 text-main p-2 flex justify-around pt-4 h-screen">
                {/* left */}
                <div className="w-[60%]">
                    {cart.map((cartItem) => {
                        const productInCart = products.find(
                            (prod) => prod._id === cartItem._id
                        )

                        return (
                            <div
                                className="flex justify-around p-2 bg-white "
                                key={cartItem._id}
                            >
                                <div className="flex justify-center">
                                    <img
                                        className=" h-40 w-40"
                                        src={productInCart.image}
                                        alt={productInCart.title}
                                    />
                                    <div className="flex flex-col pl-2 justify-center ">
                                        <span className="font-extrabold ">
                                            {productInCart.title}
                                        </span>
                                        <span>{productInCart.description}</span>
                                        <span>
                                            Price: ${productInCart.price}
                                        </span>
                                    </div>
                                </div>

                                <div className="w-[40%] ">
                                    <div className="flex flex-col  ">
                                        <hr />
                                        <div className=" flex justify-center items-center bg-gray-200">
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

                                            <span className="p-2">
                                                {cartItem.amount}
                                            </span>
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
                                        </div>
                                    </div>

                                    <div className=" flex justify-between border-b ">
                                        <span>subtotal: </span>
                                        <span className="text-greenish text-right">
                                            ${' '}
                                            {(
                                                cartItem.amount *
                                                productInCart.price
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div>
                        <button
                            className=" w-fit underline "
                            onClick={handleRemoveAll}
                        >
                            {' '}
                            remove all
                            <BsTrash3 />
                        </button>
                    </div>
                </div>

                {/* right  */}
                <div
                    className="flex flex-col justify-center items-center
                w-[30%] h-fit bg-white  
                rounded-b-3xl p-5 mr-2"
                >
                    <span>Total products: {getTotalAmount()}</span>
                    <span className="font-bold text-greenish">
                        $ {getTotal()}
                    </span>
                    <button className="w-40 bg-details  text-main  h-11 rounded-full uppercase">
                        buy
                    </button>
                </div>
            </div>
        </>
    )
}

export default ShoppingCart
