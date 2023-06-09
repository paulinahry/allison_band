import React from 'react'
import { useProduct } from '../context/useProduct'

import CardProduct from '../components/CardProduct'

const Store = () => {
    const { products } = useProduct()

    if (!products) {
        return <div>nope...</div>
    }

    return (
        <div className="store">
            <h2>Products</h2>
            {products.map((product) => (
                <CardProduct key={product._id} product={product} />
            ))}
        </div>
    )
}

export default Store
