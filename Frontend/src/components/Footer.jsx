import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.speedtouch} className='mb- w-32' alt="" />
                <p className='w-full md:w-2/3 text-gray-600 '>At Speedtouch, we specialize in professional cleaning services designed to make life easier, healthier, and more comfortable for families and businesses. With a focus on speed, reliability, and attention to detail, our team is committed to delivering exceptional results that refresh every space and exceed expectations.</p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col  text-gray-600 gap-1' >
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col  text-gray-600 gap-1'>
                    <li>+243 8020776686</li>
                    <li>oretomiwa20@gmail.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@ speedtouch.com - All right Reseverd</p>
        </div>
    </div>
  )
}

export default Footer