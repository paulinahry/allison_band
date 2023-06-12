import React from 'react'
import { useData } from '../context/UseContext'
import CardProduct from 'components/CardProduct'
import Spinner from '../components/Spinner'

const Store = () => {
    const { products } = useData()
    const [isLoading, setIsLoading] = useContext(false)

    if (!products) {
        return <div>We are sorry! Store is not available now.</div>
    } else if (products.isLoading) <Spinner />

    return (
        <div className="store">
            <h2 className="uppercase text-xxl">Products</h2>
            {products.map((product) => (
                <CardProduct key={product._id} product={product} />
            ))}
        </div>
    )
}

export default Store
