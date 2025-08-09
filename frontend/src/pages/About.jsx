import React from 'react'
import Title from '../components/Title'

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-10 py-8 text-gray-800">
      <div className="text-center mb-10">
        <Title text1="ABOUT" text2="MODEVA" />
        <p className="text-sm sm:text-base text-gray-500 mt-2">Fashion that feels like you.</p>
      </div>

      <div className="text-sm sm:text-base leading-relaxed space-y-10">
        <section>
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Our Story</h2>
          <p>
            Modeva was born out of a desire to simplify fashion. We wanted to create a space where timeless style meets everyday comfort a label that speaks not just to trends, but to personality. What started as a small design studio has grown into a global community of creators, curators, and customers who believe in the beauty of understated elegance.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Our Philosophy</h2>
          <p>
            We believe that fashion shouldn’t be complicated. At Modeva, each collection is a thoughtful curation of effortless silhouettes, elevated essentials, and refined statement pieces. Our designs are made to blend seamlessly into your wardrobe so you can wear them your way.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2 text-gray-700">What We Stand For</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Minimal yet expressive:</strong> Our designs are clean, confident, and bold without being loud.</li>
            <li><strong>People-first process:</strong> We prioritize comfort, quality, and thoughtful production.</li>
            <li><strong>Versatility:</strong> Each piece is designed to transition from day to night, season to season.</li>
            <li><strong>Purpose-driven fashion:</strong> We value authenticity and timeless style over fast trends.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Designed to Move With You</h2>
          <p>
            Whether you’re heading to work, walking through a gallery, or catching a sunset on the coast, Modeva outfits are built to move with your rhythm. Each fabric is chosen for its feel, each detail for its impact. We obsess over the small things so that you don’t have to.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2 text-gray-700">The Future of Modeva</h2>
          <p>
            We’re not just building a fashion label we’re creating a movement around slow style, personal expression, and elevated essentials. As we grow, we stay rooted in the values that started it all: design with intention, dress with ease, and inspire confidence in every form.
          </p>
        </section>

        <section className="text-center pt-8">
          <p className="italic text-gray-600">Welcome to Modeva — where fashion meets soul.</p>
        </section>
      </div>
    </div>
  )
}

export default About
