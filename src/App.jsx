import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes,
    useNavigate,
    useLocation,
} from 'react-router-dom'

import { history } from 'src/helpers'
import Navigation from 'components/Navigation'
import Home from './pages/Home'
import Tour from './pages/Tour'
import Store from './pages/Store'
import Music from './pages/Music'
import Footer from 'components/Footer'
import Login from './pages/Login'
import Profil from './pages/Profil'
import Register from './pages/Register'
import ShoppingCart from './pages/ShoppingCart'
import ProductDetails from './pages/ProductDetails'

function App() {
    history.navigate = useNavigate()
    history.location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div id="root">
            <Navigation />
            <div
                className="content  pt-20 
            2xl:w-[70%] 2xl:my-0 2xl:mx-auto"
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tour" element={<Tour />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/store/:id" element={<ProductDetails />} />
                    <Route path="/music" element={<Music />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profil" element={<Profil />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/cart" element={<ShoppingCart />} />
                </Routes>
            </div>
            <Footer />
        </div>
    )
}

export default App
