import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import { useVersionHistory } from '../hooks/useVersionHistory'

const Editor = ({ content }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || '<p>Start editing your policy draft...</p>',
  })

  const docId = 'default-policy-doc' // could be dynamic in the future
  const { versions, saveVersion, restoreVersion } = useVersionHistory(docId, editor)

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <EditorContent editor={editor} />

      <button
        onClick={saveVersion}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        💾 Save Version
      </button>

      <div className="mt-4">
        <h2 className="font-semibold text-sm mb-2">📜 Version History</h2>
        {versions.length === 0 && (
          <p className="text-xs text-gray-500">No versions saved yet.</p>
        )}
        {versions.map((v, index) => (
          <div key={index} className="text-sm flex justify-between items-center mb-1">
            <span>{new Date(v.timestamp).toLocaleString()}</span>
            <button
              onClick={() => restoreVersion(v.content)}
              className="text-blue-600 text-xs hover:underline"
            >
              Restore
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Editor
