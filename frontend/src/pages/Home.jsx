import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'

const Home = () => {
  return (
    <div className="min-h-screen"> {/* Added padding-top for fixed header */}
      <Hero/>
      <Features/>
    </div>
  )
}

export default Home