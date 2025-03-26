import { useState } from 'react'
import Editor from './components/Editor'
import DocumentSelector from './components/DocumentSelector'

function App() {
  const [selectedDocId, setSelectedDocId] = useState('policy-1000')

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Policy Editor</h1>
      <DocumentSelector selectedDoc={selectedDocId} onSelect={setSelectedDocId} />
      <Editor docId={selectedDocId} />
    </div>
  )
}

export default App
