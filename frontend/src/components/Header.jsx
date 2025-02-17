import React from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { HiUserCircle } from 'react-icons/hi';

const Header = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className='flex items-center justify-between bg-white p-4 sm:px-6 lg:px-28'>
      {/* logo */}
      <Link to={'/'}>
        <div className='flex items-center gap-2 hover:scale-90 transition-all'>
          <img src={assets.logo} className='w-10 h-10 sm:w-12 sm:h-12 lg:w-[55px] lg:h-[55px]' alt='logo' />
        </div>
      </Link>

      {/* Navlink */}
      <ul className='hidden lg:flex items-center gap-4 font-serif text-base'>
        <li className='px-3 py-1.5 hover:text-[#612A22] rounded-full transition-all cursor-pointer'>
          <NavLink to={'/'} className='flex flex-col items-center'>
            <p>Beranda</p>
            <hr className='w-2/3 h-[2px] border-none bg-[#612A22] hidden' />
          </NavLink>
        </li>
        <li className='px-3 py-1.5 hover:text-[#612A22] rounded-full transition-all cursor-pointer'>
          <NavLink to={'/chatbot'} className='flex flex-col items-center'>
            <p>Konsultasi AI</p>
            <hr className='w-2/3 h-[2px] border-none bg-[#612A22] hidden' />
          </NavLink>
        </li>
        <li className='px-3 py-1.5 hover:text-[#612A22] rounded-full transition-all cursor-pointer'>
          <NavLink to={'/document'} className='flex flex-col items-center'>
            <p>Dokumen hukum</p>
            <hr className='w-2/3 h-[2px] border-none bg-[#612A22] hidden' />
          </NavLink>
        </li>
        <li className='px-3 py-1.5 hover:text-[#612A22] rounded-full transition-all cursor-pointer'>
          <NavLink to={'/lawyer'} className='flex flex-col items-center'>
            <p>Direktori Pengacara</p>
            <hr className='w-2/3 h-[2px] border-none bg-[#612A22] hidden' />
          </NavLink>
        </li>
      </ul>

      <div className='flex items-center gap-3 sm:gap-5'>
        {/* button login/signup */}
        <Link to=''>
          <Button className='bg-[#B9AB99] text-black font-serif rounded-full w-40 sm:w-40 lg:w-40 h-9 sm:h-9 lg:h-10 hover:scale-95'>
            <HiUserCircle className='mr-2 h-5 w-5' />
            <p>Login / SignUp</p>
          </Button>
        </Link>
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-6 cursor-pointer lg:hidden' alt='' />
      </div>

      {/* sidebar for small screens */}
      <div className={`fixed inset-0 bg-white transition-transform ${visible ? 'translate-x-0' : 'translate-x-full'} overflow-hidden`}>
        <div className='flex flex-col text-black'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='' />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
