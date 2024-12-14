import React, { useState } from 'react';
import axios from 'axios';
import './CommentForm.css';


const CommentForm = ({ bookId, onCommentAdded }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      id: localStorage.getItem('id'),
      authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    try {
      await axios.post('http://localhost:3000/api/user/add-comment', { bookId, text }, { headers });
      setText('');
      onCommentAdded();
    } catch (error) {
      console.error('There was an error submitting the comment!', error);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        className="comment-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment"
        required
      />
      <button className="comment-submit-button" type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;