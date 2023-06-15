import React, { useEffect } from 'react'
import CardProduct from '../components/CardProduct'
import { useSelector, useDispatch } from 'react-redux'
import { prodActions } from '../redux/slices/products'
import Spinner from '../components/Spinner'

import vinyl from '../assets/images/vinyl.jpg'

const Store = () => {
    const dispatch = useDispatch()
    const { products, loaded } = useSelector((s) => s.prod)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (!loaded) {
            dispatch(prodActions.getProducts())
        }
    }, [])

    if (!loaded) {
        return <Spinner size={20} />
    }

    return (
        <div className="store pb-10 bg-gray-200 text-main h-screen">
            <div className="flex justi flex-col justify-center items-cente relative mb-20">
                <div
                    style={{ backgroundImage: `url(${vinyl})` }}
                    className="h-[400px]  bg-cover bg-center  flex items-center justify-center"
                >
                    <h1 className="text-5xl md:text-6xl text-center font-mono z-30 mt-8 text-detailsRed">
                        <span className="uppercase font-black text-details decoration-white">
                            Touch
                        </span>{' '}
                        <span className="italic font-thin text-yellowish/40">
                            the{' '}
                        </span>
                        <span className="italic font-thin text-yellowish decoration-white">
                            {' '}
                            music
                        </span>
                    </h1>

                    <div className="p-5 w-[50%] rounded-full bg-yellowish/50 text-center absolute top-56 right-[24%]">
                        <h2 className="font-mono font-bold">
                            allison #vinyl #store #records #merch
                        </h2>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap justify-center">
                <div className="flex flex-wrap justify-center">
                    {products.map((product) => (
                        <ul key={product._id}>
                            <li>{product.title}</li>
                            <li>{product.price}</li>
                            <li>{product.image}</li>
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Store
