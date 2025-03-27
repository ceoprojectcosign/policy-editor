import { useUser } from './AuthProvider'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

const ydoc = new Y.Doc()
const provider = new WebsocketProvider('wss://demos.yjs.dev', 'policy-editor-room-1', ydoc)

const Editor = () => {
  const user = useUser() // 👈 keeps useUser active
  console.log('Logged in user:', user) // optional, silences ESLint warning

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      Collaboration.configure({ document: ydoc }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: user?.name || 'Anonymous',
          color: user?.color || '#38bdf8',
        },
      }),
    ],
  })

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <EditorContent editor={editor} />
    </div>
  )
}

export default Editor
