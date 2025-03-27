import { useEffect, useRef } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { saveDoc } from '../lib/saveDoc'

const Editor = ({ content, docId }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      debouncedSave(html)
    }
  })

  const timeoutRef = useRef(null)
  const debouncedSave = (html) => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      saveDoc(docId, html)
    }, 1000)
  }

  useEffect(() => {
    if (editor && content) editor.commands.setContent(content)
  }, [content, editor])

  return <EditorContent editor={editor} />
}

export default Editor