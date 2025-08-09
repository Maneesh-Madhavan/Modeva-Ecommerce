import React from 'react'
import { assets } from '../assets/assets'

const Hero = ({ scrollToLatest, scrollToBestSeller }) => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      {/* Left Image → Best Sellers */}
      <img
        className='w-full sm:w-1/2 object-cover cursor-pointer'
        src={assets.hero_img2}
        alt="Hero Left"
        onClick={scrollToBestSeller}
      />
      {/* Right Image → Latest Collection */}
      <img
        className='w-full sm:w-1/2 object-cover cursor-pointer'
        src={assets.hero_img}
        alt="Hero Right"
        onClick={scrollToLatest}
      />
    </div>
  )
}

export default Hero
