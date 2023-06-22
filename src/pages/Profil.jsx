import { useSelector, useDispatch } from 'react-redux'
import CardOrders from '../components/CardOrders'
import Login from './Login'
import React, { useEffect } from 'react'
import { orderActions } from '../redux/slices/orders'
import Spinner from '../components/Spinner'
import { useNavigate, Link } from 'react-router-dom'
import { authActions } from '../redux/slices/auth'
import Info from '../components/Info'

const Profil = () => {
    const { orders, loaded } = useSelector((s) => s.ord)
    const authUser = useSelector((s) => s.auth.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log('orders', orders)

    useEffect(() => {
        dispatch(orderActions.getUserOrders())
        // dispatch(authActions.getCart())
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

    if (!authUser) {
        navigate('/')
    }

    return (
        <div className="profil h-screen bg-gray-200 text-main">
            <div className="orders">
                {orders.length === 0 ? (
                    <Info />
                ) : (
                    orders.map((order) => (
                        <ul key={order._id}>
                            {order.items.map((item) => (
                                <div
                                    key={item._id}
                                    className="border 1px bg-white text-black p-3"
                                >
                                    <div className="flex">
                                        <p>Your current orders:</p>

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
                    ))
                )}
            </div>
        </div>
    )
}

export default Profil
