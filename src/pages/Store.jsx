import React, { useEffect } from 'react'
import CardProduct from '../components/CardProduct'
import { useSelector, useDispatch } from 'react-redux'
import { prodActions } from '../redux/slices/products'
import { cartActions } from '../redux/slices/cart'
import { authActions } from '../redux/slices/auth'
import Spinner from '../components/Spinner'
import vinyl from '../assets/images/vinyl.jpg'

const Store = () => {
    const dispatch = useDispatch()
    const { cart } = useSelector((s) => s.cart)
    const authUser = useSelector((s) => s.auth.user)
    const { products, loaded } = useSelector((s) => s.prod)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (!loaded) {
            dispatch(prodActions.getProducts())
        }
    }, [])

    const handleAddToCart = (id) => {
        dispatch(cartActions.addToCart({ id }))
    }

    return (
        <div className="store pb-10 bg-gray-200 text-main">
            <div className="flex flex-col justify-center items-center relative mb-20">
                <div
                    style={{ backgroundImage: `url(${vinyl})` }}
                    className="h-[400px] w-full bg-cover bg-center flex items-center justify-center"
                >
                    <h1 className="text-5xl md:text-6xl text-center font-mono z-30 mt-8 text-detailsRed">
                        <span className="uppercase font-black text-details">
                            Touch
                        </span>{' '}
                        <span className="italic font-thin text-yellowish/40">
                            the{' '}
                        </span>
                        <span className="italic font-thin text-yellowish">
                            music
                        </span>
                    </h1>
                    <div className="p-5 w-[100%] bg-white/60 text-center absolute top-56">
                        <h2 className="font-mono font-bold">
                            allison #vinyl #store #records #merch
                        </h2>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap justify-center">
                {products.map((product) => (
                    <CardProduct
                        key={product._id}
                        product={product}
                        onClick={() => handleAddToCart(product._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Store
