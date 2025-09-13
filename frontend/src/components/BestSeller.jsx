import React, { useState,useContext,useEffect } from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from './Title';
import ProductItem from "./ProductItem";

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestseller,setBestSeller] = useState([]);

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller));
        setBestSeller(bestProduct.slice(0,5))
     },[products])
  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className='w-3/4 m-auto text-sm sm:text-base md:text-lg -mt-2 text-gray-700 font-semibold tracking-wide'>
          Best-selling looks, just for you.
        </p>
      </div>
      <div  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 -mt-6">
         {
          bestseller.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
        }
      </div>

    </div>
  )
}

export default BestSeller
