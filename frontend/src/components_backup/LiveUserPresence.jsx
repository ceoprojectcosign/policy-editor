import React, { useEffect, useState } from 'react';

const LiveUserPresence = ({ awareness }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!awareness) return;

    const updateUsers = () => {
      const states = Array.from(awareness.getStates().values());
      setUsers(states.map((s) => s.user).filter(Boolean));
    };

    awareness.on('change', updateUsers);
    updateUsers();

    return () => awareness.off('change', updateUsers);
  }, [awareness]);

  if (users.length === 0) return null;

  return (
    <div className="flex gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
      {users.map((user, i) => (
        <span
          key={i}
          className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: user.color }}
          />
          {user.name}
        </span>
      ))}
    </div>
  );
};

export default LiveUserPresence;