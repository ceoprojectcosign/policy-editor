import React from 'react';

const DocStatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${
        status === 'Saving...'
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-green-100 text-green-800'
      }`}
    >
      {status}
    </span>
  );
};

export default DocStatusBadge;