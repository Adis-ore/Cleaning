import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewLetter from '../components/NewLetter'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact} className='md:max-w-[480px] w-full' alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>No 7 Oluyoro street, <br />  off Awolowo Avenue old Bodija Ibadan, Oyo state, Nigeria</p>
          <p className='text-gray-500'>Tel: +234 8020776686 <br /> Email: speedtouchcleaning@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Speedtouch</p>
          <p className='text-gray-500'>Learn more about our teams and job openings</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer'>Explore Jobs</button>
        </div>
      </div>
      < NewLetter/>
    </div>
  )
}

export default Contact