import { useState } from 'react';
import supabase from '../lib/supabaseClient';

const WebScraperPanel = () => {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScrape = async () => {
    if (!url) return;

    setLoading(true);
    setError(null);
    setLinks([]);

    try {
      // Fetch current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        setError('User not authenticated.');
        setLoading(false);
        return;
      }

      // Scrape PDFs via backend
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/scrape-pdfs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (data.links && data.links.length > 0) {
        setLinks(data.links);

        // Insert each link into Supabase
        for (const pdfUrl of data.links) {
          await supabase.from('pdf_scrapes').insert({
            user_id: user.id,
            source_url: url,
            pdf_url: pdfUrl
          });
        }
      } else {
        setError('No PDFs found on that page.');
      }
    } catch (err) {
      setError('Scraping failed. Please try another URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow space-y-3">
      <h2 className="font-semibold text-md">Web PDF Scraper</h2>
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com/page"
        className="w-full border px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleScrape}
        disabled={loading || !url}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Scanning...' : 'Find PDFs'}
      </button>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {links.length > 0 && (
        <ul className="text-sm list-disc list-inside space-y-1">
          {links.map((link, idx) => (
            <li key={idx}>
              <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                {link}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WebScraperPanel;
