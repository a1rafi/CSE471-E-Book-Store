import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';

const RecommendedBooks = ({ genre, currentBookId }) => {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/recommended-books`, {
          params: { genre, currentBookId }
        });
        setRecommendedBooks(response.data.data);
      } catch (error) {
        console.error('Error fetching recommended books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedBooks();
  }, [genre, currentBookId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center my-8">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-yellow-100">Recommended Books</h4>
      <div className="my-8 grid sm:grid-cols-3 md:grid-cols-4 gap-4">
        {recommendedBooks && recommendedBooks.length > 0 ? (
          recommendedBooks.map((book, i) => (
            <div key={i}>
              <BookCard data={book} />
            </div>
          ))
        ) : (
          <p>No books available in this genre.</p>
        )}
      </div>
    </div>
  );
};

export default RecommendedBooks;