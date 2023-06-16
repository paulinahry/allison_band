import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/cart'
import { authActions } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'

const ShoppingCart = () => {
    // const dispatch = useDispatch()
    // const navigate = useNavigate()
    // function removeOne() {
    //     dispatch(cartActions.removeOne())
    // }
    // function removeAll() {
    //     dispatch(cartActions.removeAll())
    // }
    // const authUser = useSelector((s) => s.auth.user)
    // const cart = useSelector((s) => s.cart)

    // useEffect(() => {
    //     if (!loaded) {
    //         dispatch(authActions.getCart())
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
