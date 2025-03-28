import { useEffect, useState } from 'react';

const VersionHistory = ({ docId, editor, isOpen, onClose }) => {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    if (!isOpen) return;

    const fetchVersions = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/versions/${docId}`);
        const data = await res.json();
        setVersions(data || []);
      } catch (err) {
        console.error('Failed to load versions:', err);
      }
    };

    fetchVersions();
  }, [isOpen, docId]);

  const restoreVersion = (version) => {
    if (editor) {
      editor.commands.setContent(version.content);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Version History</h2>
        <ul className="space-y-2 max-h-96 overflow-y-auto">
          {versions.map((v, i) => (
            <li key={i} className="flex justify-between items-center text-sm">
              <span>{new Date(v.timestamp).toLocaleString()}</span>
              <button
                onClick={() => restoreVersion(v)}
                className="text-indigo-600 hover:underline"
              >
                Restore
              </button>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 text-sm text-red-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default VersionHistory;
