import React from 'react';

const SectionApprovalBar = ({ sectionId, onApprove, onReject }) => {
  return (
    <div className="flex justify-between items-center bg-yellow-100 dark:bg-yellow-900 px-4 py-2 text-sm text-yellow-800 dark:text-yellow-100 border-b">
      <span>Changes in Section {sectionId} need review</span>
      <div className="flex gap-2">
        <button onClick={() => onApprove(sectionId)} className="text-green-600 hover:underline">Approve</button>
        <button onClick={() => onReject(sectionId)} className="text-red-600 hover:underline">Reject</button>
      </div>
    </div>
  );
};

export default SectionApprovalBar;
