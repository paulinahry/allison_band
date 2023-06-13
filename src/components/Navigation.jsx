import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// ICONS
import { RxHamburgerMenu } from 'react-icons/rx'
import { AiOutlineClose } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { BsCart2 } from 'react-icons/bs'
import { useData } from '../context/UseContext'

function Navigation() {
    const { user } = useData
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()

    const [menuItems] = useState([
        { title: 'Home', path: '/' },
        { title: 'Tour', path: '/tour' },
        { title: 'Store', path: '/store' },
        { title: 'Music', path: '/music' },
        { title: 'Login', path: '/login' },
    ])

    const toggleMenu = () => {
        setIsMenuOpen((state) => !state)
    }

    const handleUserNavigate = () => {
        if (user) navigate('/profil')
        else navigate('/login')
    }
    const showCart = () => {
        console.log(user.userName)
    }

    return (
        <div className="flex fixed w-full  justify-between text-detailsRed  bg-black p-2">
            <nav className=" flex justify-between items-center z-50 mt-4 ">
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
            <div className="panel flex mt-6 cursor-pointer">
                <CgProfile
                    className="mr-3  "
                    size={32}
                    onClick={handleUserNavigate}
                />
                <BsCart2 className="ml-2" size={32} onClick={showCart} />
            </div>
        </div>
    )
}

export default Navigation
