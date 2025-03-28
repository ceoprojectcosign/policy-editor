import React, { useState } from 'react';

const CommentBubble = ({ text, onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  return (
    <div className="absolute bg-white dark:bg-gray-800 border rounded p-2 shadow z-50">
      <p className="text-sm mb-1">Comment on: <em>{text}</em></p>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full text-sm border p-1 rounded mb-1 dark:bg-gray-700 dark:text-white"
      />
      <button
        onClick={handleSubmit}
        className="text-xs text-white bg-indigo-600 hover:bg-indigo-700 px-2 py-1 rounded"
      >
        Add Comment
      </button>
    </div>
  );
};

export default CommentBubble;