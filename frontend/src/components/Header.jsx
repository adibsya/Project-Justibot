import React from 'react'
import { assets } from '../assets/assets'
import { Link,NavLink } from 'react-router-dom'
import { Button } from 'flowbite-react'
import {HiUserCircle} from 'react-icons/hi'

const Header = () => {

  return (
    <div className='flex items-center justify-between bg-white py-2 px-8 md:px-16 drop-shadow-md'>
      {/* logo */}
      <Link to={'/'} >
        <div className='flex items-center gap-2 hover:scale-90 transition-all'>
            <img src={assets.logo} className='w-[55px] h-[55px] ' alt="logo" />
            {/* <span className='font-serif text-2xl'>JustiBot</span> */}
        </div>
      </Link>

      {/* Navlink */}
      <ul className='hidden lg:flex  items-center gap-6 font-serif text-base'>
        <li className='px-3 py-1.5 hover:bg-[#B9AB99] rounded-full transition-all cursor-pointer'>
          <NavLink to={'/'}>
            <p>Beranda</p>
          </NavLink>
        </li>
        <li className='px-3 py-1.5 hover:bg-[#B9AB99] rounded-full transition-all cursor-pointer'>
          <NavLink to={'/chatbot'}>
            <p>Konsultasi AI</p>
          </NavLink>
        </li>
        <li className='px-3 py-1.5 hover:bg-[#B9AB99] rounded-full transition-all cursor-pointer'>
          <NavLink to={'/document'}>
            <p>Dokumen Hukum</p>
          </NavLink>
        </li>
        <li className='px-3 py-1.5 hover:bg-[#B9AB99] rounded-full transition-all cursor-pointer'>
          <NavLink to={'/lawyer'}>
            <p>Direktori Pengacara</p>
          </NavLink>
        </li>
      </ul>

      {/* button login/signup */}
      <Link to=''>
        <Button className=' bg-[#B9AB99] text-black font-serif rounded-full w-36'>
          <HiUserCircle className="mr-2 h-5 w-5 " />
          Login / SignUp
        </Button>
      </Link>
    </div>
  )
}

export default Header