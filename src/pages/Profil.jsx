import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Info from '../components/Info'
import Spinner from '../components/Spinner'
import { orderActions } from '../redux/slices/orders'
import { prodActions } from '../redux/slices/products'
import { authActions } from '../redux/slices/auth'

const Profil = () => {
    // const { orders, loaded } = useSelector((s) => s.ord)
    const authUser = useSelector((s) => s.auth.user)
    const { orders } = useSelector((s) => s.ord)
    const authOrders = authUser.orders

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(authActions.getCart())
        dispatch(prodActions.getProducts())
        dispatch(orderActions.getOrders())
    }, [])

    const calculateTotalPrice = () => {
        let totalPrice = 0

        orders.forEach((order) => {
            order.items.forEach((item) => {
                totalPrice += item.price * item.amount
            })
        })
        return totalPrice
    }

    const totalSum = calculateTotalPrice()

    if (!orders) {
        return <Spinner />
    }
    if (!authUser) {
        navigate('/')
    }
    console.log('user profil', authUser.orders)
    console.log('auth orders', authOrders)
    console.log(' orders', orders)
    return (
        <div className="profil bg-gray-200 text-main ">
            <p className="bg-white text-center p-5">Welcome {authUser.email}</p>

            <div className="orders">
                {orders.length === 0 ? (
                    <>
                        <p className="bg-details text-center p-10">
                            You have no orders yet. Why don't you check out our
                            tour dates and store in meanwhile?{' '}
                        </p>
                        <Info />
                    </>
                ) : (
                    orders.map((order) => (
                        <>
                            <p className=" text-center">
                                {' '}
                                order {authOrders._id}:{' '}
                            </p>

                            <ul key={order._id}>
                                {order.items.map((item) => (
                                    <div
                                        key={item._id}
                                        className="border 1px bg-white text-black p-3"
                                    >
                                        <div className="flex">
                                            <img
                                                className="rounded w-[35%]"
                                                src={item.product.image}
                                                alt={item.product.title}
                                            />
                                            <ul className="pl-3 w-full">
                                                <li className="text-xl font-extrabold">
                                                    {item.product.title}
                                                </li>
                                                <li className="text-sm">
                                                    {item.product.description}
                                                </li>
                                                <li className="text-sm">
                                                    Amount: {item.amount}
                                                </li>
                                                <li className="text-sm">
                                                    Price: {item.price} $
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="text-right">
                                            <hr className="text-main" />
                                            <span className="text-black underline-offset-0">
                                                Total:
                                            </span>{' '}
                                            <span className="underline text-green-600">
                                                {totalSum} $
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </>
                    ))
                )}
            </div>
        </div>
    )
}

export default Profil
