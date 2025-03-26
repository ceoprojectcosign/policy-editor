// === File: src/components/DocumentSelector.jsx ===

import { useState } from 'react'

const initialDocs = [
  { id: 'policy-1000', title: 'District Mission Policy' },
  { id: 'policy-2000', title: 'Student Conduct Policy' },
]

const DocumentSelector = ({ selectedDoc, onSelect }) => {
  const [docs, setDocs] = useState(initialDocs)

  const createNewDoc = () => {
    const title = prompt('Enter document title:')
    if (!title) return
    const id = `doc-${Date.now()}`
    const newDoc = { id, title }
    setDocs([...docs, newDoc])
    onSelect(id)
  }

  return (
    <div className="mb-4 flex items-center gap-4">
      <select
        value={selectedDoc}
        onChange={(e) => onSelect(e.target.value)}
        className="border p-2 rounded"
      >
        {docs.map((doc) => (
          <option key={doc.id} value={doc.id}>
            {doc.title}
          </option>
        ))}
      </select>
      <button
        onClick={createNewDoc}
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
      >
        + New Document
      </button>
    </div>
  )
}

export default DocumentSelector
