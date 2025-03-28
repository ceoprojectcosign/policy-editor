import React from 'react';

const SuggestedEditItem = ({ suggestion, onAccept, onReject }) => {
  return (
    <div className="border p-2 rounded bg-gray-50 dark:bg-gray-700 mb-2">
      <p className="text-sm mb-1 text-gray-800 dark:text-gray-100">
        <strong>{suggestion.author}</strong> suggests:
      </p>
      <p className="text-sm italic text-blue-600 dark:text-blue-300">"{suggestion.text}"</p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onAccept(suggestion.id)}
          className="text-xs px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700"
        >
          Accept
        </button>
        <button
          onClick={() => onReject(suggestion.id)}
          className="text-xs px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default SuggestedEditItem;