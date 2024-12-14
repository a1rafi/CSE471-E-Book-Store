import React, { useState } from 'react';
import axios from 'axios';
import './RatingForm.css';

const RatingForm = ({ bookId, onRatingAdded }) => {
  const [rating, setRating] = useState(1);

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
      <label className="rating-label">
        Rate this book:
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <button className="rating-submit-button" type="submit">Submit</button>
    </form>
  );
};

export default RatingForm;