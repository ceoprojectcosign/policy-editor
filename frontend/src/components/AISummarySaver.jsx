import { useState, useEffect } from 'react';
import supabase from '../lib/supabaseClient';

const AISummarySaver = () => {
  const [originalText, setOriginalText] = useState('');
  const [summary, setSummary] = useState('');
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
    if (!originalText || !summary || !user) return;

    const { error } = await supabase.from('ai_summaries').insert({
      user_id: user.id,
      original_text: originalText,
      summary_text: summary
    });

    if (error) {
      console.error('Insert error:', error.message);
    } else {
      setOriginalText('');
      setSummary('');
      alert('Summary saved!');
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow space-y-2">
      <textarea
        value={originalText}
        onChange={(e) => setOriginalText(e.target.value)}
        placeholder="Original text..."
        className="w-full border p-2 rounded text-sm"
      />
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="AI summary..."
        className="w-full border p-2 rounded text-sm"
      />
      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
      >
        Save Summary
      </button>
    </div>
  );
};

export default AISummarySaver;
