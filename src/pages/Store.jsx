import React from 'react'
import { useProduct } from '../context/useProduct'

import CardProduct from 'components/CardProduct'

const Store = () => {
    const { products } = useProduct()
    // const { user } = useUser()

    if (!products) {
        return <div>nope...</div>
    }

    return (
        <div className="store">
            <div className="bg-white absolute top-10 right-2 w-20 h-20">
                {/* {user.cart.length} */}
            </div>
            <h2>Products</h2>
            {products.map((product) => (
                <CardProduct key={product._id} product={product} />
            ))}
        </div>
    )
}

export default Store
