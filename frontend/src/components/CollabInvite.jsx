import React, { useState } from 'react';

const CollabInvite = ({ onInvite }) => {
  const [email, setEmail] = useState('');

  const handleInvite = () => {
    if (email.trim()) {
      onInvite(email);
      setEmail('');
    }
  };

  return (
    <div className="px-4 py-2 border-t text-sm bg-white dark:bg-gray-800">
      <h4 className="font-semibold mb-2">Invite Collaborator</h4>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
          className="border p-2 rounded w-full dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleInvite}
          className="bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700"
        >
          Invite
        </button>
      </div>
    </div>
  );
};

export default CollabInvite;