import React, { useEffect, useState } from 'react'
import CardProduct from '../components/CardProduct'
import { useSelector, useDispatch } from 'react-redux'
import { prodActions } from '../redux/slices/products'
import vinyl from '../assets/images/vinyl.jpg'
import Spinner from '../components/Spinner'

const Store = () => {
    const dispatch = useDispatch()
    const { cart } = useSelector((state) => state.cart)
    const { products, loaded } = useSelector((state) => state.prod)

    useEffect(() => {
        dispatch(prodActions.getProducts())
    }, [])

    if (!loaded) {
        return <Spinner size={20} />
    }
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

            <div className="flex flex-wrap justify-around p-2">
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
