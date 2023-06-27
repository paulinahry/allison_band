import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import { orderActions } from '../redux/slices/orders'
import { useNavigate, Link } from 'react-router-dom'
import Info from '../components/Info'
import { prodActions } from '../redux/slices/products'
import Spinner from '../components/Spinner'

const Profil = () => {
    const { orders, loaded } = useSelector((s) => s.ord)
    const authUser = useSelector((s) => s.auth.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(orderActions.getUserOrders())
        dispatch(prodActions.getProducts())
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

    return (
        <div className="profil bg-gray-200 text-main ">
            <div className="orders">
                {orders.length === 0 ? (
                    <>
                        <p className="bg-details text-main text-center p-10">
                            You have no orders yet. Why don't you check out our
                            tour dates and store in meanwhile?{' '}
                        </p>
                        <Info />
                    </>
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
