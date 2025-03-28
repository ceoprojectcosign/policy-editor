import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

const SavedNotesList = ({ documentId }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      const { data, error } = await supabase
        .from('editor_notes')
        .select('*')
        .eq('document_id', documentId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to fetch notes:', error.message);
      } else {
        setNotes(data);
      }
    };

    loadNotes();
  }, [documentId]);

  if (!notes.length) return null;

  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h3 className="text-md font-semibold mb-2">Your Notes</h3>
      <ul className="text-sm space-y-1">
        {notes.map(note => (
          <li key={note.id} className="border-b pb-1">
            📝 {note.note}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedNotesList;