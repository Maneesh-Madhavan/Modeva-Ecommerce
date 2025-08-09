import React from 'react'

const NewsletterBox = () => {
  const onSubmitHandler = (event) =>{
    event.preventDefault();
  }
  return (
    <div className='text-center'>
  <p className='text-2xl font-medium text-gray-800'>Subscribe & Get 20% Off</p>
  <p className='text-gray-400 mt-3'>Join our mailing list for exclusive offers and updates.</p>
  <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 mx-auto my-6 border-2 border-gray-300 focus-within:border-[#4D3B4C] flex items-center gap-3 pl-3 transition-colors duration-200'>
    <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required/>
    <button type='submit' className='bg-[#4D3B4C] text-white text-xs px-10 py-4 font-semibold'>SUBSCRIBE</button>
  </form>
</div>

  )
}

export default NewsletterBox
