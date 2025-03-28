
// Folder: /frontend/src/components/BadgeDisplay.jsx
import React from 'react';

const badgeStyles = {
  admin: 'bg-red-500',
  editor: 'bg-blue-500',
  contributor: 'bg-green-500',
  og: 'bg-purple-600',
};

const BadgeDisplay = ({ role = 'contributor' }) => {
  const color = badgeStyles[role] || 'bg-gray-500';

  return (
    <span className={`text-white text-xs px-2 py-1 rounded-full ${color}`}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
  );
};

export default BadgeDisplay;