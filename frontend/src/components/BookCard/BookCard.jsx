import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookCard = ({data, wishlist}) => {
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    const response = await axios.put("http://localhost:3000/api/user/remove-book-from-favourite",
      {},
      { headers });
    alert(response.data.message);
  };


  return (
  <>
 <Link to={`/view-book-details/${data._id}`}>

  <div className='bg-zinc-800 rounded p-4 flex flex-col'>
    <div className='bg-zinc-900 rounded flec items-center justify-center'>
        <img src={data.url} alt ={data.title} className='h-[30vh]'/>
    </div>
    <h2 className='mt-4 text-xl  font-semibold'>
        {data.title}
    </h2>
    <p className='mt-2 text-zinc-400 font-semibold'>by {data.author}</p>
    <p className='mt-2 text-zinc-200 font-semibold text-xl'>{data.price} tk</p>
    <p className='mt-2 text-zinc-400 font-semibold'>{data.language}</p>
  </div>
  </Link>
  {wishlist && (
    <button className='bg-yellow-100 px-4 py-2 rounded border border-yellow-500 text-yellow-500'
    onClick={handleRemoveBook}>
      Remove from Wishlist
    </button>)}
  </>
   
  ); 
}

export default BookCard