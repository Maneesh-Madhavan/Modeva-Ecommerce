import React, { useRef } from 'react'
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
    <div>
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
    </div>
  )
}

export default Home
