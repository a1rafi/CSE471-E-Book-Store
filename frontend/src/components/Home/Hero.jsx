import React from 'react'

const Hero = () => {
  return (
    <div className='h-[75vh] flex'>
        <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
         <h1 className='text-4xl lg:text-4xl font-semibold text-yellow-100 text-center lg:text-left'>
            Read explore and enhance your knowledge
            </h1>
            <p className='mt-4 tetx-xl text-zinc-300 text-center lg:text-left'>Uncover captivating stories , enrich knowledge , and endless inspiration in our curated collection of book </p>
             <div className='mt-8'></div>
             <div><button className='text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-2 hover:bg-zinc-800 rounded-full'>Discover Books</button></div>
            </div>
        <div className='w-full lg:w-3/6'>
        <img src="./book.jpg" alt="hero"/>        </div>
    </div>
  )
}

export default Hero