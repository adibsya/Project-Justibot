import React from 'react'
import Hero from '../components/Home/Hero'
import Features from '../components/Home/Features'
import Tagline from '../components/Home/Tagline'

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