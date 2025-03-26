import PdfImporter from './PdfImporter'
import { useState } from 'react'
import { useUser } from './AuthProvider'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { CommentMark } from '../extensions/CommentMark'
import CommentToolbar from './CommentToolbar'
import { useVersionHistory } from '../hooks/useVersionHistory'

const Editor = ({ docId }) => {
  const user = useUser()
  const [comments, setComments] = useState([])

  const ydoc = new Y.Doc()
  const provider = new WebsocketProvider('wss://demos.yjs.dev', docId, ydoc)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      Collaboration.configure({ document: ydoc }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: user.name,
          color: user.color,
        },
      }),
      CommentMark,
    ],
  })

  const { versions, saveVersion, restoreVersion } = useVersionHistory(docId)

  const handleAddComment = (id) => {
    const text = window.prompt('Enter your comment:')
    if (text) {
      setComments((prev) => [...prev, { id, text, author: user.name }])
    }
  }

  return (
    <div className="relative bg-white p-4 rounded-xl shadow">
      <PdfImporter onImport={(text) => editor?.commands.setContent(text)} />
      <CommentToolbar editor={editor} onAddComment={handleAddComment} />
      <EditorContent editor={editor} />

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => saveVersion(editor?.getHTML())}
          className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
        >
          Save Version
        </button>
      </div>

      <div className="mt-4 bg-gray-100 border p-3 rounded-lg">
        <h2 className="font-bold text-sm mb-2">Version History</h2>
        {versions.length === 0 && <p className="text-xs text-gray-500">No versions yet.</p>}
        {versions.map((v, index) => (
          <div key={index} className="mb-1 text-sm flex justify-between items-center">
            <span>{new Date(v.timestamp).toLocaleString()}</span>
            <button
              onClick={() => restoreVersion(v.content, editor)}
              className="text-blue-600 text-xs"
            >
              Restore
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-gray-50 border p-3 rounded-lg">
        <h2 className="font-bold text-sm mb-2">Comments</h2>
        {comments.length === 0 && (
          <p className="text-xs text-gray-500">No comments yet.</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="mb-2 text-sm">
            <strong>{c.author}:</strong> {c.text}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Editor
