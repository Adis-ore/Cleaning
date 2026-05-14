import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className='inline-flex flex-col items-center gap-2 mb-4'>
      <p className='text-2xl sm:text-3xl font-black uppercase tracking-widest text-[#1A1A2E]'>
        {text1} <span className='text-[#159be3]'>{text2}</span>
      </p>
      <div className='flex items-center gap-2'>
        <div className='w-8 h-[2px] bg-[#f6e5b7]'></div>
        <div className='w-2 h-2 rounded-full bg-[#159be3]'></div>
        <div className='w-8 h-[2px] bg-[#f6e5b7]'></div>
      </div>
    </div>
  )
}

export default Title
