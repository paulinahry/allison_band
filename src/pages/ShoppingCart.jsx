import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/cart'
import { authActions } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import CardProduct from '../components/CardProduct'

const ShoppingCart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cart } = useSelector((s) => s.cart)
    const { product } = useSelector((s) => s.prod)
    const authUser = useSelector((s) => s.auth.user)

    useEffect(() => {
        dispatch(authActions.getCart())
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

    // if ( cart.length === 0) {
    //     return <p>Your cart is empty</p>
    // }
    return (
        <div>
            <h2>Shopping Cart</h2>
            {cart.map((item) => (
                <div key={item._id}>
                    <CardProduct
                        key={product.id}
                        product={product}
                        onClick={handleAddToCart}
                    />
                    <p>Amount: {item.amount}</p>

                    <button onClick={() => handleRemoveOne(item.product._id)}>
                        minus
                    </button>

                    <button onClick={() => handleIncrement(item.product._id)}>
                        plus
                    </button>
                </div>
            ))}
            <button onClick={handleRemoveAll}>Remove All</button>
        </div>
    )
}

export default ShoppingCart
