import React from 'react'
import { useData } from '../context/UseContext'
import CardOrders from '../components/CardOrders'

const Profil = () => {
    const { orders, user } = useData()

    if (!user) {
        return <p>User not logged in</p>
    }

    if (!orders) {
        return <p>No orders</p>
    }

    return (
        <div className="profil h-screen">
            {orders.map((order) => (
                <CardOrders key={order._id} orders={order} />
            ))}
        </div>
    )
}

export default Profil
