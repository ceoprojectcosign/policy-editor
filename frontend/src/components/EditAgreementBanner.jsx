import React from 'react';

const EditAgreementBanner = ({ status, onAgree, onReject }) => {
  if (status !== 'pending') return null;

  return (
    <div className="bg-yellow-100 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 px-4 py-2 flex justify-between items-center text-sm">
      <span>
        Someone made changes to this section. Do you agree to keep them?
      </span>
      <div className="flex gap-2">
        <button
          onClick={onAgree}
          className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
        >
          Agree
        </button>
        <button
          onClick={onReject}
          className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default EditAgreementBanner;