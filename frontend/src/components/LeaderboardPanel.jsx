import React from 'react';

const LeaderboardPanel = ({ users = [] }) => {
  if (!users.length) return null;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 border rounded">
      <h3 className="text-lg font-semibold mb-2">🏆 Top Contributors</h3>
      <ul className="space-y-2">
        {users.map((u, i) => (
          <li key={i} className="flex justify-between text-sm">
            <span className="text-gray-800 dark:text-white">{i + 1}. {u.name}</span>
            <span className="text-gray-500">{u.points} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderboardPanel;