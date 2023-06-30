import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Info from '../components/Info'
import Spinner from '../components/Spinner'
import { orderActions } from '../redux/slices/orders'
import { prodActions } from '../redux/slices/products'
import { authActions } from '../redux/slices/auth'

const Profil = () => {
    const authUser = useSelector((s) => s.auth.user)
    const { orders } = useSelector((s) => s.ord)
    const products = useSelector((s) => s.prod.products)
    const authOrders = useSelector((s) => s.ord.orders)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(authActions.getCart())
        dispatch(prodActions.getProducts())
        dispatch(orderActions.getOrders())
    }, [])

    console.log('orders', orders)

    const calculateTotalPrice = () => {
        let totalPrice = 0

        orders.forEach((order) => {
            order === order._id
            console.log('this is order', order, order._id)
            console.log('items')

            order.items.forEach((item) => {
                const product = products.find(
                    (prod) => prod._id === item.product
                )

                const price = product.price
                const amount = item.amount
                totalPrice += price * amount
            })
        })

        return totalPrice.toFixed(2)
    }
    const totalSum = calculateTotalPrice()

    const getSubtotalOfProduct = (amount, price) => {
        return (amount * price).toFixed(2)
    }

    if (!orders || orders.length === 0) {
        return <Spinner />
    }
    if (!authUser) {
        navigate('/')
        return null
    }

    return (
        <div className="profil min-h-screen max-h-full bg-white text-main ">
            <p className="bg-white text-center p-5">Welcome {authUser.email}</p>
            {orders.length > 0 && (
                <div className="bg-white text-center pb-1  text-xl">
                    Actuall orders: {orders.length}
                </div>
            )}

            <div className="orders">
                {orders.length === 0 ? (
                    <>
                        <p className="bg-details text-center p-10">
                            You have no orders yet. Why don't you check out our
                            tour dates and store in the meanwhile?{' '}
                        </p>
                        <Info />
                    </>
                ) : (
                    orders.map((order) => {
                        const orderedProducts = order.items.map((item) => {
                            const product = products.find(
                                (prod) => prod._id === item.product
                            )
                            return {
                                ...product,
                                amount: item.amount,
                            }
                        })

                        // const orderedProducts = itemInOrder.items.map((id) => {
                        //     id = id.product
                        //     const product = products.filter(
                        //         (prod) => prod._id === id
                        //     )

                        // return product[0]
                        // })

                        return (
                            <div key={order._id} className=" p-20 ">
                                <div className="p-2 bg-details  text-main flex justify-between">
                                    order ID: {order._id}
                                    {orders.length > 0 && (
                                        <span className="font-bold text-greenish text-lg">
                                            $ {totalSum}
                                        </span>
                                    )}
                                </div>
                                {orderedProducts.map((product) => (
                                    <div className="flex justify-between border-b">
                                        <img
                                            className="
                                         h-20 w-20
                                         sm:h-40 sm:w-40"
                                            src={product.image}
                                            alt={product.title}
                                        />
                                        <div
                                            className=" text-sm
                                     flex flex-col "
                                        >
                                            <span className="font-extrabold">
                                                {product.title}
                                            </span>
                                            <span>{product.description}</span>
                                            <span>${product.price}</span>
                                            <span>{product.amount}</span>
                                        </div>

                                        {orders.length > 0 && (
                                            <div className="flex flex-col">
                                                <span className="font-bold text-greenish">
                                                    ${' '}
                                                    {getSubtotalOfProduct(
                                                        product.price,
                                                        product.amount
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <hr />
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default Profil
