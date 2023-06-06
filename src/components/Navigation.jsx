import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
// ICONS
import { RxHamburgerMenu } from 'react-icons/rx'
import { AiOutlineClose } from 'react-icons/ai'

function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [menuItems] = useState([
        { title: 'Home', path: '/' },
        { title: 'Tour', path: '/tour' },
        { title: 'Store', path: '/store' },
        { title: 'Music', path: '/music' },
    ])

    const toggleMenu = () => {
        setIsMenuOpen((state) => !state)
    }

    return (
        <nav className="w-full h-20 md:h-[100] fixed flex justify-between items-center text-detailsRed bg-black z-50">
            {isMenuOpen ? (
                <AiOutlineClose
                    className="cursor-pointer"
                    size={45}
                    onClick={toggleMenu}
                />
            ) : (
                <RxHamburgerMenu
                    className="cursor-pointer"
                    size={45}
                    onClick={toggleMenu}
                />
            )}

            {isMenuOpen && (
                <div
                    className="fixed top-20 right-0 
                    flex flex-col justify-center align-center
        h-screen w-screen bg-black 
        opacity-90 
        items-center"
                >
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className=" text-detailsRed uppercase text-4xl font-extrabold py-8"
                            onClick={toggleMenu}
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    )
}

export default Navigation
