import React from 'react'
import { useData } from '../context/UseContext'
import CardProduct from '../components/CardProduct'

const Store = () => {
    const { products, loading } = useData()

    return (
        <div className="store h-screen  b text-black  ">
            <div className="flex justi flex-col justify-center items-cente relative mb-20">
                <h1 className=" text-5xl md:text-6xl text-center  font-mono z-30 mt-7 text-detailsRed">
                    <span className="uppercase font-black ">Touch</span>{' '}
                    <span className="italic font-thin">the music</span>
                </h1>
                <div
                    className="p-3 border w-[50%] rounded-full bg-pink-500  sepia
                text-center
                absolute top-14 right-[24%]"
                >
                    <h2 className="font-mono font-bold">
                        allison #vinyl #store #records #merch
                    </h2>
                </div>
            </div>

            <div className="  flex flex-wrap  justify-center">
                {products.map((product) => (
                    <CardProduct key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default Store
