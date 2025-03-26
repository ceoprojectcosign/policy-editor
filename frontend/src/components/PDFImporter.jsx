import { useState } from 'react'

const PdfImporter = ({ onImport }) => {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  // Use .env value for backend
  const BASE_URL = import.meta.env.VITE_BACKEND_URL

  const handleImport = async () => {
    if (!url) return
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/api/extract-draft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdfUrl: url }),
      })
      const data = await res.json()
      if (data.draft) {
        onImport(data.draft)
      } else {
        alert('Failed to extract content from PDF.')
      }
    } catch (err) {
      console.error(err)
      alert('Error contacting backend.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-4 flex gap-2">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste PDF URL here..."
        className="flex-1 border p-2 rounded"
      />
      <button
        onClick={handleImport}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Loading…' : 'Import PDF'}
      </button>
    </div>
  )
}

export default PdfImporter
