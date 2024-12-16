import React, { useState } from 'react';
import axios from 'axios';
import './CommentForm.css';
import { FaPaperPlane } from 'react-icons/fa';

const CommentForm = ({ bookId, onCommentAdded }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    setIsSubmitting(true);
    const headers = {
      id: localStorage.getItem('id'),
      authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    try {
      const response = await axios.post('http://localhost:3000/api/user/add-comment', 
        { bookId, text }, 
        { headers }
      );
      setText('');
      // Pass the new comment to parent component
      onCommentAdded({
        _id: response.data.commentId,
        text,
        createdAt: new Date().toISOString(),
        user: {
          username: response.data.username || 'User'
        }
      });
    } catch (error) {
      console.error('There was an error submitting the comment!', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="comment-input-container">
        <textarea
          className="comment-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your thoughts about this book..."
          required
          disabled={isSubmitting}
        />
        <button 
          className="comment-submit-button" 
          type="submit" 
          disabled={isSubmitting || !text.trim()}
        >
          <FaPaperPlane />
          <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
        </button>
      </div>
    </form>
  );
};

export default CommentForm;