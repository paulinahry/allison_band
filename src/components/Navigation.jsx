import React from 'react'
import { useState } from 'react'
// ICONS
import { RxHamburgerMenu } from 'react-icons/rx'
import { AiOutlineClose } from 'react-icons/ai'

function Navigation() {
    const [updateMenu, setUpdateMenu] = useState(false)
    const [menu, setMenu] = useState(['tour', 'about', 'store'])

    const toggleMenu = () => {
        setUpdateMenu(!updateMenu)
    }

    return (
        <nav
            className="
        w-full h-20 md:h-[100]
        fixed flex justify-between items-center
         text-red-800 bg-black"
        >
            <RxHamburgerMenu
                className="cursor-pointer"
                size={45}
                onClick={toggleMenu}
            />

            <div></div>
        </nav>
    )
}

export default Navigation
