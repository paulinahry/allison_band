import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// ICONS
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineClose } from 'react-icons/ai';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems] = useState([
    { title: 'Home', path: '/' },
    { title: 'Tour', path: '/tour' },
    { title: 'Store', path: '/store' }
  ]);

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
        <div className="fixed top-0 right-0 
        h-screen w-screen bg-gray-800 
        opacity-70 
        flex flex-col items-center">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="text-white text-xl py-4"
              onClick={toggleMenu}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navigation;
