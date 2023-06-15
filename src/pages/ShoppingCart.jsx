import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/cart'

const ShoppingCart = () => {
    // const { cart, loaded } = useSelector((s) => s.cart)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     if (!loaded) {
    //         dispatch(cartActions.getCart())
    //     }
    // })

    // if (cart.length === 0) {
    //     return <p>Your cart is empty</p>
    // }

    return (
        <div>
            shopping cart
            {/* {cart.map((item) => (
                <div key={item._id}>
                    <h3>{item.product.title}</h3>
                    <p>{item.product.description}</p>
                    <p>Price: ${item.product.price}</p>
                    <p>Amount: {item.amount}</p>
                </div>
            ))} */}
        </div>
    )
}

export default ShoppingCart
