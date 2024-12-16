import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GrLanguage } from 'react-icons/gr';
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import CommentForm from '../CommentForm/CommentForm';
import CommentList from '../CommentList/CommentList';
import RatingForm from '../RatingForm/RatingForm';


const ViewBookDetails = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  console.log(id);
  const [Data, setData] = useState();
  const [averageRating, setAverageRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  console.log(isLoggedIn, role);

    useEffect(() => {
        const fetchData = async() =>{
            try {
              const response = 
              await axios.get(`http://localhost:3000/api/user/get-book/${id}`);
              console.log(response);
              setData(response.data.data);
              setAverageRating(response.data.averageRating);
              setTotalRatings(response.data.totalRatings || 0);
            } catch (error) {
              console.error('Error fetching book data:', error);
            }
        };

        const fetchComments = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/api/user/get-comments/${id}`);
            setComments(response.data.data);
          } catch (error) {
            console.error('Error fetching comments:', error);
          }
        };

        fetchData();
        fetchComments();
    },[id, refreshKey]);
      const headers ={
        id: localStorage.getItem('id'),
        authorization: `Bearer ${localStorage.getItem('token')}`,
        bookid: id,
      };
    
    const handleWishlist = async() => {
        const response = await axios.put("http://localhost:3000/api/user/add-book-to-favourite",{},{headers});
      alert(response.data.message);
    };

    const handleCart = async() => {
        const response = await axios.put("http://localhost:3000/api/user/add-to-cart",
          {} ,
          {headers});
        alert(response.data.message);
      };
  
    const deleteBook = async() =>{
      const reponse =await axios.delete("http://localhost:3000/api/user/delete-book",{headers});
      alert(reponse.data.message);
      //navigate("/all-books");
      navigate("/Allbooks");
    }

    const handleCommentAdded = (newComment) => {
      setComments(prevComments => [newComment, ...prevComments]);
      setRefreshKey(prevKey => prevKey + 1);
    };

    const handleRatingAdded = () => {
      setRefreshKey(prevKey => prevKey + 1);
    };

  return (
    <>
    {Data && (
 <div className="px-4 md:px-12 py-8 bg-zinc-900 min-h-screen">
   <div className="max-w-7xl mx-auto">
     <div className="flex flex-col lg:flex-row gap-8">
       <div className="w-full lg:w-1/3">
         <div className='bg-zinc-800 rounded-lg shadow-xl overflow-hidden'>
           <div className='relative pb-[120%]'>
             <img 
               src={Data.url} 
               alt={Data.title}
               className='absolute inset-0 w-full h-full object-contain p-4'
             />
           </div>
           
           {isLoggedIn === true && role === "user" && (
             <div className='flex justify-center gap-4 p-4 bg-zinc-800'>
               <button 
                 className='flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 transition-colors rounded-lg text-white'
                 onClick={handleWishlist}
               >
                 <FaHeart className="text-xl"/>
                 <span>Wishlist</span>
               </button>
               
               <button 
                 className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg text-white"
                 onClick={handleCart}
               >
                 <FaCartShopping className="text-xl"/>
                 <span>Add to Cart</span>
               </button>
             </div>
           )}

           {isLoggedIn === true && role === "admin" && (
             <div className='flex justify-center gap-4 p-4 bg-zinc-800'>
               <Link 
                 to={`/updateBook/${id}`}
                 className='flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 transition-colors rounded-lg text-black'
               >
                 <FaEdit className="text-xl"/>
                 <span>Edit</span>
               </Link>
               
               <button 
                 className='flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 transition-colors rounded-lg text-red-500'
                 onClick={deleteBook}
               >
                 <MdDeleteOutline className="text-xl"/>
                 <span>Delete</span>
               </button>
             </div>
           )}
         </div>
       </div>

       <div className='flex-1 bg-zinc-800 p-8 rounded-lg shadow-xl'>
         <h1 className='text-4xl font-bold text-white mb-2'>{Data.title}</h1>
         <p className='text-xl text-zinc-400 mb-6'>by {Data.author}</p>
         
         <div className="mb-8">
           <h2 className="text-2xl font-semibold text-white mb-4">Description</h2>
           <p className='text-zinc-400 leading-relaxed text-lg'>{Data.desc}</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
           <div>
             <h3 className="text-lg font-medium text-white mb-2">Language</h3>
             <p className='flex items-center text-zinc-400'>
               <GrLanguage className="mr-2 text-lg"/> {Data.language}
             </p>
             <p  className='flex mt-4 items-center justify-start text-zinc-400'>
             <FiBookOpen className="me-2"/>{Data.genre}
             </p>
           </div>
           
           <div>
             <h3 className="text-lg font-medium text-white mb-2">Price</h3>
             <p className='text-2xl font-bold text-green-400'>${Data.price}</p>
           </div>
         </div>

         <div className="border-t border-zinc-700 pt-8">
         <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Rating</h2>
            <div className="flex items-center gap-4 mb-4 bg-zinc-700/50 p-4 rounded-lg">
              <div className="text-4xl font-bold text-yellow-400">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({ length: Math.floor(averageRating) }).map((_, i) => (
                    <FaStar key={`star-${i}`} className="text-yellow-400 text-xl" />
                  ))}
                  {(averageRating % 1 >= 0.3 && averageRating % 1 < 0.7) && 
                    <FaStarHalfAlt className="text-yellow-400 text-xl" />
                  }
                  {(averageRating % 1 >= 0.7) && 
                    <FaStar className="text-yellow-400 text-xl" />
                  }
                  {Array.from({ length: 5 - Math.ceil(averageRating - 0.3) }).map((_, i) => (
                    <FaRegStar key={`empty-star-${i}`} className="text-yellow-400 text-xl" />
                  ))}
                </div>
                <div className="text-zinc-400">out of 5</div>
                <div className="text-sm text-zinc-500">
                  {totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'}
                </div>
              </div>
            </div>
            <RatingForm bookId={id} onRatingAdded={handleRatingAdded} />
          </div>

           <div className="mt-8">
             <div className="flex justify-between items-center mb-4">
               <h2 className="text-2xl font-semibold text-white">Comments</h2>
               <span className="text-zinc-500">
                 {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
               </span>
             </div>
             <CommentForm bookId={id} onCommentAdded={handleCommentAdded} />
             <CommentList bookId={id} comments={comments} />
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
    )}
    {!Data && (
      <div className='h-screen bg-zinc-900 flex items-center justify-center'>
        <Loader/>{" "}
      </div>
    )}

    </>

  )
};

export default ViewBookDetails