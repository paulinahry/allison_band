import React from 'react';
import { useState } from 'react';
// ICONS
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineClose } from 'react-icons/ai';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems] = useState(['tour', 'about', 'store']);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full h-20 md:h-[100] fixed flex justify-between items-center text-red-800 bg-black">
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
        <div className="flex">
          {menuItems.map((item, index) => (
            <span key={index} className="px-4 py-2">
              {item}
            </span>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navigation;
