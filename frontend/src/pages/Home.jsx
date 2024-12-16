import React from 'react'
import Hero from '../components/Home/Hero'
import RecentlyAdded from '../components/Home/RecentlyAdded'
import PopularBooks from '../components/Home/PopularBooks'
//import RecommenedBooks from '../components/Home/RecommenedBooks'

const Home = () => {
  return (
    <div className='bg-zinc-900 text-white px-10 py-8'>
        <Hero /> 
        <RecentlyAdded />
        <PopularBooks />
        {/* <RecommenedBooks /> */}

    </div>
  )
}
// 
export default Home