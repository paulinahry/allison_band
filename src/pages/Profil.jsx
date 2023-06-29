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

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(authActions.getCart())
        dispatch(prodActions.getProducts())
        dispatch(orderActions.getOrders())
    }, [])
    console.log('fff64f5r64fe654', orders)
    const calculateTotalPrice = () => {
        let totalPrice = 0

        orders.forEach((order) => {
            //order
            const itemInOrder = orders.find((ord) => ord._id === order._id)
            console.log('this is order', itemInOrder)
            console.log('items ', itemInOrder.items)
            console.log(products)
            const productId = itemInOrder.items.map((id) => {
                id = id.product
                const product = products.filter((prod) => prod._id === id)
                return product
            })
            totalPrice += productId[0].price * itemInOrder.items.amount
        })

        return totalPrice
    }

    const totalSum = calculateTotalPrice()

    if (!orders || orders.length === 0) {
        return <Spinner />
    }
    if (!authUser) {
        navigate('/')
        return null
    }
    const toPay = () => {
        let total = 0

        orders.forEach((orderItem) => {
            const product = products.find((prod) => prod._id === orderItem._id)
            if (product && product.price) {
                total += orderItem.amount * product.price
            }
        })
        return total.toFixed(2)
    }

    const getSubtotalOfProduct = (amount, price) => {
        return (amount * price).toFixed(2)
    }

    const getTotalofProducts = () => {
        return orders.reduce(
            (total, itemInOrder) => total + itemInOrder.amount,
            0
        )
    }

    return (
        <div className="profil min-h-screen max-h-full bg-white text-main ">
            <p className="bg-white text-center p-5">Welcome {authUser.email}</p>
            {orders.length > 0 && (
                <p className="bg-white text-center pb-1  text-xl">
                    Actuall orders: {orders.length}
                </p>
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
                        const itemInOrder = orders.find(
                            (ord) => ord._id === order._id
                        )

                        const orderedProducts = itemInOrder.items.map((id) => {
                            id = id.product
                            const product = products.filter(
                                (prod) => prod._id === id
                            )
                            return product[0]
                        })

                        return (
                            <div key={order._id} className="border p-20">
                                <p className="p-2 bg-details  text-main">
                                    order ID: {order._id}
                                </p>
                                {orderedProducts.map((product) => (
                                    <div className="flex justify-between">
                                        <img
                                            className="
                                         h-20 w-20
                                         sm:h-40 sm:w-40"
                                            src={product.image}
                                            alt={product.title}
                                        />
                                        <div
                                            className=" text-sm
                                     flex flex-col pl-2 justify-around"
                                        >
                                            <span className="font-extrabold">
                                                {product.title}
                                            </span>
                                            <span>{product.description}</span>
                                            <span>${product.price}</span>
                                        </div>

                                        {orders.length > 0 && (
                                            <div className="flex flex-col">
                                                <span>
                                                    Total products:{' '}
                                                    {getTotalofProducts()}
                                                </span>
                                                <span className="font-bold text-greenish">
                                                    $ {toPay()}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default Profil
