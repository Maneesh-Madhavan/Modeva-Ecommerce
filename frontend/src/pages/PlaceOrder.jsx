import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
  const [method,setMethod] = useState('cod');
  const {navigate} = useContext(ShopContext)
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-6 pt-4 sm:pt-8 min-h-[80vh] px-4 sm:px-8'>

      {/* LEFT SIDE - Delivery Form */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First name' />
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last name' />
        </div>
        <input type="email" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email address' />
        <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' />
        <div className='flex gap-3'>
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' />
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input type="number" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='ZIP code' />
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Country' />
        </div>
      </div>

      {/* RIGHT SIDE - Cart Summary & Payment */}
      <div className='flex flex-col gap-8 w-full sm:max-w-[480px]'>
        <CartTotal />

        <div>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex flex-col sm:flex-row gap-3 mt-2'>
            <div onClick={()=>setMethod('stripe')}  className='flex items-center gap-3 border p-2 px-3 cursor-pointer w-full sm:w-auto'>
              <p className={`min-w-[14px] h-[14px] border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5' src={assets.stripe_logo} alt="Stripe" />
            </div>

            <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer w-full sm:w-auto'>
              <p className={`min-w-[14px] h-[14px] border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5' src={assets.razorpay_logo} alt="Razorpay" />
            </div>

            <div  onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer w-full sm:w-auto'>
              <p className={`min-w-[14px] h-[14px] border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium'>Cash on Delivery</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button onClick={()=>navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER

            </button>

          </div>

        </div>
      </div>

    </div>
  );
};

export default PlaceOrder;
