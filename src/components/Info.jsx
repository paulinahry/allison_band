import React from 'react'
import UpcomingEvents from '../components/UpcomingEvents'
import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { authActions } from '../redux/slices/auth'
import Spinner from './Spinner'

function Info() {
    const { products } = useSelector((s) => s.prod)
    if (!products) return <Spinner />

    return (
        <div className="h-full bg-white">
            <UpcomingEvents />
            <div className="flex flex-wrap justify-around bg-gray-200 p-5">
                {products.map((product) => (
                    <CardProduct key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default Info
