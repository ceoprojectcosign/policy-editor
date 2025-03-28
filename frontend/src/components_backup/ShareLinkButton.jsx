import toast from 'react-hot-toast';

const ShareLinkButton = ({ docId }) => {
  const handleCopy = () => {
    const url = `${window.location.origin}/doc/${docId}`;
    navigator.clipboard.writeText(url);
    toast.success('🔗 Share link copied to clipboard!');
  };

  return (
    <button
      onClick={handleCopy}
      className="text-sm text-indigo-600 hover:underline"
    >
      Copy Share Link
    </button>
  );
};

export default ShareLinkButton;
