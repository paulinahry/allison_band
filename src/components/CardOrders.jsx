import React from 'react'

function CardOrders({ orders, user }) {
    return (
        <div className="orders p-4">
            {orders.items.map((item) => (
                <div key={item._id} className="w-40 h-40">
                    <img src={item.product.image} alt={item.product.title} />
                    <ul>
                        <li>Product: {item.product.title}</li>
                        <li>Amount: {item.amount}</li>
                        <li>Price: {item.price} $</li>
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default CardOrders
