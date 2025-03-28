import React from 'react';

const EditTrackerPanel = ({ changes = [] }) => {
  if (!changes.length) return null;

  return (
    <div className="p-4 border-t bg-white dark:bg-gray-800">
      <h3 className="text-sm font-semibold mb-2">Recent Edits</h3>
      <ul className="text-sm space-y-2">
        {changes.map((change, i) => (
          <li key={i} className="flex justify-between text-gray-700 dark:text-gray-200">
            <span>
              <strong>{change.user}</strong> {change.action} "{change.text}"
            </span>
            <span className="text-xs text-gray-400">
              {new Date(change.timestamp).toLocaleTimeString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditTrackerPanel;