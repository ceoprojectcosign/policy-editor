import { useState } from 'react'

const WebScraperPanel = () => {
  const [url, setUrl] = useState('')
  const [links, setLinks] = useState([])

  const scrape = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/scrape-pdfs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    })
    const data = await res.json()
    setLinks(data.links || [])
  }

  return (
    <div className="p-3 bg-white rounded shadow space-y-2">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter webpage URL"
        className="w-full border px-2 py-1 text-sm rounded"
      />
      <button onClick={scrape} className="bg-blue-500 text-white px-3 py-1 text-sm rounded">
        Find PDFs
      </button>
      {links.length > 0 && (
        <ul className="text-sm list-disc list-inside">
          {links.map((link, idx) => <li key={idx}><a href={link} target="_blank" className="text-blue-600 underline">{link}</a></li>)}
        </ul>
      )}
    </div>
  )
}

export default WebScraperPanel
