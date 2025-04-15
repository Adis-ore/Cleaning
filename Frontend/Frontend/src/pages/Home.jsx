import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import OurPolicies from '../components/OurPolicies'
import NewLetter from '../components/NewLetter'

const Home = () => {
  return (
    <div className=''>
      <Hero/>
      <LatestCollection/>
      <OurPolicies/>
      <NewLetter/>
    </div>
  )
}

export default Home