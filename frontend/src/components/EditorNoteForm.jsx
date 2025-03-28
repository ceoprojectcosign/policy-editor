import { useState, useEffect } from 'react';
import supabase from '../lib/supabaseClient';

const EditorNoteForm = ({ documentId }) => {
  const [note, setNote] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Auth error:', error.message);
        return;
      }
      setUser(data.user);
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!note || !user) return;

    const { error } = await supabase.from('editor_notes').insert({
      user_id: user.id,
      document_id: documentId,
      note,
      position: { line: 12, offset: 101 } // customize this as needed
    });

    if (error) {
      console.error('Insert error:', error.message);
    } else {
      setNote('');
      alert('Note saved!');
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow space-y-2">
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write a note..."
        className="w-full border p-2 rounded text-sm"
      />
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Save Note
      </button>
    </div>
  );
};

export default EditorNoteForm;
