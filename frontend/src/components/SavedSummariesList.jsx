import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

const SavedSummariesList = () => {
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    const loadSummaries = async () => {
      const { data, error } = await supabase
        .from('ai_summaries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to fetch summaries:', error.message);
      } else {
        setSummaries(data);
      }
    };

    loadSummaries();
  }, []);

  if (!summaries.length) return null;

  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h3 className="text-md font-semibold mb-2">Saved Summaries</h3>
      <ul className="text-sm space-y-2">
        {summaries.map(s => (
          <li key={s.id}>
            <p className="text-gray-600 mb-1"><strong>Original:</strong> {s.original_text}</p>
            <p className="text-green-700"><strong>Summary:</strong> {s.summary_text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedSummariesList;