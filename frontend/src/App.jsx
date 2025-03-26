import { useState } from 'react'
import Editor from './components/Editor'

const App = () => {
  const [pdfUrl, setPdfUrl] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleImport = async () => {
    if (!pdfUrl) return
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/extract-draft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdfUrl }),
      })
      const data = await res.json()
      setContent(data.draft || '')
    } catch (err) {
      console.error(err)
      setContent('Failed to fetch from backend.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Policy Editor (Frontend)</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="Enter PDF URL..."
          value={pdfUrl}
          onChange={(e) => setPdfUrl(e.target.value)}
        />
        <button
          onClick={handleImport}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Importing...' : 'Import PDF'}
        </button>
      </div>
      <Editor content={content} />
    </div>
  )
}

export default App
