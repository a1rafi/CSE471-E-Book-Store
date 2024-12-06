import React from 'react'
import {Link} from "react-router-dom";

const MobileNav = () => {
  return (
    <div className='w-full items-center justify-between my-4'><Link
    to = "/profile"
    className='text-zinc-100 font-semibold w-full   text-center hover:bg-zinc-900 rounded transition-all duration-300'
    >
        Wishlist
</Link>
<Link
    to = "/profile/orderHistory"
    className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300'
    >
        Order History
</Link>
<Link
    to = "/profile/settings"
    className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300'
    >
        Settings
</Link></div>
  )
}

export default MobileNav