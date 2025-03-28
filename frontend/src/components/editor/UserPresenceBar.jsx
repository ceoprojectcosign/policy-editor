import React from 'react';

const UserPresenceBar = ({ users = [] }) => {
  if (!users.length) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-2 border-b bg-gray-50 dark:bg-gray-900 text-sm">
      <span className="text-gray-500 dark:text-gray-300">Currently editing:</span>
      {users.map((user, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: user.color || '#ccc' }}
          ></span>
          <span className="text-gray-700 dark:text-gray-200">{user.name}</span>
        </div>
      ))}
    </div>
  );
};

export default UserPresenceBar;
