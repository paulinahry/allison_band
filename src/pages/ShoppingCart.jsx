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
        console.log('getCart läuft: ', authActions.getCart(), products, cart)
    }, [])

    const handleDecreament = (id) => {
        dispatch(cartActions.removeOne({ id }))
    }

    const handleIncrement = (id) => {
        dispatch(cartActions.addToCart({ id }))
    }

    const handleRemoveAll = () => {
        dispatch(cartActions.removeAll())
    }

    if (cart.length === 0) {
        return <p>Your cart is empty</p>
    }
    console.log(authUser)
    return (
        <div className="bg-gray-200 text-main p-2">
            <h2>Your Cart</h2>
            {cart.map((product) => (
                <div key={product._id}>
                    <div className="flex items-center ">
                        <button
                            className="bg-white border-main px-1 text-3xl"
                            onClick={() => {
                                console.log(product._id)
                                handleDecreament(product._id)
                            }}
                        >
                            -
                        </button>
                        <p>Amount: {product.amount}</p>

                        <button
                            className="bg-white border-main  p-1 text-2xl "
                            onClick={() => handleIncrement(product._id)}
                        >
                            +
                        </button>
                    </div>
                </div>
            ))}

            <button className="text-red-600" onClick={() => handleRemoveAll()}>
                Remove All
            </button>
        </div>
    )
}

export default ShoppingCart
