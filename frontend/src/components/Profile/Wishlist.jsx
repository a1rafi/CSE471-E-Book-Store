import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';


const Wishlist = () => {
  const [wishlist, setWishlist] = useState();
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:3000/api/user/get-favourite-books", { headers });
      console.log(response);
      setWishlist(response.data.data);
    };
    fetch();
  }, [wishlist]);

  return (
    <>
     <div className='grid grid-cols-4 gap-4'>
      {wishlist && wishlist.length === 0 && (
          <div className='col-span-4 text-5xl w-full h-[100%] font-semibold text-zinc-500 mt-20 flex flex-col items-center justify-center'>
              No Wished Books
              <img src="https://i.ibb.co/wcSdGdK/fav.png" alt="star img" className='h-[20vh] my-8'/>
          </div>
      )}
      {wishlist && wishlist.map((items, i) => (
          <div key={i}>
              <BookCard data={items} wishlist={true} />
          </div>
      ))}
  </div>
      </>
    )
  };

export default Wishlist;