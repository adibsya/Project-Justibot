import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Tagline from '../components/Tagline'

const Home = () => {
  return (
    <div className="min-h-screen"> {/* Added padding-top for fixed header */}
      <Hero/>
      <Tagline/>
      <Features/>
    </div>
  )
}

export default Home