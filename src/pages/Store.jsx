import React from 'react'
import { useData } from '../context/UseContext'
import CardProduct from '../components/CardProduct'
import Spinner from '../components/Spinner'

const Store = () => {
    const { products, loading } = useData()

    return (
        <div className="store h-screen">
            <h2 className="uppercase text-xxl">Products</h2>
            {products.map((product) => (
                <CardProduct key={product._id} product={product} />
            ))}
        </div>
    )
}

export default Store
