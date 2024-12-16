import React from 'react';
import './CommentList.css';
import { FaUser, FaClock } from 'react-icons/fa';

const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <div className="no-comments">No comments yet. Be the first to share your thoughts!</div>;
  }

  return (
    <div className="comment-list">
      <h3 className="comment-section-title">Reader Comments</h3>
      {comments.map((comment) => (
        <div className="comment-item" key={comment._id}>
          <div className="comment-header">
            <div className="comment-user-info">
              <FaUser className="user-icon" />
              <span className="username">{comment.user.username}</span>
            </div>
            <div className="comment-time">
              <FaClock className="clock-icon" />
              <span>{new Date(comment.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>
          <p className="comment-text">{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;