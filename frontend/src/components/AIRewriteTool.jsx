import { useState } from 'react';
import supabase from '../lib/supabaseClient';

const AIRewriteTool = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRewrite = async () => {
    setLoading(true);
    setError(null);
    setSummary('');

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (!user || userError) {
        setError('You must be logged in to use this tool.');
        setLoading(false);
        return;
      }

      // Send text to your backend summarizer
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/summarize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await res.json();
      const rewritten = data.summary || '';

      setSummary(rewritten);

      // Save summary to Supabase
      await supabase.from('ai_summaries').insert({
        user_id: user.id,
        original_text: inputText,
        summary_text: rewritten
      });
    } catch (err) {
      setError('Something went wrong during rewriting.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-md font-semibold">AI Rewrite Assistant</h2>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste your draft or messy paragraph here..."
        className="w-full border p-2 rounded text-sm h-32"
      />
      <button
        onClick={handleRewrite}
        disabled={loading || !inputText}
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Rewriting...' : 'Rewrite with AI'}
      </button>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {summary && (
        <div className="bg-gray-50 border p-3 rounded text-sm text-gray-700">
          <p className="font-medium mb-1">AI Summary:</p>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default AIRewriteTool;
