import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'

import Navigation from './components/Navigation'
import Home from './pages/Home'
import Tour from './pages/Tour'
import Store from './pages/Store'
import Footer from './components/Footer'

function App() {
    return (
        <Router>
            <Navigation />
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/tour">Tour</Link>
                </li>
                <li>
                    <Link to="/store">Store</Link>
                </li>
            </ul>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tour" element={<Tour />} />
                <Route path="/store" element={<Store />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App
