import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/cart'
import { authActions } from '../redux/slices/auth'
import { useNavigate } from 'react-router-dom'
import CardProduct from '../components/CardProduct'

const ShoppingCart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cart } = useSelector((s) => s.cart)
    const { products } = useSelector((s) => s.prod)
    const authUser = useSelector((s) => s.auth.user)

    useEffect(() => {
        dispatch(authActions.getCart())
        console.log('getCart läuft: ', authActions.getCart(), products, cart) //empty arrays
    }, [])

    const handleRemoveOne = () => {
        dispatch(cartActions.removeOne())
    }

    const handleIncrement = () => {
        dispatch(cartActions.addToCart())
    }

    const handleRemoveAll = () => {
        dispatch(cartActions.removeAll())
    }

    if (cart.length === 0) {
        return <p>Your cart is empty</p>
    }
    console.log(authUser)
    return (
        <div>
            <h2>Shopping Cart</h2>
            {cart.map((product) => (
                <div key={product._id}>
                    <p>{product.title}</p>
                    <p>Amount: {product.amount}</p>

                    <button
                        onClick={() => handleRemoveOne(product.product._id)}
                    >
                        minus
                    </button>

                    <button
                        onClick={() => handleIncrement(product.product._id)}
                    >
                        plus
                    </button>
                </div>
            ))}
            <button onClick={handleRemoveAll}>Remove All</button>
        </div>
    )
}

export default ShoppingCart
