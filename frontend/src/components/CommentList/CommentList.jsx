import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CommentList.css';


const CommentList = ({ bookId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/get-comments/${bookId}`);
        setComments(response.data.data);
      } catch (error) {
        console.error('There was an error fetching the comments!', error);
      }
    };

    fetchComments();
  }, [bookId]);

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <div className="comment-item" key={comment._id}>
          <p className="comment-text">{comment.text}</p>
          <small className="comment-user">{comment.user.username} - {new Date(comment.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default CommentList;