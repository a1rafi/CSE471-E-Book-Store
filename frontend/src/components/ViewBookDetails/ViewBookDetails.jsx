import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GrLanguage } from 'react-icons/gr';
import { FaHeart, FaStar, FaStarHalfAlt, FaRegStar, FaEdit } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FiBookOpen } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import Modal from 'react-modal';

import Loader from '../Loader/Loader';
import CommentForm from '../CommentForm/CommentForm';
import CommentList from '../CommentList/CommentList';
import RatingForm from '../RatingForm/RatingForm';
import RecommendedBooks from '../Home/RecommenedBooks';

const ViewBookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Data, setData] = useState();
  const [averageRating, setAverageRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/get-book/${id}`);
        setData(response.data.data);
        setAverageRating(response.data.averageRating);
        setTotalRatings(response.data.totalRatings || 0);
      } catch (error) {
        console.error('Error fetching book data:', error);
        toast.error('Failed to load book details. Please try again later.');
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/get-comments/${id}`);
        setComments(response.data.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
        toast.error('Failed to load comments. Please try again later.');
      }
    };

    fetchData();
    fetchComments();
  }, [id, refreshKey]);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid: id,
  };

  const handleWishlist = async () => {
    try {
      const response = await axios.put("http://localhost:3000/api/user/add-book-to-favourite", {}, { headers });
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Failed to add to wishlist. Please try again.');
    }
  };

  const handleCart = async () => {
    try {
      const response = await axios.put("http://localhost:3000/api/user/add-to-cart", {}, { headers });
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart. Please try again.');
    }
  };

  const deleteBook = async () => {
    try {
      const response = await axios.delete("http://localhost:3000/api/user/delete-book", { headers });
      toast.success(response.data.message);
      navigate("/Allbooks");
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete book. Please try again.');
    }
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
        <div className="px-4 md:px-12 py-8 text-white bg-zinc-900 min-h-screen">
          <div className="max-w-7xl mx-auto min-h-screen">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/3">
                <div className='bg-zinc-800 rounded-lg shadow-xl overflow-hidden'>
                  <div className='relative pb-[120%]' >
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
                        <FaHeart className="text-xl" />
                        <span>Wishlist</span>
                      </button>

                      <button
                        className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg text-white"
                        onClick={handleCart}
                      >
                        <FaCartShopping className="text-xl" />
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
                        <FaEdit className="text-xl" />
                        <span>Edit</span>
                      </Link>

                      <button
                        className='flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 transition-colors rounded-lg text-red-500'
                        onClick={deleteBook}
                      >
                        <MdDeleteOutline className="text-xl" />
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
                      <GrLanguage className="mr-2 text-lg" /> {Data.language}
                    </p>
                    <p className='flex mt-4 items-center justify-start text-zinc-400'>
                      <FiBookOpen className="me-2" />{Data.genre}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Price</h3>
                    <p className='text-2xl font-bold text-green-400'>${Data.price}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-medium text-white mb-2">Read a few pages</h3>
                  {Data.pdfLink ? (
                    <>
                      <button
                        className="text-blue-600 underline hover:text-blue-800"
                        onClick={() => setShowModal(true)}
                      >
                        View PDF
                      </button>
                      <Modal
                        isOpen={showModal}
                        onRequestClose={() => setShowModal(false)}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
                        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
                        contentLabel="PDF Viewer"
                      >
                        <div className="bg-white w-full max-w-4xl rounded-lg overflow-hidden">
                          <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
                            <h2 className="text-lg font-bold">{Data?.title}</h2>
                            <button
                              onClick={() => setShowModal(false)}
                              className="text-white-500 font-bold bg-red-700 px-4 py-2 rounded-lg"
                            >
                              Close
                            </button>
                          </div>
                          <div className="p-4">
                            <iframe
                              src={Data?.pdfLink}
                              width="100%"
                              height="400px"
                              className="border-2 border-gray-300 rounded-lg"
                              title="PDF Preview"
                            />
                          </div>
                          <div className="p-4 bg-gray-100 flex justify-between items-center">
                            <button
                              onClick={() => window.open(Data?.pdfLink, "_blank")}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                              Open in Full Screen
                            </button>
                            <a
                              href={Data?.pdfLink}
                              download={`${Data?.title}.pdf`}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            >
                              Download PDF
                            </a>
                          </div>
                        </div>
                      </Modal>
                    </>
                  ) : (
                    <p className="text-red-500">Sorry, PDF not available</p>
                  )}
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
            <RecommendedBooks genre={Data.genre} currentBookId={id} />
          </div>
        </div>
      )}
      {!Data && (
        <div className='h-screen bg-zinc-900 flex items-center justify-center'>
          <Loader />{" "}
        </div>
      )}
    </>
  )
};

export default ViewBookDetails;