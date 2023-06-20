import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../redux/store'

// ICONS
import { RxHamburgerMenu } from 'react-icons/rx'
import { AiOutlineClose } from 'react-icons/ai'
import { IoIosLogOut } from 'react-icons/io'
import { CgProfile } from 'react-icons/cg'
import { BsCart2 } from 'react-icons/bs'
import { cartActions } from '../redux/slices/cart'

function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const authUser = useSelector((s) => s.auth.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const menuItems = [
        { title: 'Home', path: '/' },
        { title: 'Tour', path: '/tour' },
        { title: 'Store', path: '/store' },
        { title: 'Music', path: '/music' },
    ]

    if (authUser) {
        menuItems.push({ title: 'Logout', path: '/logout' })
    } else {
        menuItems.push({ title: 'Login', path: '/login' })
    }

    const toggleMenu = () => {
        setIsMenuOpen((state) => !state)
    }

    const handleUserNavigate = () => {
        if (authUser) navigate('/profil')
        else navigate('/login')
    }
    const navigateToCart = () => {
        navigate('/cart')
    }
    const submitLogout = () => {
        dispatch(authActions.logout())
    }

    return (
        <div className="flex fixed w-full  justify-between text-details  bg-main p-2 z-50">
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
                        className="fixed top-[72px] right-0 
        flex flex-col justify-center align-center
        h-screen w-screen bg-main
        opacity-90 
        items-center"
                    >
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                className="text-details uppercase text-4xl font-extrabold py-8"
                                onClick={
                                    item.title === 'Logout'
                                        ? submitLogout
                                        : toggleMenu
                                }
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
            <div className="panel flex mt-6 cursor-pointer items-center ">
                <CgProfile
                    className="mx-1"
                    size={32}
                    onClick={handleUserNavigate}
                />

                <BsCart2 className="mx-1" size={32} onClick={navigateToCart} />

                {authUser ? (
                    <IoIosLogOut size={32} onClick={submitLogout} />
                ) : (
                    <p
                        className="underline uppercase"
                        onClick={handleUserNavigate}
                    >
                        log in
                    </p>
                )}
            </div>
        </div>
    )
}

export default Navigation
