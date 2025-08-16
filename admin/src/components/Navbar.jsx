import React from 'react'
import {assets} from '../assets/assets'

const Navbar = () => {
  return (
  <div  className='flex items-center py-2 px-[2%] justify-between'>
    <img className='w-[max(13%,90px)]' src={assets.logo} alt="" />
  <button 
  onClick={() => setToken('')} 
  className="border border-[#5A4A5E] text-[#5A4A5E] hover:bg-[#5A4A5E] hover:text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm transition-colors duration-200"
>
  Logout
</button>

  </div>)
}

export default Navbar