import React from 'react'
import UpcomingEvents from '../components/UpcomingEvents'
import CardProduct from '../components/CardProduct'
import { prodActions } from '../redux/slices/products'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Spinner from './Spinner'

function Info() {
    const { products } = useSelector((s) => s.prod)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(prodActions.getProducts())
    }, [])

    if (!products || products.length === 0 || products === null)
        return (
            <>
                <p className="text-center">Shop loading...</p>
                <Spinner />
            </>
        )

    return (
        <div className="h-full bg-white">
            <UpcomingEvents />
            <div className="flex flex-wrap justify-center bg-gray-200 p-5">
                {products.map((product) => (
                    <CardProduct key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default Info
