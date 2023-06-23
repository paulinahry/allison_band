import React from 'react'
import UpcomingEvents from '../components/UpcomingEvents'
import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { authActions } from '../redux/slices/auth'
import Spinner from './Spinner'

function Info() {
    const { products } = useSelector((s) => s.prod)
    const authUser = useSelector((s) => s.auth.user)
    if (!products) return <Spinner />

    const submitLogout = () => {
        dispatch(authActions.logout())
    }

    const submitLogin = () => {
        dispatch(authActions.logout())
    }

    return (
        <div className="h-full bg-white">
            <div className="uppercase flex  justify-around border-b p-2">
                <Link className="w-fit" to="/">
                    Home
                </Link>
                <Link className="w-fit" to="/store">
                    Store
                </Link>

                {authUser ? (
                    <Link className="w-fit" onClick={submitLogout}>
                        Logout
                    </Link>
                ) : (
                    <Link className="w-fit" onClick={submitLogin}>
                        Log in
                    </Link>
                )}
            </div>
            <UpcomingEvents />
            <div>
                <div className="flex flex-wrap justify-around bg-gray-200 p-5">
                    {products.map((product) => (
                        <CardProduct key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Info
