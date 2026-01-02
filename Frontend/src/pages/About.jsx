import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewLetter from '../components/NewLetter'
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about} className='w-full md:max-w-[450px]' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p className=''>At SpeedTouch Cleaning and Hygiene Service, we believe that a clean space is a healthy space. We're committed to delivering top-tier cleaning solutions that not only refresh your environment but also promote well-being and peace of mind.</p>
          <p className=''>With a passion for excellence and a keen eye for detail, our team is trained to handle residential, commercial, and specialized cleaning services — from deep-cleaning and disinfection to routine maintenance and hygiene care. We use eco-friendly products and modern tools to ensure every corner shines without compromise.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>To deliver fast, reliable, and top-quality cleaning and hygiene services that elevate living and working environments. At SpeedTouch, we are driven by excellence, guided by integrity, and committed to creating healthier spaces—one touch at a time.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border pax-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600' >At SpeedTouch, quality isn’t an option — it’s a standard. Every service we provide is backed by strict quality checks and a commitment to excellence. From the products we use to the care we take, our goal is to exceed expectations, not just meet them.</p>
        </div>
        <div className='border pax-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Eco-Friendly Products:</b>
          <p  className='text-gray-600'>We care about your health and the environment — that’s why we use safe, non-toxic, and effective cleaning solutions.</p>
        </div>
        <div className='border pax-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Affordable Excellence:</b>
          <p className='text-gray-600'>Premium service doesn’t have to come with a premium price. We offer competitive rates without compromising quality. </p>
        </div>
      </div>
      <NewLetter />
    </div>
  )
}

export default About