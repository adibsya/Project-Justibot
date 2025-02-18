import React, { useState } from 'react';
import { assets } from '../assets/assets';
import {NavLink, Link} from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header className="bg-[#612A22] fixed top-0 left-0 w-full z-50 shadow-md font-medium">
        <nav className="container mx-auto px-2 py-3 flex items-center justify-between">
          <div className="text-white font-bold">
            <Link to={'/'}>
              <img src={assets.logo} alt="Logo" className="w-16" />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-8 text-white ">
              <li>
                <NavLink to='/' className='transition duration-300 ease-in-out hover:text-gray-300 relative after:block after:h-0.5 after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full'>
                  <p>Home</p>
                </NavLink>
              </li>
              <li>
                <NavLink to='/chatbot' className='transition duration-300 ease-in-out hover:text-gray-300 relative after:block after:h-0.5 after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full'>
                  <p>Chatbot</p>
                </NavLink>
              </li>
              <li>
                <NavLink to='/document' className='transition duration-300 ease-in-out hover:text-gray-300 relative after:block after:h-0.5 after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full'>
                  <p>Document</p>
                </NavLink>
              </li>
              <li>
                <NavLink to='/lawyer' className='transition duration-300 ease-in-out hover:text-gray-300 relative after:block after:h-0.5 after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full'>
                  <p>Lawyer</p>
                </NavLink>
              </li>
            </ul>
            <Link to='/login' className='flex justify-between ml-4 px-4 py-2 bg-[#B9AB99] text-black rounded-full transition duration-300 ease-in-out hover:bg-gray-200'>
                <img src={assets.user_icon} className='w-4 mr-2'/>
                <p>Login/Signup</p>
            </Link>
            
          </div>
          <div className="md:hidden flex items-center">
           <Link to='/login' className='flex justify-between ml-4 px-4 py-2 bg-[#B9AB99] text-black rounded-full'>
                <img src={assets.user_icon} className='w-4 mr-2'/>
                <p>Login/Signup</p>
            </Link>
            <button onClick={toggleMenu} className="outline-none ml-6">
              <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                )}
              </svg>
            </button>
          </div>
        </nav>
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-[#612A22] p-5 rounded-lg text-center`}> 
          <ul className="space-y-4">
            <li><a href="/" className="block px-4 py-2 text-white transition duration-300 ease-in-out hover:text-gray-300">Home</a></li>
            <li><a href="/chatbot" className="block px-4 py-2 text-white transition duration-300 ease-in-out hover:text-gray-300">Chatbot</a></li>
            <li><a href="/document" className="block px-4 py-2 text-white transition duration-300 ease-in-out hover:text-gray-300">Document</a></li>
            <li><a href="lawyer" className="block px-4 py-2 text-white transition duration-300 ease-in-out hover:text-gray-300">Lawyer</a></li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
