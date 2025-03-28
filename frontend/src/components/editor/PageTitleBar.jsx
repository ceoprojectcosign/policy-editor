import React, { useState } from 'react';

const PageTitleBar = ({ title = 'Untitled Document', onChange }) => {
  const [docTitle, setDocTitle] = useState(title);

  const handleBlur = () => {
    if (onChange) onChange(docTitle);
  };

  return (
    <div className="px-4 py-2 border-b bg-white dark:bg-gray-800">
      <input
        type="text"
        value={docTitle}
        onChange={(e) => setDocTitle(e.target.value)}
        onBlur={handleBlur}
        className="text-xl font-semibold bg-transparent outline-none w-full text-gray-900 dark:text-white"
      />
    </div>
  );
};

export default PageTitleBar;