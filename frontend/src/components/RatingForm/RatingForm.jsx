import React, { useState } from 'react';
import axios from 'axios';
import './RatingForm.css';
import { FaStar } from 'react-icons/fa';

const RatingForm = ({ bookId, onRatingAdded }) => {
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      id: localStorage.getItem('id'),
      authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    try {
      await axios.post('http://localhost:3000/api/user/add-rating', { bookId, rating }, { headers });
      setRating(1);
      onRatingAdded();
    } catch (error) {
      console.error('There was an error submitting the rating!', error);
    }
  };

  return (
    <form className="rating-form" onSubmit={handleSubmit}>
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
              />
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={25}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      <button className="rating-submit-button" type="submit">
        Submit Rating
      </button>
    </form>
  );
};

export default RatingForm;