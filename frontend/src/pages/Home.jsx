import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  const latestRef = useRef(null)
  const bestSellerRef = useRef(null)

  const scrollWithOffset = (ref) => {
    const offset = 60 // Adjust based on your fixed navbar height
    const elementPosition = ref.current.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Hero
        scrollToLatest={() => scrollWithOffset(latestRef)}
        scrollToBestSeller={() => scrollWithOffset(bestSellerRef)}
      />

      <div ref={latestRef}>
        <LatestCollection />
      </div>

      <div ref={bestSellerRef}>
        <BestSeller />
      </div>

      <OurPolicy />
      <NewsletterBox />
    </motion.div>
  )
}

export default Home
