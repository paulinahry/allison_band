import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'

import Navigation from './components/Navigation'
import Home from './pages/Home'
import Tour from './pages/Tour'
import Store from './pages/Store'
import Music from './pages/Music'
import Footer from './components/Footer'
import Login from './pages/Login'
import Profil from './pages/Profil'

function App() {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tour" element={<Tour />} />
                <Route path="/store" element={<Store />} />
                <Route path="/music" element={<Music />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profil" element={<Profil />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App
