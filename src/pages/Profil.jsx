import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Info from '../components/Info'
import Spinner from '../components/Spinner'
import { orderActions } from '../redux/slices/orders'
import { prodActions } from '../redux/slices/products'
import { authActions } from '../redux/slices/auth'

const Profil = () => {
    const authUser = useSelector((s) => s.auth.user)
    const { orders } = useSelector((s) => s.ord)
    const products = useSelector((s) => s.prod.products)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(authActions.getCart())
        dispatch(prodActions.getProducts())
        dispatch(orderActions.getOrders())
    }, [])

    // CALCULATIONS
    const calculateTotalPrice = (orderId) => {
        let totalPrice = 0

        const order = orders.find((order) => order._id === orderId)

        if (order) {
            order.items.forEach((item) => {
                const product = products.find(
                    (prod) => prod._id === item.product
                )

                const price = product.price
                const amount = item.amount
                totalPrice += price * amount
            })
        }
        return totalPrice.toFixed(2)
    }

    const getSubtotalOfProduct = (amount, price) => {
        return (amount * price).toFixed(2)
    }
    // -------------------------------------------

    // WHAT IF
    if (!orders || orders.length === 0) {
        return <Spinner />
    }
    if (!authUser) {
        navigate('/')
        return null
    }
    // -------------------------------------------

    return (
        <div className="profil min-h-screen max-h-full bg-white text-main ">
            <p className="bg-white text-center p-5">Welcome {authUser.email}</p>
            {orders.length > 0 && (
                <div className="bg-white text-center text-xl uppercase ">
                    You have {orders.length} orders:
                </div>
            )}

            <div className="orders">
                {orders.length === 0 ? (
                    <>
                        <p className="bg-details text-center p-10">
                            tour dates and store in the meanwhile?{' '}
                        </p>
                        <Info />
                    </>
                ) : (
                    orders.map((order) => {
                        const orderedProducts = order.items.map((item) => {
                            const product = products.find(
                                (prod) => prod._id === item.product
                            )
                            return {
                                ...product,
                                amount: item.amount,
                            }
                        })

                        return (
                            <div
                                key={order._id}
                                className="  pt-10 p-5 
                                sm:pb-20 sm:px-20"
                            >
                                <div
                                    className=" 
                                    flex  flex-col 
                                    p-2 sm:flex-row
                                    justify-between
                                 bg-details  text-main  "
                                >
                                    Order ID: {order._id.toUpperCase()}
                                </div>
                                {orderedProducts.map((product) => (
                                    <div className="flex  justify-between border-b py-4">
                                        <img
                                            className="
                                         h-20 w-20
                                         sm:h-40 sm:w-40"
                                            src={product.image}
                                            alt={product.title}
                                        />
                                        <div
                                            className=" text-sm
                                     flex flex-col "
                                        >
                                            <span className="font-extrabold">
                                                {product.title}
                                            </span>
                                            <span>{product.description}</span>
                                            <span>${product.price}</span>
                                            <span>{product.amount}</span>
                                        </div>

                                        <div className="flex flex-col">
                                            <span className=" pr-2 ">
                                                ${' '}
                                                {getSubtotalOfProduct(
                                                    product.price,
                                                    product.amount
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <p
                                    className="
                                 text-right
                                    font-bold text-greenish text-lg  pr-2"
                                >
                                    $ {calculateTotalPrice(order._id)}
                                </p>
                                <hr />
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default Profil
