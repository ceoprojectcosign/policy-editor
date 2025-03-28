const ShareBar = ({ docId }) => {
    const url = `${window.location.origin}/doc/${docId}`;
  
    return (
      <div className="flex gap-4 text-sm mt-2">
        <button onClick={() => navigator.clipboard.writeText(url)}>📋 Copy Link</button>
        <a href={`https://twitter.com/intent/tweet?url=${url}`} target="_blank">🐦 Tweet</a>
        <a href={`mailto:?subject=Check this draft&body=${url}`}>📧 Email</a>
      </div>
    );
  };
  