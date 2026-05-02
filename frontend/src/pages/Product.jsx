import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Product = () => {
  const { productId } = useParams();
  const { products,currency,addToCart, userName, token, backendUrl } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size,setSize] = useState('')
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);

  const fetchProductData = async () => {
    // 1. Instantly load from context for fast UI
    const localProduct = products.find(item => item._id === productId);
    if (localProduct) {
      setProductData(localProduct);
      setImage(localProduct.image[0]);
      setReviews(localProduct.reviews || []);
    }

    // 2. Fetch fresh data from backend to get updated reviews
    try {
      const response = await axios.post(backendUrl + '/api/product/single', { productId });
      if (response.data.success) {
        setProductData(response.data.product);
        setReviews(response.data.product.reviews || []);
      }
    } catch (error) {
      console.log("Error fetching fresh product data:", error);
    }
  }
  
  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login to add a review");
      return;
    }
    if(newReview.trim()) {
      try {
        const response = await axios.post(
          backendUrl + '/api/product/review',
          { productId, rating, comment: newReview },
          { headers: { token } }
        );
        if (response.data.success) {
          setReviews(response.data.reviews);
          setNewReview('');
          setRating(5);
          toast.success("Review added successfully");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  }

  return productData ? (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='pt-10'
    >
      {/* product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* product image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border hover:border-[#4D3B4C] transition' alt=''></img>
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <motion.img 
              key={image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className='w-full h-auto rounded-lg' 
              src={image} 
              alt="" 
            />
          </div>
        </div>
        {/* product info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2 text-[#4D3B4C]'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-[#997db0] text-[#997db0]' : 'text-gray-300'}`} />
            ))}
            <p className='pl-2 text-gray-500'>({reviews.length} reviews)</p>
          </div>
          <p className='mt-5 text-3xl font-medium text-[#4D3B4C]'>
            {currency}{productData.price}
          </p>
          <p className='mt-5 text-gray-500 md:2-4/5 leading-relaxed'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p className='font-medium text-gray-700'>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)}  className={`border py-2 px-4 rounded-md transition-all ${item === size ? 'bg-[#997db0] text-white border-[#997db0]' : 'bg-gray-50 text-gray-700 hover:border-[#997db0]'}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className='bg-[#4D3B4C] hover:bg-[#382b37] transition-colors text-white px-8 py-3 text-sm rounded-md shadow-md active:scale-95'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5 border-gray-200'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-2'>
            <p className='flex items-center gap-2'><span className='w-2 h-2 rounded-full bg-green-500'></span> Cash on delivery is available for this product.</p>
            <p className='flex items-center gap-2'><span className='w-2 h-2 rounded-full bg-blue-500'></span> Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      
      {/* review and description */}
      <div className='mt-20'>
        <div className='flex border-b border-gray-200'>
          <button 
            onClick={() => setActiveTab('description')}
            className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'description' ? 'border-b-2 border-[#997db0] text-[#4D3B4C]' : 'text-gray-500 hover:text-[#997db0]'}`}
          >
            Description
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'reviews' ? 'border-b-2 border-[#997db0] text-[#4D3B4C]' : 'text-gray-500 hover:text-[#997db0]'}`}
          >
            Reviews ({reviews.length})
          </button>
        </div>
        
        <div className='py-6 text-sm text-gray-600'>
          {activeTab === 'description' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='leading-relaxed'>
              <p>{productData.description}</p>
              <p className='mt-4'>This premium product is designed to meet the highest standards of quality and comfort. Suitable for both casual and formal occasions.</p>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='flex flex-col gap-6'>
              {/* Review Form */}
              <form onSubmit={handleAddReview} className='mb-6 p-4 border border-gray-100 rounded-lg bg-gray-50'>
                <h4 className='text-[#4D3B4C] font-medium mb-3'>Write a Review</h4>
                <textarea 
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#997db0]' 
                  rows="3" 
                  placeholder="Share your thoughts about this product..."
                  required
                ></textarea>
                <button type="submit" className='mt-3 bg-[#997db0] text-white px-6 py-2 rounded-md hover:bg-[#866aa0] transition-colors'>Submit Review</button>
              </form>

              {/* Reviews List */}
              {reviews.map(review => (
                <div key={review.id} className='border-b border-gray-100 pb-4'>
                  <div className='flex items-center gap-2 mb-1'>
                    <div className='w-8 h-8 rounded-full bg-[#4D3B4C] text-white flex items-center justify-center font-bold'>
                      {review.name ? review.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <p className='font-medium text-gray-800'>{review.name || 'Anonymous User'}</p>
                      <div className='flex items-center gap-1'>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-[#997db0] text-[#997db0]' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <span className='ml-auto text-xs text-gray-400'>{review.date}</span>
                  </div>
                  <p className='mt-2 text-gray-600 pl-10'>{review.comment}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* related products */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>
    </motion.div>
  ) : (
    <div className='flex justify-center items-center h-64'>
       <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#997db0]'></div>
    </div>
  )
}

export default Product
