const SummaryPanel = ({ content, summary, setSummary }) => {
  const summarize = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: content })
    })
    const data = await res.json()
    setSummary(data.summary || '⚠️ No summary returned.')
  }

  return (
    <div className="bg-white p-3 rounded shadow">
      <h3 className="font-bold">AI Summary</h3>
      <button onClick={summarize} className="text-sm text-blue-500 underline">Summarize Draft</button>
      <p className="text-sm mt-2 text-gray-700 whitespace-pre-wrap">{summary}</p>
    </div>
  )
}

export default SummaryPanel