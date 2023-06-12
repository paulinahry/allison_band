import React, { useState, useEffect } from 'react'
import { useData } from '../context/UseContext'

function CardOrders({ orders }) {
    const { userOrders } = useData()
    const [totalSum, setTotalSum] = useState(0)

    useEffect(() => {
        calculateTotalSum()
    }, [userOrders])

    const calculateTotalSum = () => {
        let sum = 0
        orders.items.forEach((order) => {
            const { price, amount } = order
            const orderSum = price * amount
            sum += orderSum
        })
        console.log('orders:', orders, 'USER ORDER:', userOrders, 'sum: ', sum)
        setTotalSum(sum)
    }

    return (
        <div className=" w-full ">
            <h2>Your orders:</h2>
            {orders.items.map((order) => (
                <div
                    key={order._id}
                    className="border 1px   bg-white text-black mt-5 p-3
                    "
                >
                    <div className="flex ">
                        <img
                            className="rounded w-[35%]"
                            src={order.product.image}
                            alt={order.product.title}
                        />
                        <ul className="pl-3 w-full">
                            <li className="text-xl font-extrabold">
                                {order.product.title}
                            </li>
                            <li className="text-sm">
                                {' '}
                                {order.product.description}
                            </li>
                            <li className="text-sm">Amount: {order.amount}</li>
                            <li className="text-sm"> Price: {order.price} $</li>
                        </ul>
                    </div>

                    <div className="text-right">
                        <hr className="text-gray-500 " />
                        <span className="text-black underline-offset-0 ">
                            Total:
                        </span>{' '}
                        <span className="underline text-green-600 ">
                            {totalSum} $
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CardOrders
